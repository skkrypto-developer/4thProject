pragma solidity ^0.6.8;

import "./Context.sol";
import "./ERC20.sol";
import "./ERC20Detailed.sol";
import "./ERC20Burnable.sol";
import "./SafeMath.sol";

contract BetrayToken is Context,ERC20,ERC20Detailed,ERC20Burnable {
    
    using SafeMath for uint256;
    
    address publisher;
    string public _name = "Betray Token";
    string public _symbol = "Betray";
    
    mapping(address => uint256) public _balanceOf;
    mapping(address => mapping(address => uint256)) public _allowance;
    
    event Transfer(address indexed __from, address indexed _to, uint value);
    
    constructor() public ERC20Detailed("Betray Coin","BeC",18) {
        _mint(_msgSender(),1000*(10**uint256(decimals())));
        publisher = msg.sender;
    }
    
    function TotalSupply() public view  returns (uint totalSupply) {
        return totalSupply;
    }
    
    function balance(address _owner) public view returns (uint balance) {
        return _balanceOf[_owner];
    }
    
    function transfer(address _to, uint _value) public returns (bool success){
        require(_balanceOf[msg.sender] >=_value);
        _balanceOf[msg.sender] = _balanceOf[msg.sender].sub(_value);
        _balanceOf[_to] = _balanceOf[_to].add(_value);
        
        emit Transfer(msg.sender,_to,_value);
        
        return true;
    }
    
    //if we need to define commision, then we need to implement approve, allowance, transferFrom 
    /*
    function transgerFrom(address _from, address __to, uint _vlaue) returns (bool success) {}
    function approve(address _spender, uint vlaue) returns (bool success){}
    function allowance(address _owner, address _spender) constant returns (uint remaining){}
    event Approval(address indexed _owner, address indexed _spender, uint_value);
    */
    
    
    
    

    

}