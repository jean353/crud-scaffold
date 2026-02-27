import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/starkfood/Navbar';

export const metadata: Metadata = {
    title: 'StarkFood — Restaurant Web3',
    description: 'Commandez vos plats et payez en crypto sur Starknet. Le meilleur restaurant hybride Web2 + Web3.',
    keywords: ['starknet', 'restaurant', 'web3', 'cairo', 'food', 'crypto'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className="dark" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="min-h-screen flex flex-col">
                <Providers>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <footer className="py-8 text-center text-sm text-[var(--muted)] border-t border-[var(--border)] mt-16">
                        <p>
                            <span className="font-display italic text-brand-500">StarkFood</span> — Powered by{' '}
                            <a href="https://starknet.io" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">
                                Starknet
                            </a>{' '}
                            &amp; Laravel
                        </p>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
