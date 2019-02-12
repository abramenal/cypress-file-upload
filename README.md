# cypress-file-upload
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

Simple custom Cypress command to ease file upload testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

This module is distributed via [npm][npm] which is bundled with [uglify-es][uglify-es] and should be installed as one of your project's `devDependencies`:

```bash
npm install --save-dev cypress-file-upload
```

## Usage

`cypress-file-upload` extends Cypress' `cy` command.
Add this line to your project's `cypress/support/commands.js`:

```javascript
import 'cypress-file-upload';
```

Here is a simple example:

```javascript
cy.fixture('data.json', 'base64').then(content => {
  cy.get('[data-cy="dropzone"]').upload(content, 'data.json', 'application/json');
});
```

## License

[MIT][mit]

[npm]: https://www.npmjs.com/
[uglify-es]: https://www.npmjs.com/package/uglify-es/
[mit]: https://opensource.org/licenses/MIT

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/2939703?v=4" width="100px;" alt="James Hollowell"/><br /><sub><b>James Hollowell</b></sub>](https://github.com/allout58)<br />[💻](https://github.com/abramenal/cypress-file-upload/commits?author=allout58 "Code") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!