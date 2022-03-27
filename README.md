# One Page Portfolio using NextJS,  [chakra-ui](https://github.com/chakra-ui/chakra-ui), and TypeScript

Based from this [Next.js starter template](https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui-typescript) using [chakra-ui](https://github.com/chakra-ui/chakra-ui) as the component library within a Next.js app with TypeScript.

The app uses [`getStaticProps`🔗](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)  pulling data from three different services to populate the index of projects displayed:

- Pinned repositories from your Github Profile using the [Github graphQL API](https://docs.github.com/en/graphql)
- A Notion page for Profile and database table of Work projects, using [Notion's API](https://developers.notion.com).
- Any tech blog posts posted from a Dev.to profile, using the [DEV API](https://developers.forem.com/api).

## How to use

Clone this repository:

```bash
git clone git@github.com:sebastosh/portfolio.git
```

cd into directory and install node modules:

```bash
cd portfolio
yarn install
```

You will need to define the following `.env` variables:

```env
DEV_TOKEN=<dev-token>
GITHUB_ACCESS_TOKEN=<github-accesstoken>
NOTION_TOKEN=<notion-api-accesstoken>
NOTION_PAGE_ID=<notion-profile-page-id>
NOTION_PROJECTS_ID=<notion-projects-table-id>
```

Start up your local dev server:

```bash
yarn dev
```

___
[![Netlify Status](https://api.netlify.com/api/v1/badges/dde7c0b3-fdd7-4202-a86c-1ee144215e73/deploy-status)](https://app.netlify.com/sites/sebastiensanzdesantamaria/deploys)
