'use strict';

const fs = require('fs');

// xml parser
const {parseString} = require('xml2js');

// count the total number of pages
let total = 0;

const files = process.argv.splice(2);

// to display the time taken to process all files
console.time('parsing time');

//call parse which will load
loadFiles();

function loadFiles () {
  const file = files.shift();

  // if no more files -> display info and exit
  if (!file) {
    console.timeEnd('parsing time');
    console.log('total pages', total);
    return
  }

  console.log('loading', file);

  fs.readFile(file, function (err, data) {
    if (err) {
      throw err
    }

    //parseString(data);

		total++;

    loadFiles();
  })
}
