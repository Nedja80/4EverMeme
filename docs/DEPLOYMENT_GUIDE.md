# 4EverMeme Deployment & Interaction Guide

## Table of Contents
1. [For Developers](#for-developers)
2. [For Users](#for-users)
3. [For Exchanges](#for-exchanges)
4. [Troubleshooting](#troubleshooting)

---

## For Developers

### Contract Deployment (Already Deployed)

The 4EverMeme contract is already deployed at:
```
0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef
```

If you need to deploy a similar contract:

#### Prerequisites
- Node.js and npm installed
- Hardhat or Truffle framework
- BNB for gas fees on BSC
- MetaMask or similar wallet

#### Using Hardhat

1. **Install Dependencies**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install dotenv
```

2. **Create hardhat.config.js**
```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: [process.env.PRIVATE_KEY]
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY
  }
};
```

3. **Create .env file**
```
PRIVATE_KEY=your_private_key_here
BSCSCAN_API_KEY=your_bscscan_api_key
```

4. **Create deployment script** (scripts/deploy.js)
```javascript
async function main() {
  const FourEverMeme = await ethers.getContractFactory("FourEverMeme");
  const token = await FourEverMeme.deploy();
  await token.deployed();
  
  console.log("4EverMeme deployed to:", token.address);
  console.log("Deployer address:", await ethers.provider.getSigner().getAddress());
  
  // Wait for block confirmations
  await token.deployTransaction.wait(5);
  
  // Verify on BscScan
  console.log("Verifying contract...");
  await hre.run("verify:verify", {
    address: token.address,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

5. **Deploy**
```bash
npx hardhat run scripts/deploy.js --network bsc
```

---

### Interacting with the Contract

#### Using ethers.js

```javascript
const { ethers } = require("ethers");

// Setup provider and signer
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

// Contract setup
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
  "function transferFrom(address from, address to, uint256 amount) returns (bool)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

// Read token information
async function getTokenInfo() {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const totalSupply = await contract.totalSupply();
  
  console.log(`Token: ${name} (${symbol})`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Total Supply: ${ethers.utils.formatUnits(totalSupply, decimals)}`);
}

// Check balance
async function checkBalance(address) {
  const balance = await contract.balanceOf(address);
  const decimals = await contract.decimals();
  console.log(`Balance: ${ethers.utils.formatUnits(balance, decimals)} 4EVM`);
}

// Transfer tokens
async function transfer(toAddress, amount) {
  const decimals = await contract.decimals();
  const amountInWei = ethers.utils.parseUnits(amount.toString(), decimals);
  
  const tx = await contract.transfer(toAddress, amountInWei);
  console.log(`Transaction hash: ${tx.hash}`);
  
  const receipt = await tx.wait();
  console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
}

// Approve spender
async function approve(spenderAddress, amount) {
  const decimals = await contract.decimals();
  const amountInWei = ethers.utils.parseUnits(amount.toString(), decimals);
  
  const tx = await contract.approve(spenderAddress, amountInWei);
  await tx.wait();
  console.log("Approval successful");
}

// Check allowance
async function checkAllowance(ownerAddress, spenderAddress) {
  const allowance = await contract.allowance(ownerAddress, spenderAddress);
  const decimals = await contract.decimals();
  console.log(`Allowance: ${ethers.utils.formatUnits(allowance, decimals)} 4EVM`);
}
```

#### Using web3.js

```javascript
const Web3 = require('web3');
const web3 = new Web3('https://bsc-dataseed.binance.org/');

const contractAddress = '0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef';
const ABI = [...]; // Full ABI here

const contract = new web3.eth.Contract(ABI, contractAddress);

// Get balance
async function getBalance(address) {
  const balance = await contract.methods.balanceOf(address).call();
  const decimals = await contract.methods.decimals().call();
  return balance / (10 ** decimals);
}

// Transfer tokens
async function transfer(from, to, amount) {
  const decimals = await contract.methods.decimals().call();
  const amountInWei = web3.utils.toBN(amount * (10 ** decimals));
  
  const gas = await contract.methods.transfer(to, amountInWei).estimateGas({from});
  const gasPrice = await web3.eth.getGasPrice();
  
  const tx = await contract.methods.transfer(to, amountInWei).send({
    from,
    gas,
    gasPrice
  });
  
  return tx;
}
```

---

## For Users

### Adding 4EVM to Your Wallet

#### MetaMask

1. Open MetaMask and ensure you're on BNB Smart Chain
2. Click "Import tokens" at the bottom
3. Select "Custom Token"
4. Enter the following details:
   - **Token Contract Address**: `0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef`
   - **Token Symbol**: `4EVM`
   - **Token Decimals**: `18`
5. Click "Add Custom Token"
6. Confirm by clicking "Import Tokens"

#### Trust Wallet

1. Open Trust Wallet
2. Tap the toggle icon (top right)
3. Scroll down and tap "Add Custom Token"
4. Select "BNB Smart Chain" network
5. Enter:
   - **Contract Address**: `0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef`
   - **Name**: `4EverMeme`
   - **Symbol**: `4EVM`
   - **Decimals**: `18`
6. Tap "Done"

#### Hardware Wallets (Ledger/Trezor)

1. Connect your hardware wallet to MetaMask
2. Follow the MetaMask instructions above
3. Confirm transactions on your hardware device

---

### Buying 4EVM

#### Via PancakeSwap (Example)

1. Go to [PancakeSwap](https://pancakeswap.finance/)
2. Connect your wallet
3. Click "Trade" → "Swap"
4. Select BNB (or other token) as input
5. Click "Select a currency" for output
6. Paste contract address: `0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef`
7. Import the token
8. Enter amount and swap
9. Confirm transaction in your wallet

**⚠️ Always check liquidity before trading!**

---

### Sending 4EVM Tokens

#### Using MetaMask

1. Open MetaMask
2. Select 4EVM from your token list
3. Click "Send"
4. Enter recipient address
5. Enter amount
6. Review gas fee
7. Confirm transaction

**Important**: Always double-check the recipient address!

---

### Checking Your Balance

#### On BscScan
1. Go to [BscScan](https://bscscan.com/)
2. Enter your wallet address in the search bar
3. Click on "Token" dropdown
4. Find 4EVM in your token holdings

#### In Your Wallet
- Simply open your wallet and view the 4EVM token balance

---

## For Exchanges

### Integration Information

If you're an exchange looking to list 4EVM:

**Token Details**:
```
Name: 4EverMeme
Symbol: 4EVM
Type: BEP-20
Contract: 0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef
Decimals: 18
Total Supply: 1,000,000,000
Network: BNB Smart Chain (BSC)
```

**Technical Integration**:
- Standard BEP-20 implementation
- No special transfer restrictions
- No transaction fees in contract
- Compatible with all standard BEP-20 tools

**Deposit/Withdrawal**:
```javascript
// Check if address has sufficient balance
const balance = await contract.methods.balanceOf(address).call();

// Generate deposit address (standard BSC address)
// Monitor deposits using Transfer events

// Process withdrawal
await contract.methods.transfer(userAddress, amount).send({from: hotWallet});
```

**Monitoring Deposits**:
```javascript
// Listen for Transfer events to your deposit addresses
contract.events.Transfer({
  filter: { to: depositAddress },
  fromBlock: 'latest'
})
.on('data', event => {
  console.log('Deposit detected:', event.returnValues);
});
```

**Recommended Confirmations**: 15-20 blocks on BSC (~45-60 seconds)

---

## Troubleshooting

### Common Issues

#### 1. Transaction Fails: "Insufficient Balance"
**Problem**: You're trying to send more tokens than you have.
**Solution**: Check your balance and ensure you have enough tokens plus BNB for gas.

#### 2. Transaction Pending Forever
**Problem**: Gas price too low or network congestion.
**Solution**: 
- Increase gas price
- Try again during off-peak hours
- Use BSC's recommended gas price

#### 3. Can't See Tokens in Wallet
**Problem**: Token not added to wallet.
**Solution**: Manually add the token using the contract address.

#### 4. "Allowance Exceeded" Error
**Problem**: Trying to use transferFrom without sufficient approval.
**Solution**: First call approve() with sufficient amount.

#### 5. High Gas Fees
**Problem**: BSC network congestion.
**Solution**: 
- Wait for off-peak hours
- Use gas tracker to find optimal time
- Typical gas: 5-10 Gwei on BSC

---

### Getting Help

- **Telegram**: https://t.me/4evermeme
- **Twitter**: https://x.com/4evermeme
- **GitHub**: https://github.com/nedja80/4EverMeme
- **BscScan**: https://bscscan.com/address/0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef

---

### Useful Links

**Block Explorers**:
- BscScan: https://bscscan.com/
- Token: https://bscscan.com/token/0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef

**RPC Endpoints**:
- Mainnet: https://bsc-dataseed.binance.org/
- Alternative: https://bsc-dataseed1.defibit.io/
- Alternative: https://bsc-dataseed1.ninicoin.io/

**Gas Trackers**:
- BSC Gas Tracker: https://bscscan.com/gastracker

**Development Resources**:
- BSC Docs: https://docs.bnbchain.org/
- BEP-20 Standard: https://github.com/bnb-chain/BEPs/blob/master/BEP20.md
- Hardhat: https://hardhat.org/
- ethers.js: https://docs.ethers.org/

---

**Last Updated**: November 2024

**Note**: Always verify contract addresses and never share your private keys!
