module.exports = function(router){
  router.get('/', function (req, res) {

    req.session.destroy();

    res.render('index');
  });

  router.get('/index', function (req, res,next) {

    req.session.destroy();

    next();
  });
}