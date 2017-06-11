const csv = require('./csv.js');

var data = [
	{name: 'Fernanda', lastname: 'Fajardo'},
	{name: 'Guadalupe', lastname: 'Fajardo'},
	{name: 'Carlos', lastname: 'Fajardo'}
];
var data1 = [
	{name: 'Ana', lastname: 'Torres'},
	{name: 'Gerardo', lastname: 'Fajardo'},
	{name: 'Odilie', lastname: 'Fajardo'}
];

var data2 = [
	{name: 'Ivannia', lastname: 'Chavarria'},
	{name: 'Wendy', lastname: 'Chavarria'},
	{name: 'Alexader', lastname: 'Chavarria'}
];
// compose the filename for the csv
let filename = __dirname + '/myCsv.csv';
let filename1 = __dirname + '/myCsv1.csv';
let filename2 = __dirname + '/myCsv2.csv';

// save the csv data into the myCsv.csv file
var result = csv.create(filename, data);
csv.create(filename1, data1);
csv.create(filename2, data2);

result.on('error', error => console.error('MY ERROR', error));
result.on('done', csv => console.log('file saved', csv));