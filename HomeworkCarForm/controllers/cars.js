const fs = require('fs');
const Car = require('../models/car');
const CarStyle = require('../models/styleCar');
const querystring = require('querystring');
const csv = require('../csv/csv');
const url = require('url');

const DEFAULT_DATA = {
	records: [],
	counter: 0,
	total: 0
};

const PATH = __dirname+'/../data/cars.json';
const PATHS = __dirname+'/../data/cars.csv';
const PATHSC = __dirname+'/../data/style.json';

module.exports = {
	getAll,
	getS,
	create,
	update,
	remove,
	options,
	createCsv,
	createS
};

/**
 * Get all the cars
 */
function getAll(req, res){
	let data = '';
	try{
		data = require(PATH);
	}catch (err){
		data = DEFAULT_DATA;
	}
	return _jsonResponse(res, data);
}

/**
 * Get all the styles
 */
function getS(req, res) {
	let data = '';
	try{
		data = require(PATHSC);
	}catch (err){
		data = DEFAULT_DATA;
	}
	return _jsonResponse(res, data);
}

/**
 * Get all the data and create a csv file
 */
function createCsv(req, res){
	let data = '';
	try {
		data = require(PATH);
	}catch (err) {
		data = DEFAULT_DATA;
	}

	var Data = data
	// compose the filename for the csv
	let filename = PATHS;

	// save the csv data into the myCsv.csv file
	var result = csv.create(filename, Data);

	result.on('done', csv => console.log('file saved', csv));
}

/**
 * Creates a new car style
 * @param {Object} req
 * @param {Object} res
 */
function createS(req, res){
	let body = '';
	req.on('data', chuck => body += chuck);
	req.on('end', () => {
		let params = querystring.parse(body);
		let carStyle = new CarStyle(params);
		if(!carStyle.valid()) return _errorResponse(res, 'Invalid style');

		let data = '';
		try{
			data = require(PATHSC);
		}catch (err){
			data = DEFAULT_DATA;
		}

		// update the data
		data.records.push(carStyle);
		data.total = data.records.length;
		data.counter = data.records[data.records.length-1].id;

		// save the data
		fs.writeFile(PATHSC, JSON.stringify(data), err => {
			if(err) return _errorResponse(res, 'Could not save new car.');
			return _jsonResponse(res, data);
		});

	});
}


/**
 * Creates a new car
 * @param {Object} req
 * @param {Object} res
 */
function create(req, res){
	let body = '';
	req.on('data', chuck => body += chuck);
	req.on('end', () => {
		let params = querystring.parse(body);
		let car = new Car(params);
		if(!car.valid()) return _errorResponse(res, 'Invalid car');

		let data = '';
		try{
			data = require(PATH);
		}catch (err){
			data = DEFAULT_DATA;
		}

		// update the data
		console.log(data)
		data.records.push(car);
		data.total = data.records.length;
		data.counter = data.records[data.records.length-1].id;

		// save the data
		fs.writeFile(PATH, JSON.stringify(data), err => {
			if(err) return _errorResponse(res, 'Could not save new car.');
			return _jsonResponse(res, data);
		});

	});


}

/**
 * Updates a car
 * @param {Object} req
 * @param {Object} res
 */
function update(req, res){
	console.log('update car');
	let body = '';

	req.on('data', chuck => body += chuck);
	req.on('end', () => {
		let params = querystring.parse(body);
		let car = new Car(params);
		if(!car.valid()) return _errorResponse(res, 'Invalid car');

		let idx = _findCar(params.id, true);

		console.log('idx', idx);
		if(idx === -1) return _errorResponse(res, 'Could not find the car to update.');

		let data = require(PATH);
		data.records[idx] = car;
		data.total = data.records.length;

		data = _toJson(data);
		fs.writeFile(PATH, data, err => {
			if(err) return _errorResponse(res, 'Could not update the car.');
			return _jsonResponse(res, data, false);
		})

	});
}

/**
 * Remove a car
 * @param {Object} req
 * @param {Object} res
 */
function remove(req, res){
	let data = '';
	try{
		data = require(PATH);
	}catch (err){
		return _errorResponse(res, 'No cars to delete.');
	}

	let body = '';
	req.on('data', chuck => body += chuck);
	req.on('end', () => {
		let params = querystring.parse(body);
		let idx = _findCar(params.id, true)

		if(idx === -1) return _errorResponse(res, 'Could not find the car to delete.');

		// remove the car
		data.records.splice(idx, 1);
		data.total = data.records.length;
		data = _toJson(data);
		fs.writeFile(PATH, data, err => {
			if(err) return _errorResponse(res, 'Could not delete car');
			return _jsonResponse(res, data, false);
		});
	});
}

/**
 * Finds a car by id
 * @param {String} id
 * @param {Boolean} getIdx
 * @returns {*}
 * @private
 */
function _findCar(id, getIdx = false){
	let data = '';
	let idx = -1;

	try{
		data = require(PATH);
	}catch (err){
		return getIdx ? idx : null;
	}

	// find the car to delete
	data.records.forEach((car, index) => {
		if(car.id === +id) idx = index;
	});

	if(getIdx) return idx;
	return data[idx];
}

/**
 * Response with the available HTTP methods for the cars route
 * @param {Object} req
 * @param {Object} res
 */
function options(req, res){
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
	});
	res.end();
}

/**
 * Converts Array|Object to JSON string
 * Includes error  catching
 * @param {Array|Object} data
 * @returns {String|Null} Json or null when fails
 * @private
 */
function _toJson(data){
	try{
		data = JSON.stringify(data);
	}catch (err) {
		data = null;
	}
	return data;
}

/**
 * Response for json data
 * @param {Object res
 * @param {Object|Array} data
 * @param toJson
 * @private
 */
function _jsonResponse(res, data, toJson = true){
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	});
	data = toJson ? _toJson(data) : data;
	res.write(data);
	return res.end();
}

/**
 * Response for the errors
 * @param {Object} res
 * @param {String} message error
 * @private
 */
function _errorResponse(res, message){
	res.writeHead(400, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	});
	return res.end(_toJson({
		error: true,
		message
	}));
}
