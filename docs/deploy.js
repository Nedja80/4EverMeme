const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting 4EverMeme deployment...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  
  console.log("📋 Deployment Details:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Network:          ${hre.network.name}`);
  console.log(`Chain ID:         ${(await hre.ethers.provider.getNetwork()).chainId}`);
  console.log(`Deployer:         ${deployerAddress}`);
  
  const balance = await hre.ethers.provider.getBalance(deployerAddress);
  console.log(`Deployer Balance: ${hre.ethers.formatEther(balance)} BNB`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // Check if deployer has enough balance
  if (balance < hre.ethers.parseEther("0.01")) {
    console.log("⚠️  Warning: Deployer balance is low. Make sure you have enough BNB for gas fees.\n");
  }

  // Deploy contract
  console.log("📦 Deploying FourEverMeme contract...");
  const FourEverMeme = await hre.ethers.getContractFactory("FourEverMeme");
  const token = await FourEverMeme.deploy();
  
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log("✅ Contract deployed successfully!\n");

  console.log("📊 Token Information:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Contract Address: ${tokenAddress}`);
  console.log(`Token Name:       ${await token.name()}`);
  console.log(`Token Symbol:     ${await token.symbol()}`);
  console.log(`Decimals:         ${await token.decimals()}`);
  
  const totalSupply = await token.totalSupply();
  console.log(`Total Supply:     ${hre.ethers.formatEther(totalSupply)} 4EVM`);
  
  const deployerBalance = await token.balanceOf(deployerAddress);
  console.log(`Deployer Balance: ${hre.ethers.formatEther(deployerBalance)} 4EVM`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // Wait for block confirmations before verification
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("⏳ Waiting for block confirmations...");
    await token.deploymentTransaction().wait(6);
    console.log("✅ Block confirmations received!\n");

    // Verify contract on BscScan
    console.log("🔍 Verifying contract on BscScan...");
    try {
      await hre.run("verify:verify", {
        address: tokenAddress,
        constructorArguments: [],
      });
      console.log("✅ Contract verified successfully!\n");
    } catch (error) {
      if (error.message.includes("already verified")) {
        console.log("ℹ️  Contract is already verified!\n");
      } else {
        console.log("❌ Verification failed:", error.message);
        console.log("You can verify manually later using:");
        console.log(`npx hardhat verify --network ${hre.network.name} ${tokenAddress}\n`);
      }
    }
  }

  // Summary
  console.log("📝 Deployment Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✅ Deployment successful!`);
  console.log(`✅ Contract: ${tokenAddress}`);
  console.log(`✅ Network: ${hre.network.name}`);
  console.log(`✅ Deployer: ${deployerAddress}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  console.log("🔗 Useful Links:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  if (hre.network.name === "bsc") {
    console.log(`BscScan:          https://bscscan.com/address/${tokenAddress}`);
    console.log(`Token:            https://bscscan.com/token/${tokenAddress}`);
  } else if (hre.network.name === "bscTestnet") {
    console.log(`BscScan:          https://testnet.bscscan.com/address/${tokenAddress}`);
    console.log(`Token:            https://testnet.bscscan.com/token/${tokenAddress}`);
  }
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  console.log("💡 Next Steps:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("1. Save the contract address");
  console.log("2. Update README.md with the contract address");
  console.log("3. Add liquidity to DEX");
  console.log("4. Announce deployment to community");
  console.log("5. Submit token for listings");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // Save deployment info to file
  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    chainId: Number((await hre.ethers.provider.getNetwork()).chainId),
    contractAddress: tokenAddress,
    deployer: deployerAddress,
    deploymentBlock: token.deploymentTransaction().blockNumber,
    timestamp: new Date().toISOString(),
    tokenInfo: {
      name: await token.name(),
      symbol: await token.symbol(),
      decimals: await token.decimals(),
      totalSupply: totalSupply.toString(),
    }
  };

  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("💾 Deployment info saved to deployment-info.json\n");

  console.log("🎉 Deployment complete! Welcome to 4EverMeme! 🚀\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
