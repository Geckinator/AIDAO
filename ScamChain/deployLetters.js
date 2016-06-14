personal.unlockAccount("0xa47ab0de78a67c28cc167c1e3068c456aca29915", "kaichain");
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var minDays = 2;
var maxDays = 10;

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

for (var l = 0; l < 26; l++) {

var _symbol = alphabet[l]/* var of type bytes1 here */ ;
var _productionTime = getRandomInt(minDays, maxDays)/* var of type uint256 here */ ;
var letterContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"getSymbol","outputs":[{"name":"s","type":"bytes1"}],"type":"function"},{"constant":true,"inputs":[],"name":"productionTime","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getProductionTime","outputs":[{"name":"t","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"demand","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"getDemand","outputs":[{"name":"a","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes1"}],"type":"function"},{"constant":false,"inputs":[{"name":"_productionTime","type":"uint256"}],"name":"setProductionTime","outputs":[],"type":"function"},{"inputs":[{"name":"_symbol","type":"bytes1"},{"name":"_productionTime","type":"uint256"}],"type":"constructor"}]);
var letter = letterContract.new(
   _symbol,
   _productionTime,
   {
     from: web3.eth.accounts[0], 
     data: '6060604052604051604080610324833981016040528080519060200190919080519060200190919050505b600060026000508190555081600060006101000a81548160ff02191690837f010000000000000000000000000000000000000000000000000000000000000090040217905550806001600050819055505b50506102998061008b6000396000f36060604052361561008a576000357c010000000000000000000000000000000000000000000000000000000090048063150704011461008c57806339d9264a146100d15780634cf50b0c146100f45780634d8a6b6614610117578063799ace981461013a5780637b273f011461015257806395d89b41146101755780639801c216146101ba5761008a565b005b61009960048050506101d2565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6100de600480505061020d565b6040518082815260200191505060405180910390f35b6101016004805050610216565b6040518082815260200191505060405180910390f35b6101246004805050610228565b6040518082815260200191505060405180910390f35b6101506004808035906020019091905050610231565b005b61015f6004805050610247565b6040518082815260200191505060405180910390f35b6101826004805050610259565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6101d0600480803590602001909190505061028b565b005b6000600060009054906101000a90047f010000000000000000000000000000000000000000000000000000000000000002905061020a565b90565b60016000505481565b60006001600050549050610225565b90565b60026000505481565b8060026000828282505401925050819055505b50565b60006002600050549050610256565b90565b600060009054906101000a90047f01000000000000000000000000000000000000000000000000000000000000000281565b806001600050819055505b5056', 
     gas: 3000000
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
}

