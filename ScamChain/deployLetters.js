personal.unlockAccount("0xa47ab0de78a67c28cc167c1e3068c456aca29915", "kaichain");
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var minDays = 2;
var maxDays = 10;

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

for (var l = 0; l < 26; l++) {

var _symbol = alphabet[l]; /* var of type bytes1 here */
var _productionTime = getRandomInt(minDays, maxDays); /* var of type uint256 here */
var letterContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"productionTime","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"demand","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes1"}],"type":"function"},{"constant":false,"inputs":[{"name":"_productionTime","type":"uint256"}],"name":"setProductionTime","outputs":[],"type":"function"},{"inputs":[{"name":"_symbol","type":"bytes1"},{"name":"_productionTime","type":"uint256"}],"type":"constructor"}]);
var letter = letterContract.new(
   _symbol,
   _productionTime,
   {
     from: web3.eth.accounts[0], 
     data: '6060604052604051604080610213833981016040528080519060200190919080519060200190919050505b600060026000508190555081600060006101000a81548160ff02191690837f010000000000000000000000000000000000000000000000000000000000000090040217905550806001600050819055505b50506101888061008b6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806339d9264a146100655780634d8a6b6614610088578063799ace98146100ab57806395d89b41146100c35780639801c2161461010857610063565b005b6100726004805050610120565b6040518082815260200191505060405180910390f35b6100956004805050610129565b6040518082815260200191505060405180910390f35b6100c16004808035906020019091905050610132565b005b6100d06004805050610148565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b61011e600480803590602001909190505061017a565b005b60016000505481565b60026000505481565b8060026000828282505401925050819055505b50565b600060009054906101000a90047f01000000000000000000000000000000000000000000000000000000000000000281565b806001600050819055505b5056', 
     gas: 3000000
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
}


