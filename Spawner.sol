

contract Word {

  uint8 public ticker;                                      /* Keeps track of current time. */
  address public scamionContractAddress;                         /* Address of the scamion contract. */

  // struct Order
  // {
  //   mapping (uint8 => uint8) letterAmounts;
  //   uint8[] numofDiffLetters;

  // }
  mapping(uint8 => mapping (uint8 => uint8)) orders;
  mapping(uint8 => uint8[]) diffLetters ; /* orderid => letters[] */
  // mapping(uint8 => uint8) numDiffLetters /* */
  // mapping(uint8 => Order)  orders ;

  event AdvancedTime(string out);
  event OrderPlaced(string out);

  mapping (uint8 => address) public letterContracts;       /* Reference list of all 26 letter contracts. */


function Word(address _scamionContractAddress, address[] _letters)
{
    ticker = 0;
    scamionContractAddress = _scamionContractAddress;
    /* Initialize all letter contracts */
    for (uint8 t = 0; t < _letters.length; t++)
    {
        letterContracts[t] = _letters[t];
    }
}

function placeOrder(uint8[] _letters, uint8[] _amounts )
{
    mapping (uint8 => uint8) temp;
    for (uint8 t = 0; t < _letters.length ; t++)
    {
        // temp[_letters[t]] = _amounts[t];
        orders[ticker][_letters[t]] = _amounts[t];
        Letter(letterContracts[_letters[t]]).placeOrder(_amounts[t]);
    }
    // orders[ticker] = temp;
    diffLetters[ticker] = _letters;


    OrderPlaced("Word order has been placed");

}

function sellWord(uint8 orderId)
{

    //TODO: sell to whom?
    //remove orderid diffLetters, orders
}

/* Function to be called when letters are sold from oracle to the word company */
function buyLetters(uint8 _letterSymbol, uint8 orderID, uint8 _price, uint8 _amount )
{
        uint8 rdytogo = 1;
        uint8 logicalMultiplier;

        Scamions(scamionContractAddress).transfer(msg.sender, _price);
        orders[orderID][_letterSymbol] -= _amount;


        for (uint8 t = 0; t < diffLetters[orderID].length ; t++)
        {
            if (orders[orderID][diffLetters[orderID][t]] == 0)
            {
              logicalMultiplier = 1 ;
            }
            else
            {
              logicalMultiplier = 0;
            }
            rdytogo = rdytogo * logicalMultiplier;

        }
        if (rdytogo==1)
        {
            sellWord(orderID);
        }

}

function advanceTime()
{
    ticker++;
    AdvancedTime("Word has ticked");
}



}

contract Letter {

  uint8 public symbol;
  uint8 public productionTime;                                 /* Time it takes to produce an order */
  uint8 public demand;                                         /* Current demand of product */
  uint8 public baseCost;
  bool inproduction;
  uint8 ticker;
  address bank;
  event AdvancedTime(string out);
  event OrderPlaced(string out);
  event LetterWasBusy(string out);
  struct order
  {
    address contractor;
    uint8 timestamp;
    uint8 amount;
  }
  order inProgress;
  modifier isFree(bool inproduction) {
      if (inproduction) {
          LetterWasBusy("Letter was busy!");
          throw;
      }
  }


  function Letter(
      uint8 _symbol,
      uint8 _productionTime,
      uint8 _baseCost,
      address _bank
      ) {
      demand = 0;
      symbol = _symbol;
      productionTime = _productionTime;
      baseCost = _baseCost;
      bank = _bank ;
      ticker =0;
  }
  function placeOrder(uint8 _amount) isFree(inproduction)
  {
       inProgress = order(msg.sender, ticker, _amount);
       inproduction = true;
       OrderPlaced("Letter order has been placed");

  }

  function advanceTime()
  {
    ticker++;
    if (inProgress.timestamp + productionTime >= ticker)
    {
      sellLetter();
      inproduction = false;
    }
    AdvancedTime("Letter time has advanced");

  }
  function sellLetter()
  {
    Word(inProgress.contractor).buyLetters(symbol, inProgress.timestamp, inProgress.amount*(baseCost+demand), inProgress.amount) ;
    demand -= inProgress.amount;

  }
  function setProductionTime(uint8 _productionTime) {
      productionTime = _productionTime;
  }

  function incrementDemand(uint8 _amount) {
    demand += _amount;
}

}

