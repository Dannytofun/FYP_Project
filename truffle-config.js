
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() { 
      return new HDWalletProvider(process.env.PRIVATE_KEY, `https://eth-rinkeby.alchemyapi.io/v2/${process.env.RINKEBY_KEY}`);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    goerli: {
      provider: function() { 
      return new HDWalletProvider(process.env.PRIVATE_KEY, `https://eth-goerli.alchemyapi.io/v2/${process.env.GOERLI_KEY}`);
      },
      network_id: 5,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};
