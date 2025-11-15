# Contributing to 4EverMeme

First off, thank you for considering contributing to 4EverMeme! It's people like you that make 4EverMeme such a great project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to our community moderators on [Telegram](https://t.me/4evermeme).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if relevant**
- **Include your environment details** (wallet, browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how this enhancement would be used**

### Contributing to Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or clarifying existing documentation
- Adding examples or use cases
- Translating documentation to other languages
- Creating tutorials or guides

### Creating Memes and Content

As a meme token project, we love creative contributions:

- Create and share memes about 4EverMeme
- Design graphics, banners, or promotional materials
- Write blog posts or articles
- Create video content

Share your creations in our [Telegram community](https://t.me/4evermeme)!

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- A code editor (VS Code recommended)
- Basic knowledge of Solidity and blockchain

### Setting Up Your Development Environment

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/4EverMeme.git
   cd 4EverMeme
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/nedja80/4EverMeme.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Branch Naming Convention

Use descriptive branch names:

- `feature/` - New features (e.g., `feature/add-burn-function`)
- `fix/` - Bug fixes (e.g., `fix/transfer-validation`)
- `docs/` - Documentation updates (e.g., `docs/improve-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-contract`)
- `test/` - Adding or updating tests (e.g., `test/add-transfer-tests`)

### Commit Message Guidelines

Write clear and meaningful commit messages:

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add burn function to contract

Implemented a burn function that allows token holders to permanently
remove tokens from circulation, reducing total supply.

Closes #123
```

```
docs: update README with new exchange listings

Added PancakeSwap and other DEX information to the README.
```

### Testing

Before submitting a pull request:

1. **Ensure all tests pass**
   ```bash
   npm test
   ```

2. **Add new tests for new features**
   - Write unit tests for contract functions
   - Test edge cases and error conditions

3. **Test manually**
   - Deploy to testnet if making contract changes
   - Verify functionality works as expected

## Pull Request Process

### Before Submitting

1. **Update your fork**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linting**
   ```bash
   npm test
   npm run lint
   ```

3. **Update documentation**
   - Update README.md if needed
   - Add/update code comments
   - Update CHANGELOG.md

### Submitting Your Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Description Should Include:**
   - What changes were made
   - Why these changes were needed
   - How to test the changes
   - Screenshots (if applicable)
   - Related issues (use "Closes #123")

### Review Process

- At least one maintainer review is required
- All tests must pass
- Code must follow style guidelines
- Documentation must be updated
- Conflicts must be resolved

### After Your PR is Merged

1. **Delete your branch**
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Update your main branch**
   ```bash
   git checkout main
   git pull upstream main
   ```

## Style Guidelines

### Solidity Style Guide

Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html):

- Use 4 spaces for indentation
- Maximum line length of 120 characters
- Use explicit visibility for all functions
- Add NatSpec comments for all public functions
- Order functions: constructor, receive, fallback, external, public, internal, private
- Use meaningful variable names

**Example:**
```solidity
/**
 * @notice Transfers tokens to a specified address
 * @param to The address to transfer to
 * @param value The amount to transfer
 * @return success True if the transfer was successful
 */
function transfer(address to, uint256 value) public returns (bool success) {
    require(balanceOf[msg.sender] >= value, "Insufficient balance");
    balanceOf[msg.sender] -= value;
    balanceOf[to] += value;
    emit Transfer(msg.sender, to, value);
    return true;
}
```

### JavaScript Style Guide

- Use ES6+ syntax
- Use 2 spaces for indentation
- Use semicolons
- Use meaningful variable names
- Add comments for complex logic

### Markdown Style Guide

- Use headers appropriately (# for title, ## for sections, etc.)
- Add a blank line before and after headers
- Use code blocks with language specification
- Use relative links for internal documentation
- Keep lines under 120 characters when possible

## Community

### Communication Channels

- **Telegram**: [Join our community](https://t.me/4evermeme)
- **Twitter**: [@4evermeme](https://x.com/4evermeme)
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussions

### Getting Help

If you need help:

1. Check existing documentation
2. Search closed issues
3. Ask in our Telegram group
4. Create a new issue with the `question` label

### Recognition

Contributors will be:

- Listed in our README.md
- Mentioned in release notes
- Recognized in our community channels
- Eligible for future community rewards (if implemented)

## License

By contributing to 4EverMeme, you agree that your contributions will be licensed under the MIT License.

---

## Thank You!

Your contributions to 4EverMeme help make the project better for everyone. We appreciate your time and effort! 🚀

**Made with ❤️ by the 4EverMeme Community**