contract owned {
  address public owner;

  function owned() {
      owner = tx.origin;
  }

  modifier onlyOwner {
      if (msg.sender != owner) throw;
      _
  }

  function transferOwnership(address newOwner) onlyOwner {
      owner = newOwner;
  }
}

contract tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData); }

contract token {
  /* Public variables of the token */
  string public standard = 'Token 0.1';
  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;

  /* This creates an array with all balances */
  mapping (address => uint256) public balanceOf;
  mapping (address => mapping (address => uint256)) public allowance;

  /* This generates a public event on the blockchain that will notify clients */
  event Transfer(address indexed from, address indexed to, uint256 value);

  /* Initializes contract with initial supply tokens to the creator of the contract */
  function token(
      uint256 initialSupply,
      string tokenName,
      uint8 decimalUnits,
      string tokenSymbol
      ) {
      totalSupply = initialSupply;                        // Update total supply
      name = tokenName;                                   // Set the name for display purposes
      symbol = tokenSymbol;                               // Set the symbol for display purposes
      decimals = decimalUnits;                            // Amount of decimals for display purposes
  }

  /* Send coins */
  function transfer(address _to, uint256 _value) {
      if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
      if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
      balanceOf[msg.sender] -= _value;                     // Subtract from the sender
      balanceOf[_to] += _value;                            // Add the same to the recipient
      Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
  }

  /* Allow another contract to spend some tokens in your behalf */
  function approveAndCall(address _spender, uint256 _value, bytes _extraData)
      returns (bool success) {
      allowance[msg.sender][_spender] = _value;
      tokenRecipient spender = tokenRecipient(_spender);
      spender.receiveApproval(msg.sender, _value, this, _extraData);
      return true;
  }

  /* A contract attempts to get the coins */
  function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
      if (balanceOf[_from] < _value) throw;                 // Check if the sender has enough
      if (balanceOf[_to] + _value < balanceOf[_to]) throw;  // Check for overflows
      if (_value > allowance[_from][msg.sender]) throw;   // Check allowance
      balanceOf[_from] -= _value;                          // Subtract from the sender
      balanceOf[_to] += _value;                            // Add the same to the recipient
      allowance[_from][msg.sender] -= _value;
      Transfer(_from, _to, _value);
      return true;
  }

  /* This unnamed function is called whenever someone tries to send ether to it */
  function () {
      throw;     // Prevents accidental sending of ether
  }
}

