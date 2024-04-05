# MRAID JS

Project for sharing `mraid.js` file between Android, iOS SDK

## Development
Perform following steps to setup for development:
1. Clone project
2. Install Node via [installer](https://nodejs.org/en/download/) or [packageManager](https://nodejs.org/en/download/package-manager/).
3. Install Yarn via [npm](https://classic.yarnpkg.com/lang/en/docs/install)
4. From root of the project run `yarn install`

The following commands are available:

| Command              | Description                                                             |
|:---------------------|:------------------------------------------------------------------------|
| `yarn lint`          | Runs static code analysis. Outputs errors                               |
| `yarn lint:fix`      | Runs static code analysis. Outputs errors and applies fixes if possible |
| `yarn build:dev`     | Transpiles .ts files to appropriate .js files. (Development mode)       |
| `yarn build:prod`    | Transpiles .ts files to appropriate .js files. (Production mode)        |
| `yarn test`          | Runs all available tests                                                |
| `yarn test:coverage` | Runs all available tests with coverage                                  |
