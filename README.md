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

## Development

```sh
# Start the app
$ yarn watch
```

The app is running on `http://localhost:8080`. Visit [http://localhost:8080/se/new-member/](http://localhost:8080/se/new-member/) to view the first screen of the onboarding flow.

## Analytics

We use Segment, Mixpanel and Google Tag Manager as our analytics tools. You can read about the setup in [Notion](https://www.notion.so/hedviginsurance/Mixpanel-Setup-iOS-Web-Embark-d1abeb9ba7634adea6155f847d32cd8d)
