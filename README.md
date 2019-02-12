# cypress-file-upload

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

Please see full version in [example][example].

## License

[MIT][mit]

[npm]: https://www.npmjs.com/
[uglify-es]: https://www.npmjs.com/package/uglify-es/
[mit]: https://opensource.org/licenses/MIT
[example]: /example
