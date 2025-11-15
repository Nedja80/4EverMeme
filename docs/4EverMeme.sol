// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FourEverMeme (4EVM)
 * @dev BEP-20 Token Implementation
 * @notice This contract implements a standard BEP-20 token on BNB Smart Chain
 * 
 * Token Details:
 * - Name: 4EverMeme
 * - Symbol: 4EVM
 * - Decimals: 18
 * - Total Supply: 1,000,000,000 (1 billion)
 * 
 * Features:
 * - Standard BEP-20 implementation
 * - Fixed total supply (no minting)
 * - No ownership or admin privileges
 * - Fully decentralized
 * 
 * Official Links:
 * - Telegram: https://t.me/4evermeme
 * - Twitter: https://x.com/4evermeme
 * - GitHub: https://github.com/nedja80/4EverMeme
 * - BscScan: https://bscscan.com/token/0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef
 */
contract FourEverMeme {
    /// @notice Token name
    string public name = "4EverMeme";
    
    /// @notice Token symbol
    string public symbol = "4EVM";
    
    /// @notice Token decimals
    uint8 public decimals = 18;
    
    /// @notice Total token supply (1 billion tokens)
    uint256 public totalSupply = 1000000000 * 10 ** uint256(decimals);
    
    /// @notice Balance mapping for each address
    mapping(address => uint256) public balanceOf;
    
    /// @notice Allowance mapping for delegated transfers
    mapping(address => mapping(address => uint256)) public allowance;
    
    /**
     * @notice Emitted when tokens are transferred
     * @param from Address tokens are transferred from
     * @param to Address tokens are transferred to
     * @param value Amount of tokens transferred
     */
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    /**
     * @notice Emitted when an approval is made
     * @param owner Address that owns the tokens
     * @param spender Address that is approved to spend the tokens
     * @param value Amount of tokens approved
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    /**
     * @notice Contract constructor
     * @dev Mints the entire supply to the deployer address
     */
    constructor() {
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    /**
     * @notice Transfers tokens to a specified address
     * @param to The address to transfer to
     * @param value The amount to be transferred
     * @return success True if the transfer was successful
     */
    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    /**
     * @notice Approves the passed address to spend the specified amount on behalf of msg.sender
     * @param spender The address which will spend the tokens
     * @param value The amount of tokens to be spent
     * @return success True if the approval was successful
     */
    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    /**
     * @notice Transfers tokens from one address to another using allowance
     * @param from The address which you want to send tokens from
     * @param to The address which you want to transfer to
     * @param value The amount of tokens to be transferred
     * @return success True if the transfer was successful
     */
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
