# Crypto Dashboard

A responsive cryptocurrency dashboard built using React, TypeScript, Tailwind CSS, and CoinGecko API.
It displays market data, individual coin details, and a chart of historical price data.

It has two main pages:-
`/` -> Dashbord
`/coin/:id` -> Coin detail

Other handlings added are :-
`/error` -> A test page to verify the fallback error boundary added in case of failure in component.
`/*` -> A fallback page if user enter the route which is not supported.

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/kbishal/Crypto-Dashboard.git
cd crypto-dashboard
npm install
```

### Running Locally

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

---

## Project Structure

```
src/
├── api/               # API calls (CoinGecko)
├── components/        # Reusable UI components like CoinRow, Loader
├── context/           # Theme context (dark/light mode)
├── pages/             # Main page components (Dashboard, CoinDetail)
├── App.tsx            # Routing setup
├── main.tsx           # App entry point
```

---

## Tech Stack & Justification

- **React + TypeScript**: Strong typing and component-based architecture
- **Vite**: Fast build tool for development
- **Tailwind CSS**: Utility-first styling, mobile-friendly by default
- **Recharts**: Declarative and responsive charts
- **Axios**: Simplified HTTP client

---

## Testing

This project uses **Jest** and **React Testing Library** for unit testing.

### Features Tested
- Rendering and filtering in Dashboard
- Routing and rendering in Coin Detail page
- Mocked API calls using `axios`
- Pagination interaction

### Running Tests

```bash
npm test
```

Tests are located in the `__tests__` folder and use mocks to avoid hitting the actual CoinGecko API.  
`d3-format` and `ResizeObserver` are mocked for test compatibility which can be found in `jest.setup.ts`.

---

## Known Issues / Improvements

- Accessibility could be improved (e.g., ARIA labels)
- Proper fallback mechnism in case of API failures, instead of just logging errors
- Integrate CI/CD pipeline using GitHub Actions to automate testing and linting on every push or pull request.
- Pre-commit hooks can be optionally added to enforce linting and formatting.
- Add internationalization to support various languages, instead of using constant string.
---
