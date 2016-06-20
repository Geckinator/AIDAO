personal.unlockAccount("0xa47ab0de78a67c28cc167c1e3068c456aca29915", "kaichain");
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var minDays = 2;
var maxDays = 10;

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

for (var l = 0; l < 26; l++) {

var _symbol = l; /* var of type bytes1 here */
var _productionTime = getRandomInt(minDays, maxDays); /* var of type uint256 here */
var _baseCost = l/* var of type uint256 here */ ;
var letterContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"productionTime","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"demand","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"baseCost","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_productionTime","type":"uint256"}],"name":"setProductionTime","outputs":[],"type":"function"},{"inputs":[{"name":"_symbol","type":"uint8"},{"name":"_productionTime","type":"uint256"},{"name":"_baseCost","type":"uint256"}],"type":"constructor"}]);
var letter = letterContract.new(
   _symbol,
   _productionTime,
   _baseCost,
   {
     from: web3.eth.accounts[0], 
     data: '6060604052604051606080610203833981016040528080519060200190919080519060200190919080519060200190919050505b600060026000508190555082600060006101000a81548160ff0219169083021790555081600160005081905550806003600050819055505b5050506101878061007c6000396000f360606040523615610074576000357c01000000000000000000000000000000000000000000000000000000009004806339d9264a146100765780634d8a6b6614610099578063799ace98146100bc57806393822557146100d457806395d89b41146100f75780639801c2161461011d57610074565b005b6100836004805050610135565b6040518082815260200191505060405180910390f35b6100a6600480505061013e565b6040518082815260200191505060405180910390f35b6100d26004808035906020019091905050610147565b005b6100e1600480505061015d565b6040518082815260200191505060405180910390f35b6101046004805050610166565b604051808260ff16815260200191505060405180910390f35b6101336004808035906020019091905050610179565b005b60016000505481565b60026000505481565b8060026000828282505401925050819055505b50565b60036000505481565b600060009054906101000a900460ff1681565b806001600050819055505b5056', 
     gas: 3000000
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
}


