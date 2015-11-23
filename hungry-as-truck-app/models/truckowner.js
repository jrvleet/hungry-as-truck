var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var truckSchema = new mongoose.Schema ({
  location: String,
  name: String,
  menu: String,
  category: Array,
  duration: Number,
  isActive: Boolean
})

var truckOwnerSchema = new mongoose.Schema({
  orgName: String,
  address: String,
  email: String,
  trucks: [truckSchema],
});

var TruckOwner = mongoose.model('TruckOwner', truckOwnerSchema);

module.exports = TruckOwner;