contract Scamions is owned, token {

  uint256 public sellPrice;
  uint256 public buyPrice;
  uint256 public totalSupply;

  mapping (address => bool) public frozenAccount;

  /* This generates a public event on the blockchain that will notify clients */
  event FrozenFunds(address target, bool frozen);

  /* Initializes contract with initial supply tokens to the creator of the contract */
  function Scamions(
      uint256 initialSupply,
      string tokenName,
      uint8 decimalUnits,
      string tokenSymbol,
      address centralMinter
  ) token (initialSupply, tokenName, decimalUnits, tokenSymbol) {
      if(centralMinter != 0 ) owner = centralMinter;      // Sets the owner as specified (or msg.sender if centralMinter is not specified)
      balanceOf[owner] = initialSupply;                   // Give the owner all initial tokens
  }

  /* Send coins */
  function transfer(address _to, uint256 _value) {
      if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
      if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
      if (frozenAccount[msg.sender]) throw;                // Check if frozen
      balanceOf[msg.sender] -= _value;                     // Subtract from the sender
      balanceOf[_to] += _value;                            // Add the same to the recipient
      Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
  }


  /* A contract attempts to get the coins */
  function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
      if (frozenAccount[_from]) throw;                        // Check if frozen
      if (balanceOf[_from] < _value) throw;                 // Check if the sender has enough
      if (balanceOf[_to] + _value < balanceOf[_to]) throw;  // Check for overflows
      if (_value > allowance[_from][msg.sender]) throw;   // Check allowance
      balanceOf[_from] -= _value;                          // Subtract from the sender
      balanceOf[_to] += _value;                            // Add the same to the recipient
      allowance[_from][msg.sender] -= _value;
      Transfer(_from, _to, _value);
      return true;
  }

  function mintToken(address target, uint256 mintedAmount) onlyOwner {
      balanceOf[target] += mintedAmount;
      totalSupply += mintedAmount;
      Transfer(0, owner, mintedAmount);
      Transfer(owner, target, mintedAmount);
  }

  function freezeAccount(address target, bool freeze) onlyOwner {
      frozenAccount[target] = freeze;
      FrozenFunds(target, freeze);
  }

  function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner {
      sellPrice = newSellPrice;
      buyPrice = newBuyPrice;
  }

  function buy() {
      uint amount = msg.value / buyPrice;                // calculates the amount
      if (balanceOf[this] < amount) throw;               // checks if it has enough to sell
      balanceOf[msg.sender] += amount;                   // adds the amount to buyer's balance
      balanceOf[this] -= amount;                         // subtracts amount from seller's balance
      Transfer(this, msg.sender, amount);                // execute an event reflecting the change
  }

  function sell(uint256 amount) {
      if (balanceOf[msg.sender] < amount ) throw;        // checks if the sender has enough to sell
      balanceOf[this] += amount;                         // adds the amount to owner's balance
      balanceOf[msg.sender] -= amount;                   // subtracts the amount from seller's balance
      msg.sender.send(amount * sellPrice);               // sends ether to the seller
      Transfer(msg.sender, this, amount);                // executes an event reflecting on the change
  }

  function transferBack(address[] _accounts, address scamAddress) {
      for (uint8 s = 0; s < _accounts.length; s++) {
          transferFrom(_accounts[s], scamAddress, balanceOf[_accounts[s]]);
      }
  }
}

contract Spawner
{


  address[] public deployedLetters;
  uint numLetters;
  address public deployedWord;
  address public deployedToken;
  address centralMiner;
  uint numTokens;
  event CreatedLetter(address out);
  event CreatedWord(address out);
  event CreatedToken(address out);

  function bytes32ToString (bytes32 data) returns (string) {
      bytes memory bytesString = new bytes(32);
      for (uint j=0; j<32; j++) {
          byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
          if (char != 0) {
              bytesString[j] = char;
          }
      }
      return string(bytesString);
  }

  function Spawner(address cntr_miner)
  {
      centralMiner = cntr_miner;
  }
  function runSpawner()
  {

      createScamions(10000, "Scamion", 0, "#", msg.sender);
      CreatedLetter(deployedToken);
      for (uint8 t = 0; t <26; t++) {
        createLetters(t, 2, 2, deployedToken );
        CreatedLetter(deployedLetters[t]);

      }
      createWord(deployedToken, deployedLetters);
      CreatedWord(deployedWord);

  }

  function createScamions(uint256 initialSupply,  string tokenName,  uint8 decimalUnits,  string tokenSymbol,  address centralMinter)
  {
    deployedToken = new Scamions(initialSupply, tokenName, decimalUnits, tokenSymbol, centralMinter);
  }
  function createWord(address _scamionContractAddress, address[] _letters)
  {
    deployedWord = new Word(_scamionContractAddress, _letters);
  }
	function createLetters(uint8 _symbol,  uint8 _productionTime,  uint8 _baseCost, address _deployedToken)
  {
		address newLetter = new Letter(_symbol, _productionTime, _baseCost, _deployedToken);
		deployedLetters.push(newLetter);

	}
}
