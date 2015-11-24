var index = function(req, res, next) {
  res.render('welcome/index', {user: req.user});
};

// app.get('/', function(req, res) {
//     res.render('index', { user: req.user });
// });

module.exports = {
  index: index,
};
