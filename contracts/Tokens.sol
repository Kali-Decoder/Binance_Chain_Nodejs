// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Tokens {
    string public name = "Avengers";
    string public symbol = "AVG";
    uint256 public totalSupply = 10**18; //1Million
    uint8 public decimals = 18;
    address public admin;
    uint public constant basefees=100 wei;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    mapping(address => uint256) public balanceOf;

    constructor() {
        admin = msg.sender;
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        payable
        public
        returns (bool success)
    {
        require(
            balanceOf[msg.sender] >= _value,
            "You Have Not Enough Money !!!"
        );
        require(msg.value==basefees,"Please provide base fees for transfer tokens ");
        balanceOf[msg.sender] -=  _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
