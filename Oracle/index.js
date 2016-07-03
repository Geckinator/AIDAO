  var Web3 = require('web3');

var web3 = new Web3();
web3.eth.defaultAccount = "0x4ea45081a42d19a39ee9df92d0913fa698488d1f";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var alphabet = 'abcdefghijklmnopqrstuvwxyz',
    natural, coinbase, spawner, file, lineReader, words, currentWord, demand,
    history, letterMonitor, letterCompany, uniqueLetters, amounts, index, clock,
    child_process, slots, productionTime, productionTimes, nEmptySlot, a, c, w, l;

natural = require('natural');
tokenizer = new natural.WordTokenizer();
localhost = "http://127.0.0.1:8545";
external= ''; // PASTE EXTERNAL RPC PROVIDER HERE, e.g. Morden

provider = localhost; // the provider is going to be set as the local host( our private chain) for the purposes of this test

web3.setProvider(new web3.providers.HttpProvider(provider));
coinbase = web3.eth.coinbase; //get the coinbase address

spawner = web3.eth.contract([ { "constant": false, "inputs": [], "name": "runSpawner", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "deployedLetterCompany", "outputs": [ { "name": "", "type": "address", "value": "0x4a711efebd2ab823dcaa7570cb48ccd1df21bf2b" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_letterMonitors", "type": "address[]" }, { "name": "_bank", "type": "address" }, { "name": "_wordCompany", "type": "address" } ], "name": "createLetterCompany", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "deployedToken", "outputs": [ { "name": "", "type": "address", "value": "0xfca45c6dda54dcf14178445d6a304a57f0bf715e" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_symbol", "type": "uint8" }, { "name": "_productionTime", "type": "uint8" } ], "name": "createLettersMonitors", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "data", "type": "bytes32" } ], "name": "bytes32ToString", "outputs": [ { "name": "", "type": "string" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "deployedLettersMonitors", "outputs": [ { "name": "", "type": "address", "value": "0xa69baeb7ac1bca2fd9656309900d9819d5b43c40" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "deployedWord", "outputs": [ { "name": "", "type": "address", "value": "0x0cdeb32fe7658d22dc751f68649c8f4cb62a1125" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "decimalUnits", "type": "uint8" }, { "name": "tokenSymbol", "type": "string" }, { "name": "centralMinter", "type": "address" } ], "name": "createScamions", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "_scamionContractAddress", "type": "address" }, { "name": "_letters", "type": "address[]" } ], "name": "createWord", "outputs": [], "type": "function" }, { "constant": false, "inputs": [], "name": "resetAll", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "centralMiner", "outputs": [ { "name": "", "type": "address", "value": "0x4ea45081a42d19a39ee9df92d0913fa698488d1f" } ], "type": "function" }, { "inputs": [ { "name": "cntr_miner", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "cntr&thinsp;<span class=\"punctuation\">_</span>&thinsp;miner", "template": "elements_input_address", "value": "0x4ea45081a42d19a39ee9df92d0913fa698488d1f" } ], "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "out", "type": "address" } ], "name": "CreatedLetter", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "out", "type": "address" } ], "name": "CreatedWord", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "out", "type": "address" } ], "name": "CreatedToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "out", "type": "address" } ], "name": "CreatedLetterCompany", "type": "event" } ]).at(0x45cc74d49f38A160c34F17B4718C16d5Dd9C6A5d);
letterMonitor = web3.eth.contract([{"constant":false,"inputs":[],"name":"tickTime","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_productionTime","type":"uint8"}],"name":"setProductionTime","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"productionTime","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint8"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint8"}],"name":"decrementDemand","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"currentDemand","outputs":[{"name":"","type":"int8"}],"type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"type":"function"},{"inputs":[{"name":"_symbol","type":"uint8"},{"name":"_productionTime","type":"uint8"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"TimeAdvanced","type":"event"}]);
letterCompany = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"letterMonitors","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"inProgress","outputs":[{"name":"productionTime","type":"uint8"},{"name":"timestamp","type":"uint8"},{"name":"amount","type":"uint8"},{"name":"symbol","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"bank","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"ticker","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint8"}],"name":"sellLetter","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"maxSlots","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"advanceTime","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"sellifReady","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"uint8"},{"name":"_amount","type":"uint8"}],"name":"startProduction","outputs":[],"type":"function"},{"inputs":[{"name":"_letterMonitors","type":"address[]"},{"name":"_bank","type":"address"},{"name":"_wordCompany","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"AdvancedTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"OrderPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"LetterWasBusy","type":"event"}]).at(spawner.deployedLetterCompany());
wordCompany = web3.eth.contract([{"constant":false,"inputs":[{"name":"orderId","type":"uint8"}],"name":"sellWord","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"int8"},{"name":"orderID","type":"uint8"},{"name":"_letterSymbol","type":"uint8"},{"name":"_amount","type":"uint8"}],"name":"buyLetter","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_letters","type":"uint8[]"},{"name":"_amounts","type":"uint8[]"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"letterMonitors","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_letterSymbol","type":"uint8"},{"name":"orderID","type":"uint8"},{"name":"_price","type":"uint8"},{"name":"_amount","type":"uint8"}],"name":"isWordReady","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"ticker","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"name":"orders","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"},{"name":"","type":"uint256"}],"name":"diffLetters","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"advanceTime","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"scamionContractAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_scamionContractAddress","type":"address"},{"name":"_letters","type":"address[]"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"AdvancedTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"OrderPlaced","type":"event"}]).at(spawner.deployedWord());

