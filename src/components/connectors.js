import { InjectedConnector } from '@web3-react/injected-connector'

export const Networks = {
  MainNet: 1,
  Rinkeby: 4,
  Ropsten: 3,
  Kovan: 42,
}

export const TOKENS_BY_NETWORK = {
  [Networks.Rinkeby]: [
    {
      address: "0x26FF6e064D70531AE5bb824D504D055D69b62ba8",
      symbol: "JOAX",
      name: "Joaxap.eth Business Card NFT",
      decimals: 0,
    },
  ],
}


export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})