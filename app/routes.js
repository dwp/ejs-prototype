var express = require('express');
var router = express.Router();
var users = require('./users')();

require('./routes/init')(router, users);
require('./routes/index')(router);
require('./routes/provision')(router);
require('./routes/toggle-user-role')(router, users);
require('./routes/appointments')(router);
require('./routes/teams')(router);
require('./routes/whp-selection-tool')(router);
require('./routes/esa-claimant-commitment')(router);
require('./routes/job-profile')(router);

module.exports = router;