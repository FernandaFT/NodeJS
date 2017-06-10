const csv = require('./csv.js');

var data = [
	{name: 'Fernanda', lastname: 'Fajardo'},
	{name: 'Guadalupe', lastname: 'Fajardo'},
	{name: 'Carlos', lastname: 'Fajardo'}
];

// compose the filename for the csv
let filename = __dirname + '/myCsv.csv';

// save the csv data into the myCsv.csv file
var result = csv.create(filename, data);

result.on('error', error => console.error('MY ERROR', error));
result.on('done', csv => console.log('file saved', csv));