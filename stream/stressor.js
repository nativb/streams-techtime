'use strict';

const fs = require('fs');
const saxophonist = require('saxophonist');
const pump = require('pump');
const {Transform} = require('stream');

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

	const source = fs.createReadStream(file);

	const dest = fs.createWriteStream('/dev/null');

	const parseTitle = saxophonist('title');

	const objToText = new Transform({
		transform(chunk, encoding, callback) {
			this.push(chunk.text + '\n');
			callback();
		},
		writableObjectMode: true
	});

	// similar to source.pipe(parseTitle).pipe(objToText).pipe(dest)
	pump(source, parseTitle, objToText, dest, (err) => {
		if (err) {
			console.log(err);
		}

		total++;

		loadFiles();
	});
}
