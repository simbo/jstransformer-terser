# jstransformer-terser

[Terser](https://github.com/terser/terser) support for [JSTransformers](http://github.com/jstransformers).

> Minifies javascript using terser via jstransformers.

[![npm Package Version](https://img.shields.io/npm/v/jstransformer-terser?)](https://www.npmjs.com/package/jstransformer-terser)
[![Package Dependencies](https://img.shields.io/david/simbo/jstransformer-terser?label=deps)](https://www.npmjs.com/package/jstransformer-terser?activeTab=dependencies)
[![Coveralls github](https://img.shields.io/coveralls/github/simbo/jstransformer-terser)](https://coveralls.io/github/simbo/jstransformer-terser)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/simbo/jstransformer-terser/CI/master)](https://github.com/simbo/jstransformer-terser/actions?query=workflow%3ACI)
[![GitHub Repo](https://img.shields.io/badge/repo-public-87ceeb)](https://github.com/simbo/jstransformer-terser)
[![License MIT](https://img.shields.io/badge/license-MIT-4cc552)](http://simbo.mit-license.org/)

---

## Install

```sh
# install using npm
npm install --save jstransformer-terser terser
# install using yarn
yarn add jstransformer-terser terser
```

## API

```js
var sd = require('jstransformer')(require('jstransformer-terser'));

sd.renderAsync('function add(first, second) { return first + second; }').then(result => console.log(result.body));
//=> 'function add(n,d){return n+d;}'
```

## Development

Requirements: node.js >=14, yarn >=1.22

```sh
# build using microbundle
yarn build
# watch and rebuild
yarn build:watch
# lint using prettier and eslint
yarn lint
# test using jest
yarn test
# watch and retest
yarn test:watch
# open coverage in default browser
yarn coverage:open
# check everything
yarn preflight
```

## License and Author

[MIT &copy; Simon Lepel](http://simbo.mit-license.org/)
