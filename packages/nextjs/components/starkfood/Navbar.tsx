'use client';

import Link from 'next/link';
import { useTheme } from '@/app/theme-provider';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { Sun, Moon, Wallet, UtensilsCrossed, LogOut } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
    const { theme, toggle } = useTheme();
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const [showConnectors, setShowConnectors] = useState(false);

    const shortAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : null;

    return (
        <nav className="sticky top-0 z-40 backdrop-blur-xl border-b border-[var(--border)] bg-[var(--surface)]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
                        <UtensilsCrossed className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-display text-xl font-bold">
                        <span className="text-brand-500">Stark</span>
                        <span className="text-[var(--text)]">Food</span>
                    </span>
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">
                    <Link href="/" className="hover:text-brand-500 transition-colors">Menu</Link>
                    <Link href="/orders" className="hover:text-brand-500 transition-colors">Mes Commandes</Link>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                    {/* Theme toggle */}
                    <button
                        onClick={toggle}
                        className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-brand-500 hover:text-brand-500 transition-all"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    {/* Wallet */}
                    {isConnected ? (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-medium">
                                <Wallet className="w-3.5 h-3.5" />
                                {shortAddress}
                            </div>
                            <button
                                onClick={() => disconnect()}
                                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-red-500 hover:text-red-400 transition-all"
                                aria-label="Disconnect wallet"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setShowConnectors(!showConnectors)}
                                className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
                            >
                                <Wallet className="w-4 h-4" />
                                Connecter
                            </button>
                            {showConnectors && (
                                <div className="absolute right-0 mt-2 w-48 card shadow-xl py-2 animate-fade-in">
                                    {connectors.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => { connect({ connector: c }); setShowConnectors(false); }}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-brand-500/10 hover:text-brand-500 transition-colors"
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
