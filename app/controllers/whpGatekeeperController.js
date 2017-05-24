/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Yearly Profile Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function districtProfilePage(req, res) {

  var profileYearList = ["Select", "2017/2018", "2018/2019", "2019/2020"];

  req.session.profileData = req.session.profileData || {};

  var profileData = {
    profileYearList : profileYearList,
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : "2017/2018",
    whpProfile : req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile : req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    totalProvPlaces : req.session.profileData.totalProvPlaces ? req.session.profileData.totalProvPlaces : 1400,
    controlGpPlaces : req.session.profileData.controlGpPlaces ? req.session.profileData.controlGpPlaces : 140,
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540
  };

  if (req.session.user.role !== 'gatekeeper') {
    res.redirect('/latest/selection_tool');
  } else {
    res.locals.user = req.session.user;
    res.render('latest/whp-annual-profile', profileData);
  }
}

function districtProfileAction(req, res) {

  var totalProvPlaces = parseInt(req.body.whpProfile) + parseInt(req.body.pscProfile);
  var controlGpPlaces = Math.round(totalProvPlaces / 10);
  var totalPlaces = Math.round(totalProvPlaces + controlGpPlaces);
  var inputProfileData = {
    profileYear : req.body.profileYear,
    whpProfile : req.body.whpProfile,
    pscProfile : req.body.pscProfile,
    addPlaces : req.body.addPlaces,
    totalProvPlaces : totalProvPlaces,
    controlGpPlaces : controlGpPlaces,
    totalPlaces : totalPlaces
  };

  req.session.profileData = inputProfileData;
  res.redirect('/latest/gatekeeper/profile');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Weekly Profile Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function districtWeeklyProfilePage (req, res) {

  req.session.profileData = req.session.profileData || {};
  req.session.weeklyProfileData = req.session.weeklyProfileData || {};

  var whpFlatProfile = 0;
  var pscFlatprofile = 0;
  var week1whpProfile= 0,
      week2whpProfile = 0,
      week3whpProfile = 0,
      week4whpProfile = 0,
      week5whpProfile = 0,
      week52whpProfile = 0,
      week1pscProfile = 0,
      week2pscProfile = 0,
      week3pscProfile = 0,
      week4pscProfile = 0,
      week5pscProfile = 0,
      week52pscProfile = 0,
      week1whpExtrasProfile = 0,
      week2whpExtrasProfile = 0,
      week3whpExtrasProfile = 0,
      week4whpExtrasProfile = 0,
      week5whpExtrasProfile = 0,
      week52whpExtrasProfile = 0,
      week1pscExtrasProfile = 0,
      week2pscExtrasProfile = 0,
      week3pscExtrasProfile = 0,
      week4pscExtrasProfile = 0,
      week5pscExtrasProfile = 0,
      week52pscExtrasProfile = 0;

  if (!req.session.profileData.totalPlaces && !req.session.weeklyProfileData.week1whpProfile) {
    whpFlatProfile = Math.round(1300 / 52);
    pscFlatProfile = Math.round(100 / 52);
  } else {
    whpFlatProfile = Math.round(req.session.profileData.whpProfile / 52);
    pscFlatProfile = Math.round(req.session.profileData.pscProfile / 52)
  };

  // If nothing already saved in weeklyProfileData
  if (!req.session.weeklyProfileData.week1whpProfile) {
    week1whpProfile = whpFlatProfile;
    week2whpProfile = whpFlatProfile;
    week3whpProfile = whpFlatProfile;
    week4whpProfile = whpFlatProfile;
    week5whpProfile = whpFlatProfile;
    week52whpProfile = whpFlatProfile;
    week1pscProfile = pscFlatProfile;
    week2pscProfile = pscFlatProfile;
    week3pscProfile = pscFlatProfile;
    week4pscProfile = pscFlatProfile;
    week5pscProfile = pscFlatProfile;
    week52pscProfile = pscFlatProfile;
    week1whpExtrasProfile = 0;
    week2whpExtrasProfile = 0;
    week3whpExtrasProfile = 0;
    week4whpExtrasProfile = 0;
    week5whpExtrasProfile = 0;
    week52whpExtrasProfile = 0;
    week1pscExtrasProfile = 0;
    week2pscExtrasProfile = 0;
    week3pscExtrasProfile = 0;
    week4pscExtrasProfile = 0;
    week5pscExtrasProfile = 0;
    week52pscExtrasProfile = 0;
  } else {
    week1whpProfile = req.session.weeklyProfileData.week1whpProfile;
    week2whpProfile = req.session.weeklyProfileData.week2whpProfile;
    week3whpProfile = req.session.weeklyProfileData.week3whpProfile;
    week4whpProfile = req.session.weeklyProfileData.week4whpProfile;
    week5whpProfile = req.session.weeklyProfileData.week5whpProfile;
    week52whpProfile = req.session.weeklyProfileData.week52whpProfile;
    week1pscProfile = req.session.weeklyProfileData.week1pscProfile;
    week2pscProfile = req.session.weeklyProfileData.week2pscProfile;
    week3pscProfile = req.session.weeklyProfileData.week3pscProfile;
    week4pscProfile = req.session.weeklyProfileData.week4pscProfile;
    week5pscProfile = req.session.weeklyProfileData.week5pscProfile;
    week52pscProfile = req.session.weeklyProfileData.week52pscProfile;
    week1whpExtrasProfile = req.session.weeklyProfileData.week1whpExtrasProfile;
    week2whpExtrasProfile = req.session.weeklyProfileData.week2whpExtrasProfile;
    week3whpExtrasProfile = req.session.weeklyProfileData.week3whpExtrasProfile;
    week4whpExtrasProfile = req.session.weeklyProfileData.week4whpExtrasProfile;
    week5whpExtrasProfile = req.session.weeklyProfileData.week5whpExtrasProfile;
    week52whpExtrasProfile = req.session.weeklyProfileData.week52whpExtrasProfile;
    week1pscExtrasProfile = req.session.weeklyProfileData.week1pscExtrasProfile;
    week2pscExtrasProfile = req.session.weeklyProfileData.week2pscExtrasProfile;
    week3pscExtrasProfile = req.session.weeklyProfileData.week3pscExtrasProfile;
    week4pscExtrasProfile = req.session.weeklyProfileData.week4pscExtrasProfile;
    week5pscExtrasProfile = req.session.weeklyProfileData.week5pscExtrasProfile;
    week52pscExtrasProfile = req.session.weeklyProfileData.week52pscExtrasProfile;
  };

  var weeklyProfileData = {
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540,
    district : req.session.profileData.district ? req.session.profileData.district : "Mercia",
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : "2017/2018",
    whpProfile : req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile : req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    week1whpProfile : week1whpProfile,
    week2whpProfile : week2whpProfile,
    week3whpProfile : week3whpProfile,
    week4whpProfile : week4whpProfile,
    week5whpProfile : week5whpProfile,
    week52whpProfile : week52whpProfile,
    week1pscProfile : week1pscProfile,
    week2pscProfile : week2pscProfile,
    week3pscProfile : week3pscProfile,
    week4pscProfile : week4pscProfile,
    week5pscProfile : week5pscProfile,
    week52pscProfile : week52pscProfile,
    week1whpExtrasProfile : week1whpExtrasProfile,
    week2whpExtrasProfile : week2whpExtrasProfile,
    week3whpExtrasProfile : week3whpExtrasProfile,
    week4whpExtrasProfile : week4whpExtrasProfile,
    week5whpExtrasProfile : week5whpExtrasProfile,
    week52whpExtrasProfile : week52whpExtrasProfile,
    week1pscExtrasProfile : week1pscExtrasProfile,
    week2pscExtrasProfile : week2pscExtrasProfile,
    week3pscExtrasProfile : week3pscExtrasProfile,
    week4pscExtrasProfile : week4pscExtrasProfile,
    week5pscExtrasProfile : week5pscExtrasProfile,
    week52pscExtrasProfile : week52pscExtrasProfile
  };

  res.render('latest/whp-weekly-profile', weeklyProfileData);
}

function districtWeeklyProfileAction (req, res) {
  
  var inputWeeklyProfileData = {
    week1whpProfile : req.body.week1whpProfile,
    week2whpProfile : req.body.week2whpProfile,
    week3whpProfile : req.body.week3whpProfile,
    week4whpProfile : req.body.week4whpProfile,
    week5whpProfile : req.body.week5whpProfile,
    week52whpProfile : req.body.week52whpProfile,
    week1pscProfile : req.body.week1pscProfile,
    week2pscProfile : req.body.week2pscProfile,
    week3pscProfile : req.body.week3pscProfile,
    week4pscProfile : req.body.week4pscProfile,
    week5pscProfile : req.body.week5pscProfile,
    week52pscProfile : req.body.week52pscProfile,
    week1whpExtrasProfile : req.body.week1whpExtras,
    week2whpExtrasProfile : req.body.week2whpExtras,
    week3whpExtrasProfile : req.body.week3whpExtras,
    week4whpExtrasProfile : req.body.week4whpExtras,
    week5whpExtrasProfile : req.body.week5whpExtras,
    week52whpExtrasProfile : req.body.week52whpExtras,
    week1pscExtrasProfile : req.body.week1pscExtras,
    week2pscExtrasProfile : req.body.week2pscExtras,
    week3pscExtrasProfile : req.body.week3pscExtras,
    week4pscExtrasProfile : req.body.week4pscExtras,
    week5pscExtrasProfile : req.body.week5pscExtras,
    week52pscExtrasProfile : req.body.week52pscExtras
  };

  req.session.weeklyProfileData = inputWeeklyProfileData;
  res.redirect('/latest/gatekeeper/weeklyProfile');
}

function calcPercentAndFloor (num, perNum) {
  return Math.floor(num * perNum / 100);
}

function calcPercentAndRound (num, perNum) {
  return Math.round(num * perNum / 100);
}

module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage= districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction= districtWeeklyProfileAction;