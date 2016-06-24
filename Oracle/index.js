var Web3 = require('web3');

var web3 = new Web3();
web3.eth.defaultAccount = "0x2beade0bb1010f45e1312bb0a982a25b01f83455";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var alphabet = 'abcdefghijklmnopqrstuvwxyz',
    natural, coinbase, spawner, file, lineReader, words, currentWord, demand,
    history, letterMonitor,bank,uniqueLetters, amounts, index, clock,
    child_process, slots, a, c, w, l, ticker, orders;
var letterMonitorAddresses;
natural = require('natural');
tokenizer = new natural.WordTokenizer();
localhost = "http://127.0.0.1:8545";
external= ''; // PASTE EXTERNAL RPC PROVIDER HERE, e.g. Morden

provider = localhost; // the provider is going to be set as the local host( our private chain) for the purposes of this test

web3.setProvider(new web3.providers.HttpProvider(provider));
coinbase = web3.eth.coinbase; //get the coinbase address

spawner = web3.eth.contract([{"constant":false,"inputs":[],"name":"runSpawner","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getMonitorAddress2","outputs":[{"name":"a","type":"address"},{"name":"b","type":"address"},{"name":"c","type":"address"},{"name":"d","type":"address"},{"name":"e","type":"address"},{"name":"f","type":"address"},{"name":"g","type":"address"},{"name":"h","type":"address"},{"name":"i","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"getMonitorAddress1","outputs":[{"name":"a","type":"address"},{"name":"b","type":"address"},{"name":"c","type":"address"},{"name":"d","type":"address"},{"name":"e","type":"address"},{"name":"f","type":"address"},{"name":"g","type":"address"},{"name":"h","type":"address"},{"name":"i","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"deployedLetterCompany","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_letterMonitors","type":"address[]"},{"name":"_bank","type":"address"},{"name":"_wordCompany","type":"address"}],"name":"createLetterCompany","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getMonitorAddress3","outputs":[{"name":"a","type":"address"},{"name":"b","type":"address"},{"name":"c","type":"address"},{"name":"d","type":"address"},{"name":"e","type":"address"},{"name":"f","type":"address"},{"name":"g","type":"address"},{"name":"h","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"deployedToken","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"uint8"},{"name":"_productionTime","type":"uint8"}],"name":"createLettersMonitors","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"data","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"deployedLettersMonitors","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"deployedWord","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"centralMinter","type":"address"}],"name":"createScamions","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_scamionContractAddress","type":"address"},{"name":"_letters","type":"address[]"}],"name":"createWord","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"resetAll","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"centralMiner","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"cntr_miner","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"address"}],"name":"CreatedLetter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"address"}],"name":"CreatedWord","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"address"}],"name":"CreatedToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"address"}],"name":"CreatedLetterCompany","type":"event"}]).at("0x6522504ABeD55EC3FEd34B39f378f0e550F7898f");

bank =web3.eth.contract([{"constant":false,"inputs":[{"name":"deployedWord","type":"address"},{"name":"deployedLetter","type":"address"}],"name":"reset","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],"name":"setPrices","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint81"}],"type":"function"},{"constant":false,"inputs":[{"name":"_accounts","type":"address[]"},{"name":"scamAddress","type":"address"}],"name":"transferBack","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"address"}],"name":"resetBalance","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"centralMinter","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]).at(spawner.deployedToken());

