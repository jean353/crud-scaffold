'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction } from '@starknet-react/core';
import { Call } from 'starknet';
import axios from 'axios';
import { X, Wallet, Loader2, CheckCircle2, AlertCircle, Zap, CreditCard } from 'lucide-react';
import type { Dish } from '@/lib/types';
import { CONTRACT_ADDRESS, RESTAURANT_ORDERS_ABI } from '@/lib/contract';
import api from '@/lib/api';

interface OrderButtonProps {
    dish: Dish;
    onClose: () => void;
}

type Step = 'idle' | 'signing' | 'pending' | 'recording' | 'success' | 'error';

export function OrderButton({ dish, onClose }: OrderButtonProps) {
    const { address, isConnected } = useAccount();
    const [step, setStep] = useState<Step>('idle');
    const [txHash, setTxHash] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [quantity, setQuantity] = useState(1);

    const price = parseFloat(dish.price);
    const total = price * quantity;

    // Convert amount to u256 (in WEI - multiply by 10^18 for STRK token)
    const amountU256 = BigInt(Math.round(total * 1e18));

    const { sendAsync } = useSendTransaction({});

    async function handleStarknetOrder() {
        if (!isConnected || !address) {
            setErrorMsg('Veuillez connecter votre portefeuille Starknet.');
            setStep('error');
            return;
        }

        try {
            setStep('signing');

            // Build the calldata for place_order(order_id, amount)
            const orderId = BigInt(Date.now()); // Temporary unique ID

            const call: Call = {
                contractAddress: CONTRACT_ADDRESS,
                entrypoint: 'place_order',
                calldata: [
                    orderId.toString(),           // order_id as u64
                    (amountU256 & BigInt('0xffffffffffffffffffffffffffffffff')).toString(), // amount low
                    (amountU256 >> BigInt(128)).toString(),                                  // amount high
                ],
            };

            setStep('signing');
            const result = await sendAsync([call]);
            const hash = result.transaction_hash;
            setTxHash(hash);

            setStep('pending');

            // Record order in Laravel after getting tx hash
            setStep('recording');
            await api.post('/orders', {
                dish_id: dish.id,
                user_address: address,
                tx_hash: hash,
                amount: total,
                quantity,
            });

            setStep('success');
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : 'Transaction annulée ou échouée.';
            setErrorMsg(message);
            setStep('error');
        }
    }

    // Classic (Web2) payment
    async function handleClassicOrder() {
        if (!address) {
            setErrorMsg('Connectez votre portefeuille pour continuer.');
            setStep('error');
            return;
        }
        try {
            setStep('recording');
            await api.post('/orders', {
                dish_id: dish.id,
                user_address: address,
                tx_hash: null,
                amount: total,
                quantity,
            });
            setStep('success');
        } catch {
            setErrorMsg('Erreur lors de la commande. Veuillez réessayer.');
            setStep('error');
        }
    }

    const isLoading = ['signing', 'pending', 'recording'].includes(step);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="card w-full max-w-md shadow-2xl animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                    <h2 className="font-display text-lg font-bold text-[var(--text)]">Passer commande</h2>
                    <button onClick={onClose} disabled={isLoading} className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Dish summary */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-500/5 border border-brand-500/20">
                        <div className="text-3xl">🍽️</div>
                        <div>
                            <p className="font-semibold text-[var(--text)]">{dish.name}</p>
                            <p className="text-sm text-[var(--muted)]">{price.toFixed(2)} € / unité</p>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text)]">Quantité</span>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={isLoading}
                                className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-brand-500 transition-colors disabled:opacity-40">
                                −
                            </button>
                            <span className="w-6 text-center font-semibold">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} disabled={isLoading}
                                className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-brand-500 transition-colors disabled:opacity-40">
                                +
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between py-3 border-t border-[var(--border)]">
                        <span className="font-semibold text-[var(--text)]">Total</span>
                        <span className="text-2xl font-bold text-brand-500">{total.toFixed(2)} €</span>
                    </div>

                    {/* Status display */}
                    {step === 'signing' && <StatusBar icon={<Loader2 className="w-4 h-4 animate-spin" />} color="bg-blue-500/20 text-blue-400 border-blue-500/30" msg="Signez la transaction dans votre portefeuille…" />}
                    {step === 'pending' && <StatusBar icon={<Loader2 className="w-4 h-4 animate-spin" />} color="bg-yellow-500/20 text-yellow-400 border-yellow-500/30" msg="Transaction en cours sur Starknet…" />}
                    {step === 'recording' && <StatusBar icon={<Loader2 className="w-4 h-4 animate-spin" />} color="bg-brand-500/20 text-brand-400 border-brand-500/30" msg="Enregistrement dans la base de données…" />}
                    {step === 'success' && (
                        <div className="space-y-2">
                            <StatusBar icon={<CheckCircle2 className="w-4 h-4" />} color="bg-green-500/20 text-green-400 border-green-500/30" msg="Commande confirmée ! 🎉" />
                            {txHash && (
                                <p className="text-xs text-[var(--muted)] break-all font-mono px-3">
                                    Tx: {txHash}
                                </p>
                            )}
                        </div>
                    )}
                    {step === 'error' && <StatusBar icon={<AlertCircle className="w-4 h-4" />} color="bg-red-500/20 text-red-400 border-red-500/30" msg={errorMsg} />}

                    {/* Action buttons */}
                    {step === 'success' ? (
                        <button onClick={onClose} className="btn-primary w-full justify-center flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Fermer
                        </button>
                    ) : step === 'error' ? (
                        <button onClick={() => setStep('idle')} className="btn-secondary w-full justify-center flex items-center gap-2">
                            Réessayer
                        </button>
                    ) : (
                        <div className="space-y-3">
                            {/* Starknet payment */}
                            <button
                                onClick={handleStarknetOrder}
                                disabled={isLoading || !isConnected}
                                className="btn-primary w-full justify-center flex items-center gap-2 text-sm"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                                Payer en STRK (Starknet)
                            </button>

                            {/* Classic payment */}
                            <button
                                onClick={handleClassicOrder}
                                disabled={isLoading}
                                className="btn-secondary w-full justify-center flex items-center gap-2 text-sm"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                                Payer en espèces / carte
                            </button>

                            {!isConnected && (
                                <p className="text-xs text-center text-[var(--muted)]">
                                    ⚠️ Connectez votre portefeuille pour payer en STRK
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatusBar({ icon, color, msg }: { icon: React.ReactNode; color: string; msg: string }) {
    return (
        <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium ${color}`}>
            {icon}
            <span>{msg}</span>
        </div>
    );
}
