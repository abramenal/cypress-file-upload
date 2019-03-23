# cypress-file-upload

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/abramenal/cypress-file-upload/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/cypress-file-upload.svg?style=flat&color=important)](https://www.npmjs.com/package/cypress-file-upload) [![CircleCI Status](https://circleci.com/gh/abramenal/cypress-file-upload.svg?style=shield)](https://circleci.com/gh/abramenal/cypress-file-upload) [![All Contributors](https://img.shields.io/badge/all_contributors-9-yellow.svg)](#contributors)

File upload testing made easy.

This package adds a custom [Cypress][cypress] command that allows you to make an abstraction on how exactly you upload files through you HTML controls and focus on testing the functionality.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Caveats](#caveats)
- [Contributors](#contributors)
- [License](#license)

## Installation

The package is distributed via [npm][npm], bundled with [uglify-es][uglify-es] and should be installed as one of your project's `devDependencies`:

```bash
npm install --save-dev cypress-file-upload
```

## Usage

`cypress-file-upload` extends Cypress' `cy` command.
Add this line to your project's `cypress/support/commands.js`:

```javascript
import 'cypress-file-upload';
```

Here is a basic example:

```javascript
cy.fixture('data.json', 'base64').then(fileContent => {
  cy.get('[data-cy="dropzone"]').upload(
    { fileContent, fileName: 'data.png', mimeType: 'application/json' },
    { subjectType: 'drag-n-drop' },
  );
});
```

See more usage guidelines in [example](./example).

## API

Exposed command in a nutshell:

```javascript
cySubject.upload(fileOrArray, processingOpts);
```

`fileOrArray` is an object (or an array of those) that represents file information and contains following properties:

- {String} `fileContent` – raw file content, usually a value obtained from [`cy.fixture`][cy.fixture]
- {String} `fileName` – file name (with extension)
- {String} `mimeType` – file mime type

`processingOpts` contains following properties:

- {String} `subjectType` – target (aka subject) element kind: `'drag-n-drop'` component or plain HTML `'input'` element. Defaults to `'input'`.

## Caveats

During the lifetime plugin faced the following issues those you should be aware of:

- Chrome 73 changes related to HTML file input behavior: [#34][#34].

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/allout58"><img src="https://avatars0.githubusercontent.com/u/2939703?v=4" width="100px;" alt="James Hollowell"/><br /><sub><b>James Hollowell</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=allout58" title="Code">💻</a></td><td align="center"><a href="https://github.com/lunxiao"><img src="https://avatars1.githubusercontent.com/u/17435809?v=4" width="100px;" alt="lunxiao"/><br /><sub><b>lunxiao</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Alunxiao" title="Bug reports">🐛</a></td><td align="center"><a href="http://www.ollie-odonnell.com"><img src="https://avatars2.githubusercontent.com/u/5886107?v=4" width="100px;" alt="Oliver O'Donnell"/><br /><sub><b>Oliver O'Donnell</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Aoliverodaa" title="Bug reports">🐛</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=oliverodaa" title="Code">💻</a></td><td align="center"><a href="https://github.com/virtuoushub"><img src="https://avatars0.githubusercontent.com/u/4303638?v=4" width="100px;" alt="Peter Colapietro"/><br /><sub><b>Peter Colapietro</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=virtuoushub" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/km333"><img src="https://avatars1.githubusercontent.com/u/37389351?v=4" width="100px;" alt="km333"/><br /><sub><b>km333</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Akm333" title="Bug reports">🐛</a></td><td align="center"><a href="http://pages.cs.wisc.edu/~mui/"><img src="https://avatars2.githubusercontent.com/u/17896701?v=4" width="100px;" alt="Kevin Mui"/><br /><sub><b>Kevin Mui</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=kmui2" title="Code">💻</a> <a href="#ideas-kmui2" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="http://www.benwurth.com/"><img src="https://avatars0.githubusercontent.com/u/2358786?v=4" width="100px;" alt="Ben Wurth"/><br /><sub><b>Ben Wurth</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Abenwurth" title="Bug reports">🐛</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=benwurth" title="Code">💻</a></td></tr><tr><td align="center"><a href="http://tomskjs.ru"><img src="https://avatars2.githubusercontent.com/u/1303845?v=4" width="100px;" alt="Andreev Sergey"/><br /><sub><b>Andreev Sergey</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=DragorWW" title="Tests">⚠️</a> <a href="#question-DragorWW" title="Answering Questions">💬</a> <a href="#example-DragorWW" title="Examples">💡</a></td><td align="center"><a href="https://github.com/GuillaumeDind"><img src="https://avatars1.githubusercontent.com/u/45589123?v=4" width="100px;" alt="Guts"/><br /><sub><b>Guts</b></sub></a><br /><a href="#question-GuillaumeDind" title="Answering Questions">💬</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT][mit]

[cypress]: https://cypress.io/
[cy.fixture]: https://docs.cypress.io/api/commands/fixture.html
[npm]: https://www.npmjs.com/
[uglify-es]: https://www.npmjs.com/package/uglify-es/
[mit]: https://opensource.org/licenses/MIT
[#34]: https://github.com/abramenal/cypress-file-upload/issues/34
