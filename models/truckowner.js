var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var truckSchema = new mongoose.Schema ({
  name: String,
  location: String,
  isActive: Boolean,
  duration: String,
  category: Array,
  menu: String,
})

var truckOwnerSchema = new mongoose.Schema({
  orgName: String,
  address: String,
  email: String,
  trucks: [truckSchema],
});

var TruckOwner = mongoose.model('TruckOwner', truckOwnerSchema);

module.exports = TruckOwner;
