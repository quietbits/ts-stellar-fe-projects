export const projects = [
  {
    id: "account-viewer-v2",
    name: "Account Viewer",
    repo: "https://github.com/stellar/account-viewer-v2",
    defaultBranch: "master",
    website: "https://accountviewer.stellar.org/",
  },
  {
    id: "amm-reference-ui",
    name: " AMM Reference UI",
    repo: "https://github.com/stellar/amm-reference-ui",
    defaultBranch: "main",
    website: "https://amm-demo.stellar.org/",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    repo: "https://github.com/stellar/dashboard",
    defaultBranch: "master",
    website: "https://dashboard.stellar.org/",
    workspaces: [],
    note: "V2 version is not merged: https://github.com/stellar/dashboard/pull/216 (https://metrics.stellar.org/)",
  },
  {
    id: "freighter",
    name: "Freighter",
    repo: "https://github.com/stellar/freighter",
    defaultBranch: "master",
    website: "https://www.freighter.app/",
    workspaces: [
      "extension",
      "docs",
      "@shared/api",
      "@shared/constants",
      "@shared/helpers",
      "@stellar/freighter-api",
    ],
  },
  {
    id: "laboratory",
    name: "Laboratory",
    repo: "https://github.com/stellar/laboratory",
    defaultBranch: "master",
    website: "https://laboratory.stellar.org/",
    workspaces: [],
  },
  {
    id: "stellar-demo-wallet",
    name: "Stellar Demo Wallet",
    repo: "https://github.com/stellar/stellar-demo-wallet",
    defaultBranch: "master",
    website: "https://demo-wallet.stellar.org/",
    workspaces: [
      "packages/demo-wallet-client",
      "packages/demo-wallet-server",
      "packages/demo-wallet-shared",
    ],
  },
  {
    id: "stellar-design-system",
    name: "Stellar Design System",
    repo: "https://github.com/stellar/stellar-design-system",
    defaultBranch: "main",
    website: "https://design-system.stellar.org/",
    workspaces: ["@stellar/design-system", "@stellar/design-system-website"],
  },
  {
    id: "stellar-disbursement-platform-frontend",
    name: "Stellar Disbursement Platform Frontend",
    repo: "https://github.com/stellar/stellar-disbursement-platform-frontend",
    defaultBranch: "develop",
    website: "https://stellar.org/products-and-tools/disbursement-platform",
    workspaces: [],
  },
];