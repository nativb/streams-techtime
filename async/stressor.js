'use strict';

const fs = require('fs');

// xml parser
const {parseString} = require('xml2js');

// count the total number of pages
const total = 0;

const files = process.argv.splice(2);

// to display the time taken to process all files
console.time('parsing time');
parse();

function parse (err) {
  const file = files.shift();

  // if no more files -> display info and exit
  if (!file) {
    console.timeEnd('parsing time');
    console.log('total pages', total);
    return
  }

  console.log('parsing', file);

  fs.readFile(file, function (err, data) {
    if (err) {
      throw err
    }

    parseString(data);
    parse();
  })
}
