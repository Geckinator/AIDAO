#!/usr/bin/env node
console.log('Welcome');
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var letterAddresses = ["0x505c1d1ff3d826f1ba5e52e5a8337e89c16f11d4", "0x1810452b6fe682c3b2fc9a317b4d5ca81b3ae50c", "0x8d110c5fab1db0bb1dccd6fed12e245ca5e5aad8", "0xd60f36346099593c6b1b1dd8d5b88538a2492d0c", "0x105de907db83c53a60029b95604835cfa4c232f4", "0x161b37defa168955adea0c8711f0cdac23da75db", "0x9bde581a091cdab9c9767812f418789b89eb2e44", "0x60809e8a10dc644381b23e68869ef9555e4c0d3d", "0x046fbec4d55b42a817f6edd92ae90bfeac677a2d", "0xd476fbb8a839eb63caad0dbb27badf64ef84fbea", "0x633182f5d746503b955c88860197091e4a6eb6db", "0xef70dbfc1e48bdc5ef1c5ac45ab4e9c941c141cf", "0x783b7280ed143352fc7d670cba0fa9ab9f89526d", "0x67e9535325d4092a1b2dd1d7475ffae612fcf023", "0x8b3d171e09bb8439e9da7e73fa04651278436c57", "0x3d0a053470b084430e8387442aa1385e12be5766", "0x6d4d47f768aae4408546f67e340a8cc056cb2b4d", "0xdc8562e853763fef545a45fd289236c148b3f274", "0x6e37d304c3336a738f94a426e617fbacbbd99739", "0x219ea9359380787be6d45a29bb53eb967e31ed2a", "0x1e6f5961157497a002d34f011d9cb46ef3feea3a", "0x95e96552b219a5a419584ce5f36d46b339745ea3", "0xca4fff0e27c18c722f8197b491dd2fb8305ff1fe", "0x6f4ea8d86f44b966f6ee80e69464468bffc3434b", "0xc19d4c32930697f666652f69ee7db26b6093e886", "0xc01acfdf311aaccd2d93ef78cc1d51899c4c6d17"];
//Imports: Imports go here
var PythonShell = require('python-shell');

var Web3 = require('web3');
//end Imports
var web3 = new Web3();
// var pyshell =  new PythonShell();
// var reader = require ("buffered-reader");
// var BinaryReader = reader.BinaryReader;
// var DataReader = reader.DataReader;
var natural = require('natural'),
tokenizer = new natural.WordTokenizer();
localhost ="http://127.0.0.1:8545";
external= '' // PASTE EXTERNAL RPC PROVIDER HERE, e.g. Morden


provider = localhost; // the provider is going to be set as the local host( our private chain) for the purposes of this small test

web3.setProvider(new web3.providers.HttpProvider(provider));
var coinbase = web3.eth.coinbase; //get the coinbase address
console.log(coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));

var accounts = web3.eth.accounts;
console.log(accounts); // return all the accounts managed by the node

/* Get the ABIs of the contracts */
abiScamion = [{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],"name":"setPrices","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"centralMinter","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
abiLetter = [{"constant":false,"inputs":[],"name":"getSymbol","outputs":[{"name":"s","type":"bytes1"}],"type":"function"},{"constant":true,"inputs":[],"name":"productionTime","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getProductionTime","outputs":[{"name":"t","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"demand","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"getDemand","outputs":[{"name":"a","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes1"}],"type":"function"},{"constant":false,"inputs":[{"name":"_productionTime","type":"uint256"}],"name":"setProductionTime","outputs":[],"type":"function"},{"inputs":[{"name":"_symbol","type":"bytes1"},{"name":"_productionTime","type":"uint256"}],"type":"constructor"}];
abiWord = [{"constant":false,"inputs":[{"name":"_uniqueLetters","type":"bytes"},{"name":"_amounts","type":"uint8[]"}],"name":"tickTime","outputs":[{"name":"clock","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes1"}],"name":"letterContracts","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orderTimestamps","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"clock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"uniqueLetters","type":"bytes"}],"type":"function"},{"constant":false,"inputs":[{"name":"_letterSymbols","type":"bytes"},{"name":"_amounts","type":"uint8[]"}],"name":"buyLetter","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes1"}],"name":"lettersInStock","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"inputs":[{"name":"_scamionContractAddress","type":"address"},{"name":"_letters","type":"address[]"}],"type":"constructor"}];

/* Create contracts */
var ScamionContract = web3.eth.contract(abiScamion);
var LetterContract = web3.eth.contract(abiLetter);
var WordContract = web3.eth.contract(abiWord);

/* Instantiate contracts */
var scam = ScamionContract.at("0x11fa0bcc3b073510cc6c38f4485e39d6be3daf64");
var letters = [];
for (var i = 0; i < alphabet.length; i++) {
  letters.push(LetterContract.at(letterAddresses[i]));
}
var word = WordContract.at("0xe79ee4e5951ac6c2ce4161ce66416012af93bc56");

/* Create matrix to store demand data points */
var demand = new Array(letterAddresses.length);
for (var i = 0; i < letterAddresses.length; i++) {
  demand[i] = new Array();
}


/* Read from file */
var file = "mobydick.txt";
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(file)
});

lineReader.on('line', function (line) {
  // console.log('Line from file:', line);
  //TODO: read information and send information to contracts
  //TODO: Wait for TICK to occur, then retrieve graph curves from letter factories
  //TODO: retrieve graph curves and what not, send the information to python-shell
  //TODO: based on what python-shell returned call the contracts and set some variables there.
  var words = tokenizer.tokenize(line);
  for (var w = 0; w < words.length; w++) {                        /* Loop through all words in current line */
    word = words[w];
    console.log(word);
    var uniqueLetters = [];
    var amounts = [];
    for (var y = 0; y < word.length; y++) {                       /* Loop through all letters in current word to count occurrences */
      var index = uniqueLetters.indexOf(word[y]);                 /* Find index of letter in list of unique letters */
      if (index == -1) {                                          /* If it's not there */
        uniqueLetters.push(word[y]);                              /* Then add it to the list */
        amounts.push(1);                                          /* And set counter to one */
      } else {
        amounts[index]++;                                         /* Otherwise it has already been found and the counter can be incremented */
      }
    }

    //console.log(letters[0].getDemand());

    /* Now tick the time */
    //clock = word.tickTime(uniqueLetters, amounts);

    for (var l = 0; l < letterAddresses.length; l++) {
      //demand[l].push(letters[l].getDemand());
    }

    var options = {
      mode: 'binary',
      scriptPath: '/home/kingkongkai/AIDAO/Oracle',
      args: demand
    };

    PythonShell.run('Kalman.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
    });

  }
  console.log(words);
});
