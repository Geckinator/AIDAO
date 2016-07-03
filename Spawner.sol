contract Word {

  uint8 public ticker;                                      /* Keeps track of current time. */
  address public scamionContractAddress;                         /* Address of the scamion contract. */

  mapping(uint8 => mapping (uint8 => uint8)) public orders; /* orderid = > lettersymbol => amount*/
  mapping(uint8 => uint8[]) public diffLetters ; /* orderid => letters[] */


  event AdvancedTime(string out);
  event OrderPlaced(string out);

  mapping (uint8 => address) public letterMonitors;       /* Reference list of all 26 letter contracts. */


function Word(address _scamionContractAddress, address[] _letters)
{
    ticker = 0;
    scamionContractAddress = _scamionContractAddress;
    /* Initialize all letter contracts */
    for (uint8 t = 0; t < _letters.length; t++)
    {
        letterMonitors[t] = _letters[t];
    }
}


function incrementDemand(uint8[] _letters, uint8[] _amounts )
{
    for (uint8 t = 0; t < _letters.length ; t++)
    {
        orders[ticker][_letters[t]] = _amounts[t];
        LetterMonitor(letterMonitors[_letters[t]]).incrementDemand(_amounts[t]);
    }
    diffLetters[ticker] = _letters;


    OrderPlaced("Word order has been placed");

}

function sellWord(uint8 orderId)
{
    uint8 price = 2;
    //TODO: sell to whom?
    //remove orderid diffLetters, orders
}


function buyLetter(int8 _price, uint8 orderID, uint8 _letterSymbol, uint8 _amount)
{
  uint8 finalprice;
  if (_price > 0)
  {
      for (int8 x = 0; x == _price ; x ++)
      {
        finalprice ++;
      }

      orders[orderID][_letterSymbol] -= _amount;
    }
    else
    {
      if (_price < 0)
      {
        for (int8 z = 0; z == _price ; z --)
        {
          finalprice ++;
        }
        Scamions(scamionContractAddress).transferFrom(msg.sender, this, finalprice);
      }
    }
}
/* Function to be called when letters are sold from oracle to the word company */
function isWordReady(uint8 _letterSymbol, uint8 orderID, uint8 _price, uint8 _amount )
{
        uint8 rdytogo = 1;
        uint8 logicalMultiplier=0;

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
function reset()
{
  delete(ticker);
  mapping(uint8 => mapping (uint8 => uint8))  orders ;
//   orders = new mapping(uint8 => mapping (uint8 => uint8)) ;/* orderid = > lettersymbol => amount*/
  mapping(uint8 => uint8[])  diffLetters ; /* orderid => letters[] */


}
function advanceTime()
{
    ticker++;
    AdvancedTime("Word has ticked");
}



}
contract LetterMonitor{
  uint8 ticker;
  int8 public currentDemand;
  uint8 public symbol;
  uint8 public productionTime;
  event TimeAdvanced(string out);
  function LetterMonitor(uint8 _symbol, uint8 _productionTime)
  {
     symbol = _symbol;
     productionTime = _productionTime;
     ticker=0;
  }
function incrementDemand(uint8 amount)
{

    for(uint8 x=1; x <= amount ; x++)
      currentDemand += 1;

}
function decrementDemand(uint8 amount)
{
    for(uint8 x=1; x <= amount ; x++)
      currentDemand -= 1;


}
function reset()
{
    delete(currentDemand);
    delete(ticker);
}
function setProductionTime(uint8 _productionTime) {
    productionTime = _productionTime;
}

function tickTime()
{
  ticker++;
  TimeAdvanced("Monitor time has advanced");

}
}
contract LetterCompany {

  address wordCompany;
  uint8 public ticker;
  address public bank;
  mapping(uint8 => address) public letterMonitors;
  uint public maxSlots;
  event AdvancedTime(string out);
  event OrderPlaced(string out);
  event LetterWasBusy(string out);
  struct orders
  {
    uint8 productionTime;
    uint8 timestamp;
    uint8 symbol;
  }
  orders[] public inProgress;

  function LetterCompany(
      address[] _letterMonitors,
      address _bank,
      address _wordCompany
      ) {
      bank = _bank ;
      ticker = 0;
      maxSlots =10;
      wordCompany = _wordCompany;
      for (uint8 x = 0 ; x< _letterMonitors.length; x++)
      {
        letterMonitors[x] = _letterMonitors[x];
      }
  }
  function reset()
  {
      delete(ticker);
      delete(inProgress);

  }
  function remove(uint index)  {
        if (index >= inProgress.length) return;

        for (uint i = index; i<inProgress.length-1; i++){
            inProgress[i] = inProgress[i+1];
        }
        delete inProgress[inProgress.length-1];
        inProgress.length--;
    }
  function startProduction( uint8[] letters)
  {
      if (inProgress.length <= maxSlots)
      {
        for (uint t= 0; t < letters.length; t++)
        {
         inProgress.push(orders(LetterMonitor(letterMonitors[letters[t]]).productionTime(), ticker, letters[t]));
        }
         OrderPlaced("Letter order has been placed");
      }
  }
function getFreeSlots() constant returns(uint x)
{
return maxSlots- inProgress.length;
}
  function sellifReady()
  {

    for(uint8 t = 0 ; t < inProgress.length ; t++ )
    if (inProgress[t].timestamp + inProgress[t].productionTime <= ticker)
    {
      sellLetter(t);
      remove(t);
    }

  }
  function advanceTime()
  {
    ticker++;
    AdvancedTime("Letter time has advanced");

  }
  function sellLetter(uint8 x)
  {

    int8 demand = LetterMonitor(letterMonitors[inProgress[x].symbol]).currentDemand();
    Word(wordCompany).buyLetter(demand, inProgress[x].symbol, inProgress[x].timestamp, 1) ;
    LetterMonitor(letterMonitors[inProgress[x].symbol]).decrementDemand(1);

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

  /* This creates an inProgress with all balances */
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

  function reset(address deployedWord, address deployedLetter)
  {

        resetBalance(deployedWord);
        resetBalance(deployedLetter);
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

  function resetBalance(address x)
  {
    balanceOf[x] = 1000;
  }
  function transferBack(address[] _accounts, address scamAddress) {
      for (uint8 s = 0; s < _accounts.length; s++) {
          transferFrom(_accounts[s], scamAddress, balanceOf[_accounts[s]]);
      }

  }

}

contract Spawner
{
  address[] public deployedLettersMonitors;
  uint numLetters;
  address public deployedWord;
  address public deployedToken;
  address public deployedLetterCompany;
  address public centralMiner;
  uint numTokens;
  event CreatedLetter(address out);
  event CreatedWord(address out);
  event CreatedToken(address out);
  event CreatedLetterCompany(address out);

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
        createLettersMonitors(t, 2 );
        CreatedLetter(deployedLettersMonitors[t]);

      }
      createWord(deployedToken, deployedLettersMonitors);
      CreatedWord(deployedWord);

      createLetterCompany(deployedLettersMonitors, deployedToken, deployedWord);
      CreatedLetterCompany(deployedLetterCompany);

  }

  function  getMonitorAddress1() constant returns(address a,address b,address c,address d,address e,address f,address g,address h,address i)
  {
    a = deployedLettersMonitors[0] ;
    b= deployedLettersMonitors[1];
    c= deployedLettersMonitors[2];
    d= deployedLettersMonitors[3];
    e= deployedLettersMonitors[4];
    f= deployedLettersMonitors[5];
    g= deployedLettersMonitors[6];
    h= deployedLettersMonitors[7];
    i= deployedLettersMonitors[8];
  }
  function  getMonitorAddress2() constant returns(address a,address b,address c,address d,address e,address f,address g,address h,address i)
  {
    a = deployedLettersMonitors[9] ;
    b= deployedLettersMonitors[10];
    c= deployedLettersMonitors[11];
    d= deployedLettersMonitors[12];
    e= deployedLettersMonitors[13];
    f= deployedLettersMonitors[14];
    g= deployedLettersMonitors[15];
    h= deployedLettersMonitors[16];
    i= deployedLettersMonitors[17];
  }
  function  getMonitorAddress3() constant returns(address a,address b,address c,address d,address e,address f,address g,address h)
  {
    a = deployedLettersMonitors[18] ;
    b= deployedLettersMonitors[19];
    c= deployedLettersMonitors[20];
    d= deployedLettersMonitors[21];
    e= deployedLettersMonitors[22];
    f= deployedLettersMonitors[23];
    g= deployedLettersMonitors[24];
    h= deployedLettersMonitors[25];


  }

  function resetAll()
  {
    for(uint a = 0; a< deployedLettersMonitors.length; a++)
    {
      LetterMonitor(deployedLettersMonitors[a]).reset();
    }

    Scamions(deployedToken).reset(deployedWord, deployedLetterCompany );
   Word(deployedWord).reset();
   LetterCompany(deployedLetterCompany).reset();

  }
  function createLetterCompany ( address[] _letterMonitors, address _bank, address _wordCompany)
  {
    deployedLetterCompany = new LetterCompany(_letterMonitors, _bank, _wordCompany);
  }

  function createScamions(uint256 initialSupply,  string tokenName,  uint8 decimalUnits,  string tokenSymbol,  address centralMinter)
  {
    deployedToken = new Scamions(initialSupply, tokenName, decimalUnits, tokenSymbol, centralMinter);
  }
  function createWord(address _scamionContractAddress, address[] _letters)
  {
    deployedWord = new Word(_scamionContractAddress, _letters);
  }
	function createLettersMonitors(uint8 _symbol,  uint8 _productionTime)
  {
		address newLetter = new LetterMonitor(_symbol, _productionTime);
		deployedLettersMonitors.push(newLetter);

	}
}
