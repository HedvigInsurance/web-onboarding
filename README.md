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

## Text keys

Text keys live in [Lokalise](https://lokalise.com/) and exported from there with the script `yarn download-translations`.

This is the process for updating/adding text keys:

1. Make updates to text keys in Lokalise, i.e. add new text keys or update translations. Preferrably we use the Figma/Sketch
    plugin to export text keys and translations directly from design.
2. Download updates from Lokalise by using `yarn download-translations`
    1. Ensure you have installed  the [Lokalise CLI tool](https://github.com/lokalise/lokalise-cli-2-go)
    2. Generate an API token in your [Lokalise profile page](https://app.lokalise.com/profile)
    3. Run `yarn download-translations` and follow the instructions
    4. All text keys tagged with "web-onboarding" will be exported to the translation JSON files. 🤑

### Debugging

To know which text key is used where you can suffix the url anywhere with `?debug=textkeys` to show text keys instead of translations, and to disable
the debug mode you can suffix the url with `?debug=none`.
