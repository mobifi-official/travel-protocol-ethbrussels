import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.25",
  networks: {
    polygonZkEVMCardona: {
      url: "https://polygonzkevm-cardona.g.alchemy.com/v2/RwoCXzANjNSDtgtXkNRs05hry-Mwh45K",
      accounts: ["1a69d4e289e001b9753e70348dcf23050bd5685e67852a438b3b5aeeb2c3aa4c"],
    },
  },
  
  // etherscan: {
  //   customChains: [
  //     {
  //       network: "polygonZkEVMCardona",
  //       chainId: 1442,  // Note: Chain ID for testnet is 1442, not 2442
  //       urls: {
  //         apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
  //         browserURL: "https://testnet-zkevm.polygonscan.com",
  //       },
  //     },
  //   ],
  // },
};

export default config;