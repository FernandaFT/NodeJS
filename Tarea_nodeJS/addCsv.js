const csv = require('./csv.js');

var Newdata = [
	{name: 'Luis', lastname: 'Fajardo'},
	{name: 'Pablo', lastname: 'Fajardo'},
	{name: 'William', lastname: 'Fajardo'},
];

// compose the filename for the csv
let filename = __dirname + '/myCsv.csv';

// add the csv data into the myCsv.csv file
var result = csv.add(filename,Newdata);

result.on('error', error => console.error('MY ERROR', error));