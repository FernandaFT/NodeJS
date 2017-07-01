const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

module.exports = {
	create,
};

/**
 * Create a new CSV file
 */
function create(filename, data){
	let event = new EventEmitter();

	// mocked csv content
	let csv = '';
//
	data.records.forEach(function (elem) {
		csv += elem.id + ', ' + elem.model + ', ' + elem.brand + ', ' + elem.year + ', ' + elem.price + ', ' + elem.color + ', ' + elem.styleSelect + '\n';
	});

	console.log('csv'+csv)
	// write the csv file
	fs.writeFile(filename, csv, error => {
		if(error) event.emit('error', error);
		event.emit('done','\n',csv);
	});

	return event;
}
