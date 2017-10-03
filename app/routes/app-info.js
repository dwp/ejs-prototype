/**
 * Created by janegleadall on 03/10/2017.
 */

var appInfo = require("../controllers/appInfoController");

module.exports = function(router) {

  // Application information routes
  router.get('/application/release, appInfo.releaseInfoView');
  
}
