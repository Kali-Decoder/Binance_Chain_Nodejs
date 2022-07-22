const Web3 = require("web3");

const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545/"); //https://data-seed-prebsc-1-s1.binance.org:8545/
    const web3 = new Web3(provider);
    console.log("Binance Blockchain Is Running ");
    resolve(web3);
  });
};

module.exports = getWeb3;
