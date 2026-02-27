'use client';

import { mainnet, sepolia } from '@starknet-react/chains';
import { StarknetConfig, publicProvider, argent, braavos } from '@starknet-react/core';
import { ThemeProvider } from './theme-provider';

const chains = [mainnet, sepolia];
const connectors = [argent(), braavos()];

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <StarknetConfig
                chains={chains}
                provider={publicProvider()}
                connectors={connectors}
                autoConnect
            >
                {children}
            </StarknetConfig>
        </ThemeProvider>
    );
}
