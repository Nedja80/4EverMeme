# 4EverMeme Repository Structure

This document provides an overview of the repository organization and file structure.

## 📂 Directory Structure

```
4EverMeme/
├── .github/                      # GitHub-specific files
│   ├── ISSUE_TEMPLATE/          # Issue templates
│   │   ├── bug_report.md        # Bug report template
│   │   ├── feature_request.md   # Feature request template
│   │   ├── question.md          # Question template
│   │   └── config.yml           # Issue template configuration
│   └── workflows/               # GitHub Actions workflows
│       ├── greetings.yml        # Welcome message automation
│       └── pages.yml            # GitHub Pages deployment
│
├── contracts/                    # Smart contract source code
│   └── 4EverMeme.sol            # Main token contract
│
├── docs/                        # Documentation
│   ├── CONTRACT_DOCUMENTATION.md # Technical contract docs
│   ├── DEPLOYMENT_GUIDE.md      # Deployment and usage guide
│   ├── SECURITY_AUDIT.md        # Security assessment
│   └── FAQ.md                   # Frequently asked questions
│
├── scripts/                     # Deployment and utility scripts
│   └── deploy.js                # Contract deployment script
│
├── test/                        # Test files
│   └── FourEverMeme.test.js     # Contract test suite
│
├── .env.example                 # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier configuration
├── CHANGELOG.md                # Project changelog
├── CODE_OF_CONDUCT.md          # Community code of conduct
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
├── PULL_REQUEST_TEMPLATE.md    # PR template
├── README.md                   # Main project README
├── hardhat.config.js           # Hardhat configuration
└── package.json                # Node.js dependencies
```

## 📄 File Descriptions

### Root Level Files

#### Configuration Files

- **`.env.example`**
  - Template for environment variables
  - Contains placeholders for sensitive data
  - Copy to `.env` and fill with actual values

- **`.eslintrc.json`**
  - ESLint configuration for JavaScript linting
  - Enforces code style and catches errors

- **`.prettierrc`**
  - Prettier configuration for code formatting
  - Ensures consistent code style

- **`.gitignore`**
  - Specifies files Git should ignore
  - Prevents committing sensitive or build files

- **`hardhat.config.js`**
  - Hardhat framework configuration
  - Network settings, compiler options, and plugins

- **`package.json`**
  - Node.js project metadata
  - Dependencies and scripts

#### Documentation Files

- **`README.md`**
  - Main project documentation
  - First file visitors see on GitHub
  - Contains overview, links, and quick start

- **`CHANGELOG.md`**
  - Chronological list of changes
  - Version history and roadmap
  - Follows Keep a Changelog format

- **`CONTRIBUTING.md`**
  - Guidelines for contributors
  - Development process and standards
  - How to submit issues and PRs

- **`CODE_OF_CONDUCT.md`**
  - Community standards and rules
  - Enforcement guidelines
  - Contact information

- **`LICENSE`**
  - MIT License with disclaimers
  - Legal terms and conditions
  - Liability waivers

- **`PULL_REQUEST_TEMPLATE.md`**
  - Template for pull requests
  - Checklist for contributors
  - Ensures consistent PR format

### .github Directory

#### Issue Templates (`/.github/ISSUE_TEMPLATE/`)

- **`bug_report.md`**
  - Template for reporting bugs
  - Structured format for reproducible issues

- **`feature_request.md`**
  - Template for suggesting features
  - Helps evaluate and prioritize requests

- **`question.md`**
  - Template for asking questions
  - Guides users to appropriate resources

- **`config.yml`**
  - Issue template configuration
  - Links to external resources

#### Workflows (`/.github/workflows/`)

- **`greetings.yml`**
  - Welcomes first-time contributors
  - Automated friendly messages

- **`pages.yml`**
  - Deploys documentation to GitHub Pages
  - Automatic deployment on push

### Contracts Directory (`/contracts/`)

- **`4EverMeme.sol`**
  - Main BEP-20 token implementation
  - Solidity 0.8.20
  - Includes NatSpec documentation

### Documentation Directory (`/docs/`)

- **`CONTRACT_DOCUMENTATION.md`**
  - Technical contract specifications
  - Function descriptions
  - Integration examples

- **`DEPLOYMENT_GUIDE.md`**
  - How to deploy the contract
  - User guide for wallets and exchanges
  - Troubleshooting section

- **`SECURITY_AUDIT.md`**
  - Security assessment
  - Vulnerability analysis
  - Best practices compliance

- **`FAQ.md`**
  - Frequently asked questions
  - Comprehensive Q&A
  - Troubleshooting tips

### Scripts Directory (`/scripts/`)

- **`deploy.js`**
  - Hardhat deployment script
  - Deploys contract to specified network
  - Automatic verification on BscScan

### Test Directory (`/test/`)

- **`FourEverMeme.test.js`**
  - Comprehensive test suite
  - Tests all contract functions
  - Edge cases and gas optimization tests

## 🚀 Quick Setup

### For Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/nedja80/4EverMeme.git
   cd 4EverMeme
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Deploy (testnet)**
   ```bash
   npm run deploy:testnet
   ```

### For Contributors

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📚 Documentation

All documentation is located in the `/docs` directory and can be deployed to GitHub Pages:

- Contract Documentation
- Deployment Guide
- Security Audit
- FAQ

To view locally:
```bash
cd docs
# Open files in your preferred markdown viewer
```

## 🔧 Available Scripts

From `package.json`:

```bash
npm test              # Run test suite
npm run compile       # Compile contracts
npm run deploy        # Deploy to mainnet
npm run deploy:testnet # Deploy to testnet
npm run verify        # Verify on BscScan
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
npm run format        # Format code with Prettier
npm run clean         # Clean build artifacts
```

## 🏗️ Building for Production

### Compile Contracts
```bash
npm run compile
```

### Run Full Test Suite
```bash
npm test
```

### Deploy to BSC Mainnet
```bash
npm run deploy
```

### Verify on BscScan
```bash
npm run verify
```

## 📖 Additional Resources

### Official Links
- **Website**: Coming Soon
- **Telegram**: https://t.me/4evermeme
- **Twitter**: https://x.com/4evermeme
- **BscScan**: https://bscscan.com/address/0xDE008b6e97ad5D05D4f49D3949E91E165f3092Ef

### Development Resources
- **Hardhat**: https://hardhat.org/
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **BSC Docs**: https://docs.bnbchain.org/

## 🤝 Contributing

We welcome contributions! Please see:
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community standards

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is a community project. Always DYOR (Do Your Own Research) before investing. See LICENSE for full disclaimers.

---

**Last Updated**: November 2024  
**Version**: 1.0.0