letterMonitor = web3.eth.contract([{"constant":false,"inputs":[],"name":"tickTime","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_productionTime","type":"uint8"}],"name":"setProductionTime","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"productionTime","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint8"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint8"}],"name":"decrementDemand","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"currentDemand","outputs":[{"name":"","type":"int8"}],"type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"type":"function"},{"inputs":[{"name":"_symbol","type":"uint8"},{"name":"_productionTime","type":"uint8"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"TimeAdvanced","type":"event"}]);
wordCompany = web3.eth.contract([{"constant":false,"inputs":[{"name":"orderId","type":"uint8"}],"name":"sellWord","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"int8"},{"name":"orderID","type":"uint8"},{"name":"_letterSymbol","type":"uint8"},{"name":"_amount","type":"uint8"}],"name":"buyLetter","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_letters","type":"uint8[]"},{"name":"_amounts","type":"uint8[]"}],"name":"incrementDemand","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"letterMonitors","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_letterSymbol","type":"uint8"},{"name":"orderID","type":"uint8"},{"name":"_price","type":"uint8"},{"name":"_amount","type":"uint8"}],"name":"isWordReady","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"ticker","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"name":"orders","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"},{"name":"","type":"uint256"}],"name":"diffLetters","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"advanceTime","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"scamionContractAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_scamionContractAddress","type":"address"},{"name":"_letters","type":"address[]"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"AdvancedTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"OrderPlaced","type":"event"}]).at(spawner.deployedWord());

var letterCompany= web3.eth.contract([{"constant":true,"inputs":[],"name":"getFreeSlots","outputs":[{"name":"x","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"letterMonitors","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"inProgress","outputs":[{"name":"productionTime","type":"uint8"},{"name":"timestamp","type":"uint8"},{"name":"symbol","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"bank","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"ticker","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"letters","type":"uint8[]"}],"name":"startProduction","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint8"}],"name":"sellLetter","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"maxSlots","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"advanceTime","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"sellifReady","outputs":[],"type":"function"},{"inputs":[{"name":"_letterMonitors","type":"address[]"},{"name":"_bank","type":"address"},{"name":"_wordCompany","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"AdvancedTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"OrderPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"out","type":"string"}],"name":"LetterWasBusy","type":"event"}]).at(spawner.deployedLetterCompany());

// letterMonitorAddresses =new Array(26);
var iterations = 1;
productionTimes = new Array(26);
slots = new Array(10);
console.log('Welcome')
blockChainDemand = new Array(26);
demand = new Array(26);
var banksetupHash = bank.reset(spawner.deployedWord(), spawner.deployedLetterCompany());
while(web3.eth.getTransaction(banksetupHash).blockNumber == true)
{
  process.stdout.write("Waiting for scamions to be printed..\r");
}
//console.log(letterMonitorAddresses[]);
letterMonitorAddresses= spawner.getMonitorAddress1();
letterMonitorAddresses=   letterMonitorAddresses.concat(spawner.getMonitorAddress2());
letterMonitorAddresses=   letterMonitorAddresses.concat(spawner.getMonitorAddress3());
for (c = 0; c < alphabet.length; c++) {
  // console.log(letterMonitorAddresses);
  demand[c] = new Array();
  blockChainDemand[c]= new Array();           /* Create matrix to store demand data points */
  demand[c].push(0);
  var productiontime = getRandomInt(1,5);
  productionTimes[c] = productiontime;

  letterMonitor.at(letterMonitorAddresses[c]).setProductionTime(productiontime);     /* Set the
  letter
  production time of the letters to some random number between 1 and 10 */
}

file = "alice-train.txt";
lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(file)
});

lineReader.on('line', function (line) {
  console.log("\nIterations : " + iterations.toString()+ "\n")
  words = tokenizer.tokenize(line);

  for (w = 0; w < words.length; w++) {                            /* Loop through all words in current line */

    currentWord = words[w].toLowerCase();
    // currentWord =word.replace(/[^A-Za-z0-9]/g, '');

    console.log(currentWord);
    uniqueLetters = [];
    amounts = [];
    for (l = 0; l < currentWord.length; l++) {                    /* Loop through all letters in current word to count occurrences */
      if (alphabet.indexOf(currentWord[l]) == -1) {
        continue;
      }
      index = uniqueLetters.indexOf(currentWord[l]);              /* Find index of letter in list of unique letters */
      if (index == -1) {                                          /* If it's not there */
        uniqueLetters.push(alphabet.indexOf(currentWord[l]));     /* Then add it to the list */
        amounts.push(1);                                          /* And set counter to one */
      } else {
        amounts[index]++;                                         /* Otherwise it has already been found and the counter can be incremented */
      }
    }

    /* Increment the demand */
    console.log(uniqueLetters + "\n")
    console.log(amounts + "\n")

    var demandHash = wordCompany.incrementDemand(uniqueLetters, amounts);

    // for (a = 0; a < demand.length; a++) {
    //   demand[uniqueLetters[a]].push(amounts[a]);
    //   // var letterHash = demand
    // }
    while (web3.eth.getTransactionReceipt(demandHash) == null)
    {       process.stdout.write("Waiting for demands to increase.                   \r");}

    var sellHash = letterCompany.sellifReady();

    while(web3.eth.getTransactionReceipt(sellHash)==null)
    {
      process.stdout.write("Waiting for letters to be sold.                            .\r");
    }

    /* Getting Monitor demands */

      for (a = 0; a < letterMonitorAddresses.length; a++) {
        var temp = letterMonitor.at(letterMonitorAddresses[a]).currentDemand();
        blockChainDemand[a].push(temp)
        if (iterations > 30)
        {
        blockChainDemand[a].shift();
        }
      }

    /* Getting letter company slots*/
    var freeSlots = letterCompany.getFreeSlots();

    /* Make informed decision using python Oracle */
    if(iterations > 8)
    {

    var child_process = require('child_process');
      var history = child_process.execSync('python input.py -t ' + JSON.stringify(blockChainDemand) + ' -u ' +  JSON.stringify(productionTimes) + ' -v ' + JSON.stringify(freeSlots));
      process.stdout.write(history);
      var lettersToProduce = JSON.parse(history.toString());
    /* Make orders */
    var diffLetters
    var productionHash = letterCompany.startProduction(lettersToProduce);
    while (web3.eth.getTransactionReceipt(productionHash) == null);
    {
      process.stdout.write("Waiting for production to start \r");

    }

  }
    /* Now tick the time */
    var wCtimeHash =wordCompany.advanceTime();
    while( web3.eth.getTransactionReceipt(wCtimeHash) == null)
    {
      process.stdout.write("Waiting for word company time to advance                    \r");

    }
    var lCtimeHash = letterCompany.advanceTime();
    while (web3.eth.getTransactionReceipt(lCtimeHash) == null)
    {
        process.stdout.write("Waiting for lettercompany time to advance               \r");
    }
    var MonitortimeHash;
    MonitortimeHash = new Array(25)
    for (c = 0; c < alphabet.length; c++) {
      MonitortimeHash[c]=letterMonitor.at(letterMonitorAddresses[c]).tickTime();     /* Set the production time of the letters to some random number between 1 and 10 */
    }
    while (web3.eth.getTransactionReceipt(MonitortimeHash[25]) == null)
  {
    process.stdout.write("Waiting for monitors time to advance   \r");

  }
  iterations+=1;




  }
});
