// Require resource's model(s).
var hungryperson = require("../models/hungryperson");

var index = function(req, res, next){

  hungryperson.find({}, function(error, hungrypeople){
    res.render('hungrypeople/index', {hungrypeople: hungrypeople});
  });
};

var show = function(req, res, next){
  hungryperson.findById(req.params.id, function(error, hungryperson){
    if (error) res.json({message: 'Could not find hungryperson because ' + error});
    res.render('hungrypeople/show', {hungryperson: hungryperson});
  });
};

module.exports = {
  index: index,
  show:  show
};
