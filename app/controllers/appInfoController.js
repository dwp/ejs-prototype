/**
 * Created by janegleadall on 03/10/2017.
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       Application Information Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function releaseInfoView (req, res) {

  const appRelease = res.locals.releaseVersion;

  res.render('latest/releaseSplash_v1', appRelease);
}
module.exports.releaseInfoView = releaseInfoView;