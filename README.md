This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that uses npm as package manager.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content

The site content is stored as Markdown in `content/organizations` and
`content/payment-methods`. Copy either included `example.md`, rename it, fill in
its front matter and content, and set `published: true`. An organization file's
name becomes its URL slug; for example, `direct-relief.md` is available at
`/direct-relief`.

Organization front matter supports:

- Required: `name`
- Location: `department`, `city`, `address`, `addressUrl`
- Classification: `cause`, `smallFundraiser`, `published`, `order`
- Donations and actions: `donationUrl`, `contactUrl`, `contactLabel`, `paymentMethods`, `acceptsCrypto`
- Contact: `largeDonationsContact`, `websiteUrl`, `instagramUrl`, `facebookUrl`, `twitterUrl`
- Details: `spendingTowards`, `accomplishmentsUrl`, `backedBy`
- Image: `bannerImage` or `bannerImageUrl`

The Markdown body is the organization description. Published content is
validated during development and builds, with errors identifying the invalid
file and field.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Building the project
Before opening a PR, please check that your changes can be built:

```bash
npm run build
```

## Deploy on GitHub Pages

The site is exported as static HTML into `out/` during `npm run build`. Merges to
`main` automatically deploy that directory through `.github/workflows/deploy-pages.yml`.

Before the first deployment, open the repository's **Settings → Pages** and set
**Source** to **GitHub Actions**. The project site will be available at:

`https://colombia-relief-efforts.github.io/Colombia/`

The workflow supplies `/Colombia` as the production base path. Local builds use
the root path by default; use `PAGES_BASE_PATH=/Colombia npm run build` to test
the exact GitHub Pages paths locally.
