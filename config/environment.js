var _ = require('lodash');

require('dotenv').load();

var localEnvVars = {
  TITLE:      'hungry-as-truck-app',
  SAFE_TITLE: 'hungry-as-truck-app'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
