# 4EverMeme Smart Contract Documentation

## Overview

The 4EverMeme (4EVM) token is implemented as a standard BEP-20 token on the BNB Smart Chain. This document provides technical details about the contract implementation.

## Contract Details

- **Contract Name**: `FourEverMeme`
- **Solidity Version**: ^0.8.20
- **License**: MIT
- **Standard**: BEP-20 (ERC-20 compatible)

## Token Specifications

```solidity
Name:         4EverMeme
Symbol:       4EVM
Decimals:     18
Total Supply: 1,000,000,000 4EVM (1 billion tokens)
Initial Distribution: 100% allocated to contract deployer
```

## Contract Architecture

### State Variables

| Variable | Type | Visibility | Description |
|----------|------|------------|-------------|
| `name` | string | public | Token name: "4EverMeme" |
| `symbol` | string | public | Token symbol: "4EVM" |
| `decimals` | uint8 | public | Decimal places: 18 |
| `totalSupply` | uint256 | public | Total token supply: 1,000,000,000 × 10^18 |
| `balanceOf` | mapping(address => uint256) | public | Balance tracking for each address |
| `allowance` | mapping(address => mapping(address => uint256)) | public | Approved spending amounts |

### Events

#### Transfer
```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```
Emitted when tokens are transferred, including minting (from = 0x0).

#### Approval
```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```
Emitted when an allowance is set via the `approve` function.

## Functions

### Constructor
```solidity
constructor()
```
**Description**: Initializes the contract and mints the entire supply to the deployer.

**Actions**:
- Sets deployer's balance to total supply
- Emits Transfer event from zero address

### transfer
```solidity
function transfer(address to, uint256 value) public returns (bool success)
```
**Description**: Transfers tokens from caller to recipient.

**Parameters**:
- `to`: Recipient address
- `value`: Amount of tokens to transfer

**Requirements**:
- Caller must have sufficient balance

**Returns**: `true` on success

**Emits**: `Transfer` event

### approve
```solidity
function approve(address spender, uint256 value) public returns (bool success)
```
**Description**: Approves a spender to transfer tokens on behalf of the caller.

**Parameters**:
- `spender`: Address authorized to spend
- `value`: Maximum amount approved

**Returns**: `true` on success

**Emits**: `Approval` event

**Note**: Setting a new allowance overwrites the previous value.

### transferFrom
```solidity
function transferFrom(address from, address to, uint256 value) public returns (bool success)
```
**Description**: Transfers tokens on behalf of another address using allowance.

**Parameters**:
- `from`: Token owner address
- `to`: Recipient address
- `value`: Amount to transfer

**Requirements**:
- Owner must have sufficient balance
- Caller must have sufficient allowance

**Returns**: `true` on success

**Emits**: `Transfer` event

## Security Features

### Built-in Protections
- ✅ **Overflow Protection**: Solidity 0.8.20 has built-in overflow/underflow checks
- ✅ **Balance Verification**: Requires checks prevent transfers exceeding balance
- ✅ **Allowance Verification**: Prevents unauthorized transferFrom operations

### Contract Characteristics
- 🔓 **No Ownership**: Contract has no owner or admin functions
- 🔓 **No Minting**: Total supply is fixed at deployment
- 🔓 **No Burning**: No burn mechanism implemented
- 🔓 **No Pausability**: Transfers cannot be paused
- 🔓 **No Blacklist**: No addresses can be blocked
- 🔓 **No Fees**: No transfer taxes or fees

## Gas Optimization

The contract uses simple, gas-efficient implementations:

| Function | Estimated Gas (approximate) |
|----------|---------------------------|
| `transfer` | ~51,000 gas |
| `approve` | ~46,000 gas |
| `transferFrom` | ~60,000 gas |

*Note: Actual gas costs may vary based on network conditions and wallet state.*

## Deployment Information

**Network**: BNB Smart Chain (BSC)  
**Contract Address**: `0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef`  
**Verification Status**: ✅ Verified on BscScan  
**Deployment Date**: [To be added]  
**Deployer Address**: [To be added]

## Integration Guide

### Adding to Web3 Projects

#### Using ethers.js
```javascript
const contractAddress = "0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef";
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

const contract = new ethers.Contract(contractAddress, abi, signer);
```

#### Using web3.js
```javascript
const contractAddress = "0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef";
const contract = new web3.eth.Contract(ABI, contractAddress);

// Get balance
const balance = await contract.methods.balanceOf(userAddress).call();

// Transfer tokens
await contract.methods.transfer(toAddress, amount).send({ from: userAddress });
```

### MetaMask Integration

Users can add 4EVM to MetaMask using:
```javascript
await ethereum.request({
  method: 'wallet_watchAsset',
  params: {
    type: 'ERC20',
    options: {
      address: '0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef',
      symbol: '4EVM',
      decimals: 18,
      image: 'YOUR_TOKEN_LOGO_URL',
    },
  },
});
```

## Auditing Notes

### Recommendations for Production Use

While this is a functional BEP-20 implementation, consider these enhancements for production:

1. **Ownership Pattern**: Implement Ownable for administrative functions
2. **Pausability**: Add emergency pause mechanism
3. **Burn Function**: Allow token burning for supply management
4. **Events**: Consider additional events for better tracking
5. **Access Control**: Implement role-based access if needed
6. **Upgradability**: Consider proxy pattern for future updates

### Known Limitations

- No built-in burn mechanism
- No maximum transaction limits
- No anti-whale protection
- No reflection or reward mechanisms
- No automated liquidity provision

## Testing

### Recommended Test Cases

1. ✅ Deployment and initial supply allocation
2. ✅ Basic transfer functionality
3. ✅ Transfer with insufficient balance (should revert)
4. ✅ Approve and transferFrom flow
5. ✅ TransferFrom with insufficient allowance (should revert)
6. ✅ Event emission verification
7. ✅ Edge cases (zero transfers, self-transfers)

## Compliance

**BEP-20 Standard**: ✅ Fully compliant  
**BscScan Verification**: ✅ Verified  
**Open Source**: ✅ MIT License

## Support & Resources

- **Contract Source**: [View on BscScan](https://bscscan.com/address/0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef#code)
- **BEP-20 Standard**: [Binance Chain Docs](https://docs.bnbchain.org/docs/BEP20)
- **GitHub Repository**: [4EverMeme](https://github.com/nedja80/4EverMeme)

## Changelog

### Version 1.0.0 (Initial Release)
- Basic BEP-20 implementation
- Standard transfer, approve, and transferFrom functions
- Fixed total supply of 1 billion tokens
- No additional features or restrictions

---

**Disclaimer**: This documentation is provided for informational purposes. Always conduct your own research and security audits before interacting with any smart contract.

*Last Updated: November 2024*
