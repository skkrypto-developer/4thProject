pragma solidity ^0.4.18;

contract Ownable{
    address owner;
    function Ownable() public{
        owner = msg.sender;
    }
    
    modifier Owned{
        require(msg.sender == owner);
        _;
    }
}

contract Mortal is Ownable{
    function kill() public Owned{
        selfdestruct(owner);
    }
}

contract Betting is Mortal{
    uint public constant TICKET_PRICE = 1e16;
    uint public constant MAX_NUMBER = 69;
    uint public constant MAX_POWERBALL_NUMBER = 26;

    uint[6] myPick;
    uint[6] drawings;
    uint[6][3] history;

    event Won(bool _result, uint _amount);

    function bet(uint number1, uint number2, uint number3, uint number4, uint number5, uint numberp) public payable{
        require(msg.value == TICKET_PRICE);
        myPick[0] = number1;
        myPick[1] = number2;
        myPick[2] = number3;
        myPick[3] = number4;
        myPick[4] = number5;
        myPick[5] = numberp;
        drawNumbers();
    }
    function drawNumbers () public {
        for(uint i = 0;i < 5;i++){
            drawings[i] = random(MAX_NUMBER);
        }
        drawings[5] = random(MAX_POWERBALL_NUMBER);
        claim();
    }
    function claim() public{
        uint payout = 0;
        uint numberMatches = 0;
        for (uint j = 0; j < 5; j++) {
            for (uint k = 0; k < 5; k++) {
                if (myPick[k] == drawings[k])
                    numberMatches += 1;
            }
        }
        bool powerballMatches = (myPick[5] == drawings[5]);
        if (numberMatches == 5 && powerballMatches) {
            payout = this.balance;
        }
        else if (numberMatches == 5)
            payout += 5000 ether;
        else if (numberMatches == 4 && powerballMatches)
            payout += 250 ether;
        else if (numberMatches == 4)
            payout += 5e17;
        else if (numberMatches == 3 && powerballMatches)
            payout += 5e17;
        else if (numberMatches == 3)
            payout += 3.5e16;
        else if (numberMatches == 2 && powerballMatches)
            payout += 3.5e16;
        else if (numberMatches == 1 && powerballMatches)
            payout += 2e16;
        else if (powerballMatches)
            payout += 2e16;
        
        if(payout>0)    emit Won(true, payout);
        else            emit Won(false, 0);
        msg.sender.transfer(payout);
    }
    function getBalance() Owned public view returns(uint){
        return address(this).balance;
    }
    function random(uint number) public view returns (uint) {
        return uint(keccak256(block.difficulty, block.number, block.timestamp))%number +1;
    }
}
