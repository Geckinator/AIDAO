#!/usr/bin/env node

console.log('Welcome');
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var letterAddresses = ["0x6d5bd9042e223b8f698fbbfc4e6e8a08eaae8112", "0x7d3ddca246b91a5545a92097b7fca6b68744377e", "0x76e3c0a88cbc80b058be204aa63205d0ff7d1cd9", "0xa055e06de9e9b6480231c0b657f5df356005d6a6", "0x4f183f5bd8660700ebc6de386d9f65be58c79f33", "0x85aa04bc4d41731930b0274ee7437aca8406bf45", "0x78c48b3ab6f6568c30359731f04c8e7a15e61dc7", "0x936eb5d9c4f5cc0ad166011b830f6838ea39add6", "0x2ff205e2338b526a050aa808a2c34f154fdabf5b", "0xd604562dbd4e589ace7869cd11f203d077e7237c", "0xefd66515160d8d0eb5cd8ff5800d11882e96f21f", "0x11a016761f50e61c385866c01075f975fdebf8c0", "0x6342f48a8e771a02576dd67d78116b7d2b021c3b", "0x9ec58b165d767f3e32861c91a23a10da1befeb5a", "0x283b8aaaa57c44fb0eda386a1de703b104b1fbad", "0xca629b2901cc6ad27f0e2a2c055935d1ae0725ba", "0xcb526ca9beb22d8ee7f6b8f118928f4230688776", "0x8c9c89408963a9d77e63bbaa108372211d263730", "0xae1cd6953b4b6509901872f0c867acc6652337db", "0x30a5968d30604e4e533592a58fb6696f559b056e", "0x3a2a0ec081653fde111b7d3d35dad884c5c595c5", "0xf2006a884a1aa53c7d05df2faec580bb493d27c4", "0x7398503b9f02b16b9ecb2f262a873139eda0c233", "0x5d573c198519e884235a0f6c94b0a14c673998be", "0xe18ffa8caaf1874bebb179cec11778e98ab060cd", "0x29d421e87945c2c355dfa32bb9e0625db082df44"];
//Imports: Imports go here
var PythonShell = require('python-shell');

var Web3 = require('web3');
//end Imports
var web3 = new Web3();
web3.eth.defaultAccount = "0xa47ab0de78a67c28cc167c1e3068c456aca29915";
// var pyshell =  new PythonShell();
// var reader = require ("buffered-reader");
// var BinaryReader = reader.BinaryReader;
// var DataReader = reader.DataReader;
var natural = require('natural');
tokenizer = new natural.WordTokenizer();
localhost = "http://127.0.0.1:8545";
external= ''; // PASTE EXTERNAL RPC PROVIDER HERE, e.g. Morden

provider = localhost; // the provider is going to be set as the local host( our private chain) for the purposes of this small test

web3.setProvider(new web3.providers.HttpProvider(provider));
var coinbase = web3.eth.coinbase; //get the coinbase address

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

/* Get the ABIs of the contracts */
abiScamion = [{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],"name":"setPrices","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_accounts","type":"address[]"},{"name":"scamAddress","type":"address"}],"name":"transferBack","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"centralMinter","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
abiLetter = [{"constant":true,"inputs":[],"name":"productionTime","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"demand","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"baseCost","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_productionTime","type":"uint256"}],"name":"setProductionTime","outputs":[],"type":"function"},{"inputs":[{"name":"_symbol","type":"uint8"},{"name":"_productionTime","type":"uint256"},{"name":"_baseCost","type":"uint256"}],"type":"constructor"}];
abiWord = [{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"letterContracts","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lettersInStock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orderTimestamps","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_letterSymbols","type":"uint8[]"},{"name":"_amounts","type":"uint8[]"}],"name":"buyLetters","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"clock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_scamionAccounts","type":"address[]"}],"name":"reset","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_uniqueLetters","type":"uint8[]"},{"name":"_amounts","type":"uint8[]"}],"name":"tickTime","outputs":[{"name":"clock","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"scamionContractAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_scamionContractAddress","type":"address"},{"name":"_letters","type":"address[]"}],"type":"constructor"}];

/* Create contracts */
var ScamionContract = web3.eth.contract(abiScamion);
var LetterContract = web3.eth.contract(abiLetter);
var WordContract = web3.eth.contract(abiWord);

/* Find contracts */
var scam = ScamionContract.at("0xe840dba8ceefe2c8cf1ab7b1c329a679aa970a33");
var letters = [];
for (var i = 0; i < alphabet.length; i++) {
  letters.push(LetterContract.at(letterAddresses[i]));
}
var word = WordContract.at("0x2edad6a882370cb1cdcd0e9ee1a4cd59eb7c8b19");

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
    var currentWord = words[w].toLowerCase();
    var uniqueLetters = [];
    var amounts = [];
    for (var y = 0; y < currentWord.length; y++) {                       /* Loop through all letters in current word to count occurrences */
      var index = uniqueLetters.indexOf(currentWord[y]);                 /* Find index of letter in list of unique letters */
      if (index == -1) {                                          /* If it's not there */
        uniqueLetters.push(alphabet.indexOf(currentWord[y]));                              /* Then add it to the list */
        amounts.push(1);                                          /* And set counter to one */
      } else {
        amounts[index]++;                                         /* Otherwise it has already been found and the counter can be incremented */
      }
    }

    /* Now tick the time */
    clock = word.tickTime(uniqueLetters, amounts);

    for (var l = 0; l < letterAddresses.length; l++) {
      demand[l].push(letters[l].demand());
    }

    console.log(uniqueLetters);
    console.log(amounts);

    console.log(String(word.clock()));
    console.log(String(demand));
/*
    var options = {
      mode: 'binary',
      scriptPath: '/home/kingkongkai/AIDAO/Oracle',
      args: demand
    };

    PythonShell.run('Kalman.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
    });
*/

  }
});
