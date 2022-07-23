const getWeb3 = require("./web3");
const Tokens = require("./build/contracts/Tokens.json");
let contract;
require("dotenv").config();

const main = async (addr, value) => {
  let web3 = await getWeb3();
  // console.log(web3);
  let accounts = await web3.eth.getAccounts();
  // console.log(accounts);
  //   let bal = await web3.eth.getBalance(accounts[0]);
  // console.log(bal);
  // bal = await web3.utils.fromWei(bal, "ether");
  // //   //Making contract instance by web3js
  let id = await web3.eth.net.getId();
  let addressContract = Tokens.networks[id].address;
  contract = await new web3.eth.Contract(Tokens.abi, addressContract);

  //Details Of Token :-

  let name = await contract.methods.name().call();
  let symbol = await contract.methods.symbol().call();
  let totalSupply = await contract.methods.totalSupply().call();
  let decimals = await contract.methods.decimals().call();
  let admin = await contract.methods.admin().call();
  let basefees = await contract.methods.basefees().call();
  let details = {
    name,
    symbol,
    totalSupply,
    decimals,
    admin,
    basefees,
  };

    // Transfer tokens via contract Function
    //   console.log("Loading....");
    console.log(details);
    //   let acc2 = accounts[4];
    const gasPrice = await web3.eth.getGasPrice();
    let intial_Account_Balance_Admin = await contract.methods.balanceOf(admin).call();
    let initial_Account_Balance_To = await contract.methods.balanceOf(addr).call();

    await contract.methods
      .transfer(addr, value)
      .send({ from: admin, value: 100, gas: 1000000 });
    const tx = {
    // this could be provider.addresses[0] if it exists
    from: admin,
    // target address, this could be a smart contract address
    to: addressContract,
    // optional if you want to specify the gas limit
    gas: gasPrice,
    // optional if you are invoking say a payable function
    value: basefees,
    // this encodes the ABI of the method and the arguements
    data: contract.methods.transfer(addr, value).encodeABI(),
  };


  //Signing Transaction by private key
  let privateKey = process.env.PRIVATEKEY_ADMIN;
  let signed = await web3.eth.accounts.signTransaction(tx, privateKey);



  let balance_After_Transaction_To = await contract.methods.balanceOf(addr).call();
  let balance_After_Transaction_Admin = await contract.methods.balanceOf(admin).call();

  let txnDetails = {
    intial_Account_Balance_Admin,
    balance_After_Transaction_Admin,
    initial_Account_Balance_To,
    balance_After_Transaction_To,
  };

  return txnDetails;
};

module.exports = main;
