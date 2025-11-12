// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
# 4EverMeme (4EVM)
<p align="center">
  <img src="https://i.postimg.cc/5y0H78jp/09DF90F9-3A8B-49B3-8A87-C2FFFF78C819.png" alt="4EverMeme Logo" width="120"/>
</p>

# 4EverMeme (4EVM)
contract FourEverMeme {
    string public name = "4EverMeme";
    string public symbol = "4EVM";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000000 * 10 ** uint256(decimals);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        balanceOf[from] -= value;
        allowance[from][msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
        return true;
    }
}
