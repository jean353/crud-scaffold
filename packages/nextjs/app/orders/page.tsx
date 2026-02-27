'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '@starknet-react/core';
import { Clock, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import type { Order } from '@/lib/types';
import api from '@/lib/api';

const STATUS_CONFIG = {
    pending: { label: 'En attente', icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
    confirmed: { label: 'Confirmée', icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-green-500/10 text-green-400 border-green-500/30' },
    completed: { label: 'Terminée', icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-brand-500/10 text-brand-400 border-brand-500/30' },
    cancelled: { label: 'Annulée', icon: <XCircle className="w-4 h-4" />, color: 'bg-red-500/10 text-red-400 border-red-500/30' },
};

export default function OrdersPage() {
    const { address, isConnected } = useAccount();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isConnected) return;
        setLoading(true);
        api
            .get('/orders')
            .then((res) => {
                const all: Order[] = res.data.data;
                setOrders(all.filter((o) => o.user_address?.toLowerCase() === address?.toLowerCase()));
            })
            .finally(() => setLoading(false));
    }, [address, isConnected]);

    if (!isConnected) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="text-6xl mb-6">🔒</div>
                <h1 className="font-display text-3xl font-bold mb-3 text-[var(--text)]">Mes Commandes</h1>
                <p className="text-[var(--muted)]">Connectez votre portefeuille Starknet pour voir vos commandes.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-display text-4xl font-bold text-[var(--text)] mb-2">Mes Commandes</h1>
            <p className="text-[var(--muted)] mb-8 font-mono text-sm truncate">{address}</p>

            {loading && (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="card p-6">
                            <div className="skeleton h-4 w-1/3 mb-3" />
                            <div className="skeleton h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && orders.length === 0 && (
                <div className="py-20 text-center">
                    <div className="text-5xl mb-4">🍽️</div>
                    <p className="text-[var(--muted)]">Aucune commande pour l'instant. Consultez notre menu !</p>
                </div>
            )}

            {!loading && orders.length > 0 && (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                        return (
                            <div key={order.id} className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-hover">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-[var(--text)]">
                                            {order.dish?.name ?? `Plat #${order.dish_id}`}
                                        </span>
                                        <span className={`badge border ${cfg.color} flex items-center gap-1.5`}>
                                            {cfg.icon} {cfg.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[var(--muted)]">
                                        Qté: {order.quantity} · Total: <strong className="text-brand-400">{parseFloat(order.amount).toFixed(2)} €</strong>
                                    </p>
                                    {order.tx_hash && (
                                        <a
                                            href={`https://starkscan.co/tx/${order.tx_hash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:underline font-mono"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            {order.tx_hash.slice(0, 16)}…
                                        </a>
                                    )}
                                </div>
                                <p className="text-xs text-[var(--muted)] shrink-0">
                                    {new Date(order.created_at).toLocaleDateString('fr-FR', { dateStyle: 'medium' })}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
