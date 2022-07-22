const getWeb3 = require("./web3");
const Tokens = require("./build/contracts/Tokens.json");
let contract;

const main = async () => {
  let web3 = await getWeb3();
  // console.log(web3);
  let accounts = await web3.eth.getAccounts();
  // console.log(accounts);
  let bal = await web3.eth.getBalance(accounts[0]);
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
  console.log("Loading....");
  let acc2 = accounts[4];
  let initialBalAcc1 = await contract.methods.balanceOf(admin).call();
  let initialBalAcc2 = await contract.methods.balanceOf(acc2).call();

  await contract.methods
    .transfer(acc2, 100000)
    .send({ from: admin, value: 100 });
  let balAfterTransfer2 = await contract.methods.balanceOf(acc2).call();
  let balAfterTransfer1 = await contract.methods.balanceOf(admin).call();

  let txnDetails = {
    "Initial Balance Account one": initialBalAcc1,
    "final Balance Account one": balAfterTransfer1,
    "Initial Balance Account second": initialBalAcc2,
    "final Balance Account second": balAfterTransfer2,
  };

  console.log(txnDetails);
  console.log("Transfer Done...");
};

main();
