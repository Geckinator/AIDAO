contract Word {

    uint public clock;                                      /* Keeps track of current time. */
    address scamionContractAddress;                         /* Address of the scamion contract. */
    
    struct Order {
        bytes uniqueLetters;
        uint8[] amounts;
    }
    
    uint[] public orderTimestamps;                          /* Stack of times an order was placed. */
    mapping (byte => uint8) public lettersInStock;          /* Current letters in stock ready to sell. */
	mapping (byte => address) public letterContracts;       /* Reference list of all 26 letter contracts. */
	mapping (uint => Order) public orders;                  /* Mapping of timestamps to the word ordered at that time. */
	
	function Word(address _scamionContractAddress, address[] _letters) {
	    clock = 0;
	    scamionContractAddress = _scamionContractAddress;
	    /* Initialize all letter contracts */
	    for (uint8 t = 0; t < 26; t++) {
	        letterContracts[byte(t + 65)] = _letters[t];
	        lettersInStock[byte(t + 65)] = 0;
	    }
	}
	
	/* Function to be called when letters are sold from oracle to the word company */
	function buyLetter(bytes _letterSymbols, uint8[] _amounts) {
	    for (uint8 l = 0; l < _letterSymbols.length; l++) {
    	    Letter _letter = Letter(letterContracts[_letterSymbols[l]]);
    	    Scamions(scamionContractAddress).transfer(msg.sender, _letter.getDemand() * _amounts[l]);
    	    _letter.incrementDemand(-_amounts[l]);
    	    lettersInStock[_letterSymbols[l]] += _amounts[l];
	    }
	}
	
	/* tickTime is run at each time step, places new order and checks if previous
	orders have been fulfilled before incrementing time. Inputs are a list of unique
	letters in the current word, along with their number of instances in the same order */
	function tickTime(bytes _uniqueLetters, uint8[] _amounts) returns(uint clock) {
	    
	    /* Store the current order. */
	    orderTimestamps.push(clock);
	    Order memory newOrder = Order({uniqueLetters: _uniqueLetters, amounts: _amounts});
	    orders[clock] = newOrder;
	    
	    /* increase the demand */
	    for (uint8 h = 0; h < _uniqueLetters.length; h++) {
	        Letter(letterContracts[byte(h + 65)]).incrementDemand(_amounts[h]);
	    }

	    /* Now see if any of the stored orders can be shipped. */
	    uint[] memory tempOrderTimestamps = new uint[](orderTimestamps.length);     /* Maintain the orders that still aren't met. */
	    uint8 k = 0;
	    for (uint8 i = 0; i < orderTimestamps.length; i++) {                        /* Iterate through all the timestamps of remaining orders. */
	        bool _readyToShip = true;                                               /* Use  a flag to see if all the needed letters are present. */
	        Order order_ = orders[orderTimestamps[i]];                              /* Get one of the orders. */
	        for (uint8 j = 0; j < order_.amounts.length; j++) {                     /* Loop through the letters needed for this order. */
	            if (lettersInStock[order_.uniqueLetters[j]] < order_.amounts[j]) {  /* Check and see if we have enough letters in stock. */
	                _readyToShip = false;                                           /* If not, then cancel shipping. */
	                break;
	            }
	        }
	        if (_readyToShip) {
	            for (uint8 l = 0; l < order_.uniqueLetters.length; l++) {
	                lettersInStock[order_.uniqueLetters[l]] -= order_.amounts[l];   /* Ship word if it passed the test. */
	            }
	            delete orders[orderTimestamps[i]];                                  /* Delete its corresponding order. */
	        }
	        else {
	            tempOrderTimestamps[k] = orderTimestamps[i];                        /* Otherwise, copy order time into new list for future indexing. */
	            k++;
	        }
	    }
	    for (uint8 m = k; m < orderTimestamps.length; m++){
	        delete tempOrderTimestamps[m];
	    }
	    orderTimestamps = tempOrderTimestamps;
	    
	    return ++clock;
}

}

contract Letter {
    
    byte public symbol;
	uint public productionTime;                                 /* Time it takes to produce an order */
    uint public demand;                                         /* Current demand of product */
    
    function Letter(
        byte _symbol,
        uint _productionTime
        ) {
        demand = 0;
        symbol = _symbol;
        productionTime = _productionTime;
    }
    
    function getDemand() returns(uint a) {
        return demand;
    }
    
    function getSymbol() returns(byte s) {
        return symbol;
    }
    
    function getProductionTime() returns(uint t){
        return productionTime;
    }
   
    function setProductionTime(uint _productionTime) {
        productionTime = _productionTime;
    }
    
    function incrementDemand(uint amount) {
	    demand += amount;
	}
	
}

contract owned {
    address public owner;

    function owned() {
        owner = msg.sender;
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
}
