require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Red local para desarrollo
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // 🔗 Sepolia Testnet (Ethereum) - PRINCIPAL
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/fHvQNGDzVjsrx8WYqlPTi",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
      gasPrice: 20000000000, // 20 gwei
      gas: 500000,
      timeout: 60000
    },
    // Polygon Mumbai Testnet
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
    },
    // Polygon Mainnet
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 30000000000, // 30 gwei
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "YOUR_ETHERSCAN_API_KEY"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
