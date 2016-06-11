#!/usr/bin/env node
console.log('Welcome');

//Imports: Imports go here
var PythonShell = require('python-shell');
var Web3 = require('web3');
//end Imports
var web3 = new Web3();
var pyshell =  new PythonShell();

localhost ="http://localhost:8545";
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

abi = [{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"string"}],"type":"function"},{"inputs":[{"name":"_greeting","type":"string"}],"type":"constructor"}];


// creation of contract object
var MyContract = web3.eth.contract(abi);

// initiate contract for an address
var myContractInstance = MyContract.at('0x0067ef605fd5bc0150eee5c990990ef9921e72cc');

var result = myContractInstance.greet();
console.log(result);
//end warning



//TODO: Implement the main loop:
      //TODO: write methods that read the book and send words to contracts
      // words must only be read once the system has ticked


      //TODO: Import Python-shell plugin, figure out how python can be called from within nodejs,
