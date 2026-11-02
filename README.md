# bugbasket-playwright-tests

A Playwright end-to-end testing project for the BugBasket application, covering login, product search, product catalog, sorting, and shopping cart functionality.

## Prerequisites

1. **Node.js 20 or newer**. Download it from [https://nodejs.org](https://nodejs.org).
2. **Git**, to clone the repository.
3. A terminal: PowerShell, Git Bash, or VS Code Terminal on Windows.

Check that everything is installed:

```bash
node -v
npm -v
git --version
```

## Step-by-step setup

### 1. Clone the repository

```bash
git clone https://github.com/snizhana-yanchynska/bugbasket-playwright-tests.git
cd bugbasket-playwright-tests
```

### 2. Install project dependencies

```bash
npm ci
```

This installs the exact dependency versions specified in `package-lock.json`.

### 3. Install Playwright Chromium

```bash
npx playwright install chromium
```

This downloads the browser required to run the tests.

## Run the tests

```bash
npx playwright test
```

Playwright runs the automated tests using Chromium by default.

## Other useful commands

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run tests in UI Mode:

```bash
npx playwright test --ui
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Open the HTML test report:

```bash
npx playwright show-report
```

## Test Coverage

The project includes automated end-to-end tests for:

- **Login** – user authentication functionality.
- **Product Search** – searching for products.
- **Product Catalog** – filtering products by category and sorting by price.
- **Shopping Cart** – adding and managing products in the cart.
