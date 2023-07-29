require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    sepolia : {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainID: 58008
    }

  },
  solidity: "0.8.8",
};
