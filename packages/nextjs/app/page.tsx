import { MenuDisplay } from '@/components/starkfood/MenuDisplay';
import { UtensilsCrossed, Zap, Shield } from 'lucide-react';

export default function HomePage() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-hero-gradient py-20 px-4">
                {/* Background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" /> Powered by Starknet
                    </div>
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        La gastronomie<br />
                        <span className="text-brand-400">à l&apos;ère Web3</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                        Consultez notre menu, passez commande et payez en crypto ou en monnaie classique.
                        Chaque transaction est prouvée sur la blockchain Starknet.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        {[
                            { icon: <UtensilsCrossed className="w-4 h-4 text-brand-400" />, text: 'Menu varié' },
                            { icon: <Zap className="w-4 h-4 text-brand-400" />, text: 'Paiement Starknet' },
                            { icon: <Shield className="w-4 h-4 text-brand-400" />, text: 'Traçabilité on-chain' },
                        ].map(({ icon, text }) => (
                            <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                {icon} {text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu */}
            <MenuDisplay />
        </>
    );
}
