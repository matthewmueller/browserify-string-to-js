# browserify-string-to-js

read css files, html files, etc. with require(...)

## Installation

```
npm install browserify-string-to-js
```

## Usage

```js
var str2js = require('browserify-string-to-js');

Browserify('index.html')
  .use(str2js())
  .bundle()
  .pipe(process.stdout);
```

## License

MIT
