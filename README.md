# Hedvig Web Onboarding

This is the web based onboarding that you can find at [https://www.hedvig.com/se-en/new-member](https://www.hedvig.com/se-en/new-member).

## Prerequisites

- `node`
- `yarn`

### Install Node with nvm

1. Install `nvm` [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
2. `nvm install` (installs the node version specified in `.nvmrc`)
3. `nvm use` (use version from `.nvmrc`)

### Install Yarn package manager

Use one of the following `yarn` or `yvm`

#### Install Yarn

1. Install `yarn` [https://classic.yarnpkg.com/en/docs/install/#mac-stable](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

#### Install yvm

`yvm` is a neat yarn version manager just like `nvm` is for node.

1. Install `yvm` [https://yvm.js.org/docs/overview#installation](https://yvm.js.org/docs/overview#installation)
2. Run any yarn command and watch it automagically use the correct version of yarn. (Version specified in `package.json` or `.yvmrc`)

## Installation

```sh
# Install dependencies
$ yarn
```

## Storybook

```sh
# Start Storybook
$ yarn storybook
```

## Development

```sh
# Compile the source files (only needed the first time)
$ yarn build

# Start the app
$ yarn watch
```

The app is running on `http://localhost:8040`. Visit [http://localhost:8040/se/new-member/](http://localhost:8040/se/new-member/) to view the first screen of the onboarding flow.

### .env

Create a `.env` file from the `.env.example`. Most variables are optional but to view some features you need to add corresponding feature flags.

## E2E Tests

### 1. Prerequisites

[Cypress](https://www.cypress.io/) is installed as a separed package inside `web-onboarding` under `e2e` folder. So first step would be install necessary dependencies:

```sh
# Access e2e folder
$ cd e2e

# Install dependencies
$ yarn install
```

Additionally, we use `node@16` to run _cypress_ so before actually run the tests one needs to change _node_ version being used. Assuming you have [`nvm`](https://github.com/creationix/nvm) installed just run the following:

```sh
# Under e2e folder
$ nvm use
```

### 2. Runing the tests

Under `e2e` folder run:

```sh
$ yarn cypress
```

For more info about _Cypress_, please refer to the [official documentation](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress)

## Analytics

We use Google Tag Manager as our analytics tool. You can read about the setup in [Notion](https://www.notion.so/hedviginsurance/Mixpanel-Setup-iOS-Web-Embark-d1abeb9ba7634adea6155f847d32cd8d)

## Text keys

Text keys live in [Lokalise](https://lokalise.com/) and are exported from there with the script `yarn download-translations`.

This is the process for updating/adding text keys:

1. Make updates to text keys in Lokalise, i.e. add new text keys or update translations. Preferably we use the Figma/Sketch
   plugin to export text keys and translations directly from design.
2. Download updates from Lokalise by using `yarn download-translations`
   1. Ensure you have installed the [Lokalise CLI tool](https://github.com/lokalise/lokalise-cli-2-go)
   2. Generate an API token with "Read-only access" in your [Lokalise profile page](https://app.lokalise.com/profile)
   3. Run `yarn download-translations` and follow the instructions
   4. All text keys tagged with "web-onboarding" will be exported to the translation JSON files. 🤑

### Debugging

To know which text key is used where you can suffix the url anywhere with `?debug=textkeys` to show text keys instead of translations, and to disable
the debug mode you can suffix the url with `?debug=none`.

## Updating GraphQL queries and mutations

Most GraphQL requests are defined in `*.graphql` files under `/src/client/graphql`. These are the input to the code generation step that produces `/src/client/data/graphql.tsx`. To update a query or mutation defined in such a file:

1. Access the relevant `*.graphql` file and update the query/mutation
1. Run `yarn codegen`
1. Try and commit the new changes to both the `*.graphql` file as well as the autogenerated `graphql.tsx` file.

> If you want to define a reusable GraphQL fragment, place a `*Fragment.graphql` file in the same folder as the rest of the queries and mutations. You can simply references it inside another `*.graphql` file using the fragment name.
