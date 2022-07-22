const Tokens= artifacts.require("Tokens");

module.exports= function (deployer,network,accounts){
    deployer.deploy(Tokens);
    console.log("Network Details :",network);
}