slots = new Array(10);
productionTimes = new Array();
console.log(slots);
demand = new Array(alphabet.length);
for (c = 0; c < alphabet.length; c++) {
  demand[c] = new Array();                                                                           /* Create matrix to store demand data points */
  demand[c].push(0);
  productionTime = getRandomInt(1, 5);
  LetterMonitor.at(spawner.deployedLettersMonitors()[c]).setProductionTime(productionTime);     /* Set the production time of the letters to some random number between 1 and 10 */
  productionTimes.push(productionTime);
}

file = "alice-train.txt";
lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(file)
});

lineReader.on('line', function (line) {
  //TODO: read information and send information to contracts
  //TODO: Wait for TICK to occur, then retrieve graph curves from letter factories
  //TODO: retrieve graph curves and what not, send the information to python-shell
  //TODO: based on what python-shell returned call the contracts and set some variables there.

  words = tokenizer.tokenize(line);
  for (w = 0; w < words.length; w++) {                            /* Loop through all words in current line */
    currentWord = words[w].toLowerCase();
    uniqueLetters = [];
    amounts = [];
    for (l = 0; l < currentWord.length; l++) {                    /* Loop through all letters in current word to count occurrences */
      index = uniqueLetters.indexOf(currentWord[l]);              /* Find index of letter in list of unique letters */
      if (index == -1) {                                          /* If it's not there */
        uniqueLetters.push(alphabet.indexOf(currentWord[l]));     /* Then add it to the list */
        amounts.push(1);                                          /* And set counter to one */
      } else {
        amounts[index]++;                                         /* Otherwise it has already been found and the counter can be incremented */
      }
    }

    /* Increment the demand */
    wordContract.incrementDemand(uniqueLetters, amounts);
    for (a = 0; a < demand.length; a++) {
      demand[uniqueLetters[a]].push(amounts[a]);
    }

    /* Make informed decision using python Oracle */
    child_process = require('child_process');
    history = child_process.execSync('python input.py -t ' + JSON.stringify(demand) + JSON.stringify(productionTimes) + JSON.stringify(nEmptySlot));
    /* Make orders */
    letterCompany.startProduction(history[0], history[1]);

    /* Now tick the time */
    wordCompany.advanceTime()
    letterCompany.advanceTime();
    for (c = 0; c < alphabet.length; c++) {
      LetterMonitor.at(spawner.deployedLettersMonitors()[c]).tickTime();     /* Set the production time of the letters to some random number between 1 and 10 */
    }

    var advancedTime = wordCompany.AdvancedTime( {}, function(error, result) {
      if (!error) {
        var msg = "AddMsg: " + hex2a(result.args.msg) + " from " result.args.sender + " (block:" + result.blockNumber + ")";
        Console.log(msg);
      }
    });


  }
});
