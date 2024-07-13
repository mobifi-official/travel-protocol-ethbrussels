import { http, createConfig } from 'wagmi'
import { polygonZkEvm, polygonZkEvmCardona } from 'wagmi/chains'

export const config = createConfig({
    chains: [polygonZkEvmCardona, polygonZkEvm],
    transports: {
        [polygonZkEvmCardona.id]: http(),
        [polygonZkEvm.id]: http(),
    },
})