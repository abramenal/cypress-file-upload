# cypress-file-upload

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/abramenal/cypress-file-upload/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/cypress-file-upload.svg?style=flat&color=important)](https://www.npmjs.com/package/cypress-file-upload) [![CircleCI Status](https://circleci.com/gh/abramenal/cypress-file-upload.svg?style=shield)](https://circleci.com/gh/abramenal/cypress-file-upload) [![All Contributors](https://img.shields.io/badge/all_contributors-33-yellow.svg)](#contributors)

File upload testing made easy.

This package adds a custom [Cypress][cypress] command that allows you to make an abstraction on how exactly you upload files through HTML controls and focus on testing user workflows.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Recipes](#recipes)
- [Caveats](#caveats)
- [It isn't working! What else can I try?](#it-isnt-working-what-else-can-i-try)
- [Contributors](#contributors)
- [License](#license)

## Installation

The package is distributed via [npm][npm] and should be installed as one of your project's `devDependencies`:

```bash
npm install --save-dev cypress-file-upload
```

## Usage

`cypress-file-upload` extends Cypress' `cy` command.
Add this line to your project's `cypress/support/commands.js`:

```javascript
import 'cypress-file-upload';
```

Now you are ready to actually test uploading. Here are some basic examples:

```javascript
/* Plain HTML input */

const yourFixturePath = 'data.json';
cy.get('[data-cy="file-input"]').attachFile(yourFixturePath);

/* Drag-n-drop component */

cy.get('[data-cy="dropzone"]').attachFile(yourFixturePath, { subjectType: 'drag-n-drop' });

/* You can also attach multiple files by chaining the command */

const yourBestPicture = 'meow.png';
cy.get('[data-cy="file-input"]')
  .attachFile(yourFixturePath)
  .attachFile(yourBestPicture);

/* If your file encoding is not supported out of the box, make sure to pass it explicitly */

const weirdo = 'test.shp';
cy.get('[data-cy="file-input"]').attachFile({ filePath: weirdo, encoding: 'utf-8' });

/* If your input element is invisible or stays within shadow DOM, make sure enforcing manual event triggering */

cy.get('[data-cy="file-input"]').attachFile(yourFixturePath, { force: true });

/* If you want to overwrite the file name */

const data = 'test.json';
cy.get('[data-cy="file-input"]').attachFile({ filePath: data, fileName: 'users.json' });

/* If your file needs special processing not supported out of the box, you can pass fileContent directly */

const special = 'file.spss';
cy.fixture(special, 'binary')
  .then(Cypress.Blob.binaryStringToBlob)
  .then((fileContent) => {
    cy.get('[data-cy="file-input"]').attachFile({ fileContent, filePath: special, encoding: 'utf-8' });
})

/* when providing fileContent is possible to ignore filePath but fileName and mime type must be provided */

const special = 'file.spss';
cy.fixture(special, 'binary')
  .then(Cypress.Blob.binaryStringToBlob)
  .then((fileContent) => {
    cy.get('[data-cy="file-input"]').attachFile({ fileContent, fileName: 'special', mimeType: 'application/octet-stream', encoding: 'utf-8' });
})
```

**Trying to upload a file that does not supported by Cypress by default?** Make sure you pass `encoding` property (see [API](#api)).

See more usage guidelines in [recipes](./recipes).

## API

Exposed command in a nutshell:

```javascript
cySubject.attachFile(fixture, processingOpts);
```

`fixture` is a string path (or object with same purpose) that represents your local fixture file and contains following properties:

- {String} `filePath` – file path (with extension)
- {String} `fileName` - (optional) the name of the file to be attached, this allows to override the name provided by `filePath`
- {Blob} `fileContent` - (optional) the binary content of the file to be attached
- {String} `mimeType` – (optional) file [MIME][mime] type. By default, it gets resolved automatically based on file extension. Learn more about [mime](https://github.com/broofa/node-mime)
- {String} `encoding` – (optional) normally [`cy.fixture`][cy.fixture] resolves encoding automatically, but in case it cannot be determined you can provide it manually. For a list of allowed encodings, see [here](https://github.com/abramenal/cypress-file-upload/blob/master/lib/file/constants.js#L1)

`processingOpts` (optional) contains following properties:

- {String} `subjectType` – target (aka subject) element kind: `'drag-n-drop'` component or plain HTML `'input'` element. Defaults to `'input'`
- {Boolean} `force` – (optional) same as for [`cy.trigger`][cy.trigger] it enforces events triggering on HTML subject element. Usually this is necessary when you use hidden HTML controls for your file upload. Defaults to `false`
- {Boolean} `allowEmpty` - (optional) when true, do not throw an error if `fileContent` is zero length. Defaults to `false`

## Recipes

Most common frontend UI setups along with Cypress & file upload testing are located at [recipes](./recipes).

Any contributions are welcome!

## Caveats

During the lifetime plugin faced some issues you might need to be aware of:

- Chrome 73 changes related to HTML file input behavior: [#34][#34]
- Force event triggering (same as for [`cy.trigger`][cy.trigger]) should happen when you use hidden HTML controls: [#41][#41]
- Binary fixture has a workarounded encoding: [#70][#70]
- Video fixture has a workarounded encoding: [#136][#136]
- Shadow DOM compatibility: [#74][#74]
- Reading file content after upload: [#104][#104]

## It isn't working! What else can I try?

Here is step-by-step guide:

1. Check [Caveats](#caveats) – maybe there is a tricky thing about exactly your setup
1. Submit the issue and let us know about you problem
1. In case you're using a file with encoding and/or extension that is not yet supported by Cypress, make sure you've tried to explicitly set the `encoding` property (see [API](#api))
1. Comment your issue describing what happened after you've set the `encoding`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/allout58"><img src="https://avatars0.githubusercontent.com/u/2939703?v=4" width="100px;" alt=""/><br /><sub><b>James Hollowell</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=allout58" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lunxiao"><img src="https://avatars1.githubusercontent.com/u/17435809?v=4" width="100px;" alt=""/><br /><sub><b>lunxiao</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Alunxiao" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.ollie-odonnell.com"><img src="https://avatars2.githubusercontent.com/u/5886107?v=4" width="100px;" alt=""/><br /><sub><b>Oliver O'Donnell</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Aoliverodaa" title="Bug reports">🐛</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=oliverodaa" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/virtuoushub"><img src="https://avatars0.githubusercontent.com/u/4303638?v=4" width="100px;" alt=""/><br /><sub><b>Peter Colapietro</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=virtuoushub" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/km333"><img src="https://avatars1.githubusercontent.com/u/37389351?v=4" width="100px;" alt=""/><br /><sub><b>km333</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Akm333" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://pages.cs.wisc.edu/~mui/"><img src="https://avatars2.githubusercontent.com/u/17896701?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Mui</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=kmui2" title="Code">💻</a> <a href="#ideas-kmui2" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/abramenal/cypress-file-upload/pulls?q=is%3Apr+reviewed-by%3Akmui2" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.benwurth.com/"><img src="https://avatars0.githubusercontent.com/u/2358786?v=4" width="100px;" alt=""/><br /><sub><b>Ben Wurth</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Abenwurth" title="Bug reports">🐛</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=benwurth" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://tomskjs.ru"><img src="https://avatars2.githubusercontent.com/u/1303845?v=4" width="100px;" alt=""/><br /><sub><b>Andreev Sergey</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=DragorWW" title="Tests">⚠️</a> <a href="#question-DragorWW" title="Answering Questions">💬</a> <a href="#example-DragorWW" title="Examples">💡</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=DragorWW" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GuillaumeDind"><img src="https://avatars1.githubusercontent.com/u/45589123?v=4" width="100px;" alt=""/><br /><sub><b>Guts</b></sub></a><br /><a href="#question-GuillaumeDind" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/maple-leaf"><img src="https://avatars3.githubusercontent.com/u/3980995?v=4" width="100px;" alt=""/><br /><sub><b>maple-leaf</b></sub></a><br /><a href="#question-maple-leaf" title="Answering Questions">💬</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=maple-leaf" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/daniula"><img src="https://avatars3.githubusercontent.com/u/91628?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Mendalka</b></sub></a><br /><a href="#question-daniula" title="Answering Questions">💬</a></td>
    <td align="center"><a href="http://www.stickypixel.com"><img src="https://avatars1.githubusercontent.com/u/12176122?v=4" width="100px;" alt=""/><br /><sub><b>Chris Sargent</b></sub></a><br /><a href="#question-ChrisSargent" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://ronakchovatiya.glitch.me/"><img src="https://avatars1.githubusercontent.com/u/16197756?v=4" width="100px;" alt=""/><br /><sub><b>Ronak Chovatiya</b></sub></a><br /><a href="#question-rchovatiya88" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://geromekevin.com"><img src="https://avatars0.githubusercontent.com/u/31096420?v=4" width="100px;" alt=""/><br /><sub><b>Jan Hesters</b></sub></a><br /><a href="#question-janhesters" title="Answering Questions">💬</a> <a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Ajanhesters" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/skjnldsv"><img src="https://avatars0.githubusercontent.com/u/14975046?v=4" width="100px;" alt=""/><br /><sub><b>John Molakvoæ</b></sub></a><br /><a href="#question-skjnldsv" title="Answering Questions">💬</a></td>
    <td align="center"><a href="http://psjones.co.uk"><img src="https://avatars1.githubusercontent.com/u/677167?v=4" width="100px;" alt=""/><br /><sub><b>Phil Jones</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Aphiljones88" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/NicolasGehring"><img src="https://avatars3.githubusercontent.com/u/38431471?v=4" width="100px;" alt=""/><br /><sub><b>Nicolas Gehring</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3ANicolasGehring" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.pertiller.tech"><img src="https://avatars3.githubusercontent.com/u/1514111?v=4" width="100px;" alt=""/><br /><sub><b>David Pertiller</b></sub></a><br /><a href="#question-Mobiletainment" title="Answering Questions">💬</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=Mobiletainment" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/xiaomeidan"><img src="https://avatars1.githubusercontent.com/u/5284575?v=4" width="100px;" alt=""/><br /><sub><b>Amy</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Axiaomeidan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/kammerer"><img src="https://avatars0.githubusercontent.com/u/14025?v=4" width="100px;" alt=""/><br /><sub><b>Tomasz Szymczyszyn</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=kammerer" title="Documentation">📖</a></td>
    <td align="center"><a href="http://nitzel.github.io/"><img src="https://avatars0.githubusercontent.com/u/8362046?v=4" width="100px;" alt=""/><br /><sub><b>nitzel</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=nitzel" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/stefanbrato"><img src="https://avatars2.githubusercontent.com/u/4852275?v=4" width="100px;" alt=""/><br /><sub><b>dirk</b></sub></a><br /><a href="#ideas-stefanbrato" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/0xADD1E"><img src="https://avatars1.githubusercontent.com/u/38090404?v=4" width="100px;" alt=""/><br /><sub><b>Addie Morrison</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3A0xADD1E" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://blog.alec.coffee"><img src="https://avatars2.githubusercontent.com/u/6475934?v=4" width="100px;" alt=""/><br /><sub><b>Alec Brunelle</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Aaleccool213" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://glebbahmutov.com/"><img src="https://avatars1.githubusercontent.com/u/2212006?v=4" width="100px;" alt=""/><br /><sub><b>Gleb Bahmutov</b></sub></a><br /><a href="#ideas-bahmutov" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/JesseDeBruijne"><img src="https://avatars1.githubusercontent.com/u/29858373?v=4" width="100px;" alt=""/><br /><sub><b>Jesse de Bruijne</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=JesseDeBruijne" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/justinlittman"><img src="https://avatars1.githubusercontent.com/u/588335?v=4" width="100px;" alt=""/><br /><sub><b>Justin Littman</b></sub></a><br /><a href="#question-justinlittman" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/harrison9149"><img src="https://avatars0.githubusercontent.com/u/41189790?v=4" width="100px;" alt=""/><br /><sub><b>harrison9149</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Aharrison9149" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jdcl32"><img src="https://avatars1.githubusercontent.com/u/17127746?v=4" width="100px;" alt=""/><br /><sub><b>jdcl32</b></sub></a><br /><a href="#question-jdcl32" title="Answering Questions">💬</a> <a href="https://github.com/abramenal/cypress-file-upload/commits?author=jdcl32" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ds300"><img src="https://avatars2.githubusercontent.com/u/1242537?v=4" width="100px;" alt=""/><br /><sub><b>David Sheldrick</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=ds300" title="Code">💻</a></td>
    <td align="center"><a href="https://macwright.org/"><img src="https://avatars2.githubusercontent.com/u/32314?v=4" width="100px;" alt=""/><br /><sub><b>Tom MacWright</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=tmcw" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ajhoddinott"><img src="https://avatars3.githubusercontent.com/u/771460?v=4" width="100px;" alt=""/><br /><sub><b>Andrew Hoddinott</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=ajhoddinott" title="Code">💻</a></td>
    <td align="center"><a href="http://nisgrak.me"><img src="https://avatars3.githubusercontent.com/u/19597708?v=4" width="100px;" alt=""/><br /><sub><b>Eneko Rodríguez</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=Nisgrak" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/the-owl"><img src="https://avatars1.githubusercontent.com/u/11090288?v=4" width="100px;" alt=""/><br /><sub><b>Dmitry Nikulin</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=the-owl" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/thiago-brezinski-5a4b30125/"><img src="https://avatars3.githubusercontent.com/u/26878038?v=4" width="100px;" alt=""/><br /><sub><b>Thiago Brezinski</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Athiagobrez" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jackguoAtJogg"><img src="https://avatars1.githubusercontent.com/u/56273621?v=4" width="100px;" alt=""/><br /><sub><b>Jack</b></sub></a><br /><a href="#question-jackguoAtJogg" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/yonigibbs"><img src="https://avatars3.githubusercontent.com/u/39593145?v=4" width="100px;" alt=""/><br /><sub><b>Yoni Gibbs</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Ayonigibbs" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/benowenssonos"><img src="https://avatars2.githubusercontent.com/u/44402951?v=4" width="100px;" alt=""/><br /><sub><b>benowenssonos</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Abenowenssonos" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://blog.kodono.info"><img src="https://avatars2.githubusercontent.com/u/946315?v=4" width="100px;" alt=""/><br /><sub><b>Aymeric</b></sub></a><br /><a href="#question-Aymkdn" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/asumaran"><img src="https://avatars1.githubusercontent.com/u/1025173?v=4" width="100px;" alt=""/><br /><sub><b>Alfredo Sumaran</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/issues?q=author%3Aasumaran" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/x-yuri"><img src="https://avatars0.githubusercontent.com/u/730588?v=4" width="100px;" alt=""/><br /><sub><b>x-yuri</b></sub></a><br /><a href="#ideas-x-yuri" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://triqtran.com"><img src="https://avatars1.githubusercontent.com/u/2232035?v=4" width="100px;" alt=""/><br /><sub><b>Tri Q. Tran</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=triqi" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://francischartrand.com"><img src="https://avatars0.githubusercontent.com/u/1503758?v=4" width="100px;" alt=""/><br /><sub><b>Francis Chartrand</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=chartrandf" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/emilong"><img src="https://avatars2.githubusercontent.com/u/1090771?v=4" width="100px;" alt=""/><br /><sub><b>Emil Ong</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=emilong" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Ebazhanov"><img src="https://avatars2.githubusercontent.com/u/13170022?v=4" width="100px;" alt=""/><br /><sub><b>Evgenii</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=Ebazhanov" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/josephzidell"><img src="https://avatars0.githubusercontent.com/u/1812443?v=4" width="100px;" alt=""/><br /><sub><b>Joseph Zidell</b></sub></a><br /><a href="#maintenance-josephzidell" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/danielcaballero"><img src="https://avatars1.githubusercontent.com/u/1639333?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Caballero</b></sub></a><br /><a href="https://github.com/abramenal/cypress-file-upload/commits?author=danielcaballero" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT][mit]

[cypress]: https://cypress.io/
[cy.fixture]: https://docs.cypress.io/api/commands/fixture.html
[cy.trigger]: https://docs.cypress.io/api/commands/trigger.html#Arguments
[npm]: https://www.npmjs.com/
[mime]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
[mit]: https://opensource.org/licenses/MIT
[#34]: https://github.com/abramenal/cypress-file-upload/issues/34
[#41]: https://github.com/abramenal/cypress-file-upload/issues/41
[#70]: https://github.com/abramenal/cypress-file-upload/issues/70
[#74]: https://github.com/abramenal/cypress-file-upload/issues/74
[#104]: https://github.com/abramenal/cypress-file-upload/issues/104
[#136]: https://github.com/abramenal/cypress-file-upload/issues/136
