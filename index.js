/**
 * Module Dependencies
 */

var strtojs = require('string-to-js');
var extname = require('path').extname;
var through = require('through');
var isArray = Array.isArray;

/**
 * Export `string-to-js`
 */

module.exports = transform;

/**
 * Default regexp
 */

var rtype = /^(html|css)$/;

/**
 * Initialize `transform`
 *
 * @param {Object} file
 * @param {Object} duo
 */

function transform(files) {
  var rsupported = rtype

  if (files) {
    if (files.source) {
      rsupported = files
    } else if (typeof files === 'string') {
      return stoj(files)
    } else if (isArray(files)) {
      rsupported = new RegExp('^(' + files.join('|') + ')$')
    } else {
      throw new Error('stoj: invalid options')
    }
  }

  function stoj(file) {
    var type = extension(file);
    if (!rsupported.test(type)) return through();

    var data = '';
    return through(write, end);

    // write
    function write(buf) {
      data += buf;
    }

    // end
    function end() {
      try {
        var src = strtojs(data)
      } catch (e) {
        this.emit('error', e);
        return;
      }

      this.queue(src);
      this.queue(null);
    }
  }

  return stoj
}

/**
 * Get the file extension
 *
 * @param {String} file
 * @return {String}
 */

function extension(file) {
  return extname(file).slice(1);
}
