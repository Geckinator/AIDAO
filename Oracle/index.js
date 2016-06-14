#!/usr/bin/env node
console.log('Welcome');

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


provider =  localhost; // the provider is going to be set as the local host( our private chain) for the purposes of this small test

web3.setProvider(new web3.providers.HttpProvider(provider));
var coinbase = web3.eth.coinbase; //get the coinbase address
console.log(coinbase)

var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));
var mining = web3.eth.mining;


console.log(mining); // true or false, is the node mining atm


var accounts = web3.eth.accounts;
console.log(accounts); // return all the accounts managed by the node



//warning: THIS IS A TEST CONTRACT THAT ONLY RESIDES ON MY PRIVATE CHAIN
//to test your own contracts, you need to paste the ABI of your own contract and the change the contract address below as well as the called methods in myConstractInstance.
//
// abi = [{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"string"}],"type":"function"},{"inputs":[{"name":"_greeting","type":"string"}],"type":"constructor"}]
// ;
//
//
// // creation of contract object
// var MyContract = web3.eth.contract(abi);
//
// // initiate contract for an address
// var myContractInstance = MyContract.at('0x30df1ca827f54a3bc213b97e69e6386737fc0a26');
//
// var result = myContractInstance.greet();
// console.log(result);
// //end warning
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
  console.log(words);
});
