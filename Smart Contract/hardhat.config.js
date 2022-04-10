require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/VdmnYbRolbRj5eHrHHo657WQHQDl0p-j",
      accounts: ['4a8a894c37235fb05c8fd11e13a6e420ff194123a30dac180a6ec94b7722c1ce']
    }
  }
}