const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FourEverMeme Token", function () {
  let token;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const TOTAL_SUPPLY = ethers.parseUnits("1000000000", 18); // 1 billion tokens

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy contract
    const FourEverMeme = await ethers.getContractFactory("FourEverMeme");
    token = await FourEverMeme.deploy();
    await token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct token name", async function () {
      expect(await token.name()).to.equal("4EverMeme");
    });

    it("Should set the correct token symbol", async function () {
      expect(await token.symbol()).to.equal("4EVM");
    });

    it("Should set the correct decimals", async function () {
      expect(await token.decimals()).to.equal(18);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
      expect(ownerBalance).to.equal(TOTAL_SUPPLY);
    });

    it("Should have correct total supply", async function () {
      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY);
    });

    it("Should emit Transfer event on deployment", async function () {
      const FourEverMeme = await ethers.getContractFactory("FourEverMeme");
      await expect(FourEverMeme.deploy())
        .to.emit(FourEverMeme, "Transfer")
        .withArgs(ethers.ZeroAddress, owner.address, TOTAL_SUPPLY);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseUnits("100", 18);

      // Transfer from owner to addr1
      await token.transfer(addr1.address, transferAmount);
      expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);

      // Transfer from addr1 to addr2
      await token.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18));
      expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseUnits("50", 18));
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("50", 18));
    });

    it("Should emit Transfer event", async function () {
      const transferAmount = ethers.parseUnits("100", 18);

      await expect(token.transfer(addr1.address, transferAmount))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      const transferAmount = initialOwnerBalance + 1n;

      await expect(token.connect(addr1).transfer(owner.address, transferAmount)).to.be.revertedWith(
        "Insufficient balance"
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      const transferAmount = ethers.parseUnits("100", 18);

      await token.transfer(addr1.address, transferAmount);
      await token.transfer(addr2.address, ethers.parseUnits("50", 18));

      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - ethers.parseUnits("150", 18));

      expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);
      expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseUnits("50", 18));
    });

    it("Should handle zero transfers", async function () {
      await expect(token.transfer(addr1.address, 0)).to.not.be.reverted;
      expect(await token.balanceOf(addr1.address)).to.equal(0);
    });

    it("Should handle self transfers", async function () {
      const transferAmount = ethers.parseUnits("100", 18);
      const initialBalance = await token.balanceOf(owner.address);

      await token.transfer(owner.address, transferAmount);
      expect(await token.balanceOf(owner.address)).to.equal(initialBalance);
    });
  });

  describe("Approvals", function () {
    it("Should approve tokens for delegated transfer", async function () {
      const approveAmount = ethers.parseUnits("100", 18);

      await token.approve(addr1.address, approveAmount);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(approveAmount);
    });

    it("Should emit Approval event", async function () {
      const approveAmount = ethers.parseUnits("100", 18);

      await expect(token.approve(addr1.address, approveAmount))
        .to.emit(token, "Approval")
        .withArgs(owner.address, addr1.address, approveAmount);
    });

    it("Should update allowance on multiple approvals", async function () {
      await token.approve(addr1.address, ethers.parseUnits("100", 18));
      expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.parseUnits("100", 18));

      await token.approve(addr1.address, ethers.parseUnits("200", 18));
      expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.parseUnits("200", 18));
    });

    it("Should allow zero approval", async function () {
      await token.approve(addr1.address, ethers.parseUnits("100", 18));
      await token.approve(addr1.address, 0);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(0);
    });
  });

  describe("TransferFrom", function () {
    it("Should transfer tokens using allowance", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("50", 18);

      await token.approve(addr1.address, approveAmount);
      await token.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);

      expect(await token.balanceOf(addr2.address)).to.equal(transferAmount);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(
        approveAmount - transferAmount
      );
    });

    it("Should emit Transfer event on transferFrom", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("50", 18);

      await token.approve(addr1.address, approveAmount);

      await expect(token.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr2.address, transferAmount);
    });

    it("Should fail if allowance is insufficient", async function () {
      const approveAmount = ethers.parseUnits("50", 18);
      const transferAmount = ethers.parseUnits("100", 18);

      await token.approve(addr1.address, approveAmount);

      await expect(
        token.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount)
      ).to.be.revertedWith("Allowance exceeded");
    });

    it("Should fail if balance is insufficient", async function () {
      const approveAmount = ethers.parseUnits("1000000001", 18); // More than total supply

      await token.approve(addr1.address, approveAmount);

      await expect(
        token.connect(addr1).transferFrom(owner.address, addr2.address, approveAmount)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should decrease allowance after transferFrom", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount1 = ethers.parseUnits("30", 18);
      const transferAmount2 = ethers.parseUnits("20", 18);

      await token.approve(addr1.address, approveAmount);

      await token.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount1);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(
        approveAmount - transferAmount1
      );

      await token.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount2);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(
        approveAmount - transferAmount1 - transferAmount2
      );
    });
  });

  describe("Edge Cases", function () {
    it("Should handle maximum uint256 values correctly", async function () {
      const maxApproval = ethers.MaxUint256;
      await token.approve(addr1.address, maxApproval);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(maxApproval);
    });

    it("Should maintain total supply after multiple transfers", async function () {
      await token.transfer(addr1.address, ethers.parseUnits("100", 18));
      await token.transfer(addr2.address, ethers.parseUnits("200", 18));
      await token.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18));

      const ownerBalance = await token.balanceOf(owner.address);
      const addr1Balance = await token.balanceOf(addr1.address);
      const addr2Balance = await token.balanceOf(addr2.address);

      expect(ownerBalance + addr1Balance + addr2Balance).to.equal(TOTAL_SUPPLY);
    });

    it("Should handle complex approval and transfer scenarios", async function () {
      // Owner approves addr1
      await token.approve(addr1.address, ethers.parseUnits("500", 18));

      // addr1 transfers some from owner to addr2
      await token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseUnits("200", 18));

      // Check balances and allowances
      expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseUnits("200", 18));
      expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.parseUnits("300", 18));

      // addr1 can still transfer remaining allowance
      await token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseUnits("300", 18));
      expect(await token.allowance(owner.address, addr1.address)).to.equal(0);
    });
  });

  describe("Gas Optimization", function () {
    it("Should not consume excessive gas for transfers", async function () {
      const tx = await token.transfer(addr1.address, ethers.parseUnits("100", 18));
      const receipt = await tx.wait();
      
      // Transfer should use reasonable gas (typically around 51,000)
      expect(receipt.gasUsed).to.be.lessThan(60000);
    });

    it("Should not consume excessive gas for approvals", async function () {
      const tx = await token.approve(addr1.address, ethers.parseUnits("100", 18));
      const receipt = await tx.wait();
      
      // Approval should use reasonable gas (typically around 46,000)
      expect(receipt.gasUsed).to.be.lessThan(55000);
    });
  });
});
