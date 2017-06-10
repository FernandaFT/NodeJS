
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

module.exports = {
	create,
	add,
	remove,
	merge
};

/**
 * Create a new CSV file
 * @param  {String} filename filename with the path
 * @param  {Array} data      array with the data to convert to csv
 * @return {EventEmitter}    event
 */
function create(filename, data){
	let event = new EventEmitter();

	// file already exists
	if(fs.existsSync(filename)){
		event.emit('error', new Error('File alreary exists: '+filename));
		return event;
	}

	// mocked csv content
	let csv = ' ';
 
	 data.forEach(function(element){

		csv +=  element.name + ' '  +element.lastname+ ' \n' ;
	});

	// write the csv file
	fs.writeFile(filename, csv, error => {
		if(error) event.emit('error', error);
	});

	return event;
}

/**
 * Adds more datato existing csv file
 * @param {String} filename  filename when the new data will be added
 * @param {Array} data       csv data to add
 * @return {EventEmitter}    event
 */
function add(filename, Newdata){
	let event = new EventEmitter();

	if(!fs.existsSync(filename)){
		event.emit('error', new Error('File alreary exist  '+filename));
		return event;
	};

	let csv = ' ';
 	Newdata.forEach(function(element){

		csv +=  element.name + '  '  +element.lastname+ ' \n' ;
	});

	// write the csv file
	fs.appendFile(filename, csv, error => {
		if(error)throw error;
		console.log('Add New-data')
		return event;
	});

	return event;
}

/**
 * Remove a csv file
 * @param  {string} filename file to remove
 * @return {EventEmitter}    event
 */
function remove(filename){
	let event = new EventEmitter();

	if(!fs.existsSync(filename)){
		event.emit('error', new Error('Does not exist: '+filename));
		return event;
	};

	fs.unlink(filename, error => {
		if (error) throw error ;
		console.log('delete Sucess'+ filename);
		return event;
	});
	return event;

}

/**
 * Merge two CSV files into one
 * @param  {String} filename1 file to merge
 * @param  {String} filename2 file to merge
 * @param  {String} filename3 file when the merge is saved
 * @return {EventEmitter}     event
 */
function merge(filename, filename2){
	let event = new EventEmitter();

	fs.appendFile(filename, error => {
		if (error) throw error;

		fs.writeFile()
	})

}





