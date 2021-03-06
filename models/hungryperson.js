var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var hungryPersonSchema = new mongoose.Schema({
  facebookId: String,
  photo: String,
  name: String,
  email:   String,
  favs: Array
});

var HungryPerson = mongoose.model('HungryPerson', hungryPersonSchema);

module.exports = HungryPerson;
