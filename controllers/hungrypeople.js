// Require resource's model(s).
var hungryperson = require("../models/hungryperson");

var index = function(req, res, next){

  hungryperson.find({}, function(error, hungrypeople){
    res.send(hungrypeople);
  });
};

var show = function(req, res, next){
  hungryperson.findById(req.params.id, function(error, hungryperson){
    if (error) res.json({message: 'Could not find hungryperson because ' + error});
    res.send(hungryperson);
  });
};

module.exports = {
  index: index,
  show:  show
};
