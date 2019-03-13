# cypress-file-upload

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/abramenal/cypress-file-upload/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/cypress-file-upload.svg?style=flat&color=important)](https://www.npmjs.com/package/cypress-file-upload) [![CircleCI Status](https://circleci.com/gh/abramenal/cypress-file-upload.svg?style=shield)](https://circleci.com/gh/abramenal/cypress-file-upload) [![Contributors](https://img.shields.io/github/contributors/abramenal/cypress-file-upload.svg?color=yellow)](https://github.com/abramenal/cypress-file-upload/graphs/contributors)

Simple custom Cypress command to ease file upload testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributors](#contributors)
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
cy.fixture('data.json', 'base64').then(fileContent => {
  cy.get('[data-cy="dropzone"]').upload(
    { fileContent, fileName: 'data.png', mimeType: 'application/json' },
    { uploadType: 'drag-n-drop' },
  );
});
```

Please see full version in [example](./example).

## API

Exposed command in a nutshell:

```javascript
cySubject.upload(file, options);
```

`file` is an object that represents file information and contains following properties:

- (string) `fileContent` – raw file content
- (string) `fileName` – file name with extension
- (string) `mimeType` – file mime type (string)

`options` is an object that represents processing options and contains following properties:

- (string) `uploadType` – target element type: `'drag-n-drop'` or `'input'`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/2939703?v=4" width="100px;" alt="James Hollowell"/><br /><sub><b>James Hollowell</b></sub>](https://github.com/allout58)<br />[💻](https://github.com/abramenal/cypress-file-upload/commits?author=allout58 "Code") | [<img src="https://avatars2.githubusercontent.com/u/5886107?v=4" width="100px;" alt="Oliver O'Donnell"/><br /><sub><b>Oliver O'Donnell</b></sub>](http://www.ollie-odonnell.com)<br />[💻](https://github.com/abramenal/cypress-file-upload/commits?author=oliverodaa "Code") | [<img src="https://avatars0.githubusercontent.com/u/4303638?v=4" width="100px;" alt="Peter Colapietro"/><br /><sub><b>Peter Colapietro</b></sub>](https://github.com/virtuoushub)<br />[📖](https://github.com/abramenal/cypress-file-upload/commits?author=virtuoushub "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/37389351?v=4" width="100px;" alt="km333"/><br /><sub><b>km333</b></sub>](https://github.com/km333)<br />[🐛](https://github.com/abramenal/cypress-file-upload/issues?q=author%3Akm333 "Bug reports") |
| :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT][mit]

[npm]: https://www.npmjs.com/
[uglify-es]: https://www.npmjs.com/package/uglify-es/
[mit]: https://opensource.org/licenses/MIT
