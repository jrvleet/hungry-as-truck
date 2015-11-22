var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var truckSchema = new mongoose.Schema({
  name: String
  location: String,
  duration: String,
  isActive? : Boolean,
  category: String,
  ownerId: String,
  likes: Array
});

var Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
