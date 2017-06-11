const csv = require('./csv.js');

// compose the filename for the csv
let filename1 = __dirname + '/myCsv1.csv';
let filename2 = __dirname + '/myCsv2.csv';
let filename3 = __dirname + '/myCsv3.csv';


// save the csv data into the myCsv.csv file
var result = csv.merge(filename1, filename2, filename3);

result.on('error', error => console.error('MY ERROR', error));
result.on('done', csv => console.log('file remove it', csv));