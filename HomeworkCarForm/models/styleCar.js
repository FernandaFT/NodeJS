const PATH = __dirname+'/../data/style.json';

module.exports = CarStyle;

/**
 * CarStyle Model
 * @param {Object} data
 * @constructor
 */
function CarStyle(data = {description: '', name: ''}) {
	var self = this;
	self.description = data.description;
	self.name = data.name;

	self.valid = function() {
		if(self.name === '') {
			return false;
        }
		return true;
	}
}
