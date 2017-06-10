const csv = require('./csv.js');


// compose the filename for the csv
let filename = __dirname + '/myCsv.csv';

// remove the csv data into the myCsv.csv file
var result = csv.remove(filename);

result.on('error', error => console.error('MY ERROR', error));