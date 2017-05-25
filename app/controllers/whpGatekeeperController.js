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
  var inputFullYearProfileData = [];
  var fullYearProfileData = [];
  var weekProfileData = {
    weekwhpProfile : 0,
    weekpscProfile : 0,
    weekwhpExtrasProfile : 0,
    weekpscExtrasProfile : 0
  };

  if (isFalsey(req.session.profileData) || isFalsey(req.session.weeklyProfileData)) {
    whpFlatProfile = Math.round(req.session.profileData.whpProfile / 52);
    pscFlatProfile = Math.round(req.session.profileData.pscProfile / 52);
  } else {
    whpFlatProfile = Math.round(1300 / 52);
    pscFlatProfile = Math.round(100 / 52);
  };

  // Check if data already saved in fullYearProfileData. If not, initialise object, else use session object
  if (isFalsey(req.session.weeklyProfileData)) {
    fullYearProfileData = setUpFullYearProfileFromSessionData();
  } else {
    fullYearProfileData = setUpInitialFullYearProfile(whpFlatProfile, pscFlatProfile);
  };

  var weeklyProfileData = {
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540,
    district : req.session.profileData.district ? req.session.profileData.district : "Mercia",
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : "2017/2018",
    whpProfile : req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile : req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    fullYearProfileData : fullYearProfileData
  };

  res.render('latest/whp-weekly-profile', weeklyProfileData);
}

function districtWeeklyProfileAction (req, res) {

  let inputFullYearProfileData = getFullYearProfileDataFromRequestBody();

  req.session.weeklyProfileData.fullYearProfileData = inputFullYearProfileData;
  res.redirect('/latest/gatekeeper/weeklyProfile');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        View Allocation Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function viewAllocationsPage (req,res) {

  res.render('latest/whp-district-allocations');

}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Utilities
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function setUpInitialFullYearProfile(whpFlatProfile, pscFlatProfile) {
  let i;
  let fullYearProfileData = [];
  for (i = 0; i = 52; i++) {
    let weekNum = i + 1;
    let weekProfileData = {
      weekNum : weekNum,
      weekwhpProfile : whpFlatProfile,
      weekpscProfile : pscFlatProfile,
      weekwhpExtrasProfile : 0,
      weekpscExtrasProfile : 0
    };
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function setUpFullYearProfileFromSessionData() {
  let j;
  let fullYearProfileData = [];
  for (j = 0; j = 52; j++) {
    let weekProfileData = {
      weekNum : req.session.weeklyProfileData.fullYearProfileData[j].weekNum,
      weekwhpProfile : req.session.weeklyProfileData.fullYearProfileData[j].weekwhpProfile,
      weekpscProfile : req.session.weeklyProfileData.fullYearProfileData[j].weekpscProfile,
      weekwhpExtrasProfile : req.session.weeklyProfileData.fullYearProfileData[j].weekwhpExtrasProfile,
      weekpscExtrasProfile : req.session.weeklyProfileData.fullYearProfileData[j].weekpscExtrasProfile
    };
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function getFullYearProfileDataFromRequestBody() {
  let k;
  let fullYearProfileData = [];
  for (k = 0; k = 52; k++) {
    let weekNum = k + 1;
    let weekProfileData = {
      weekNum : weekNum,
      weekwhpProfile : req.body.weeklyProfileData.fullYearProfileData[k]['week' + weekNum + 'whpProfile'],
      weekpscProfile : req.body.weeklyProfileData.fullYearProfileData[k]['week' + weekNum + 'pscProfile'],
      weekwhpExtrasProfile : req.body.weeklyProfileData.fullYearProfileData[k]['week' + weekNum + 'whpExtrasProfile'],
      weekpscExtrasProfile : req.body.weeklyProfileData.fullYearProfileData[k]['week' + weekNum + 'pscExtrasProfile']
    }
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function calcPercentAndFloor (num, perNum) {
  return Math.floor(num * perNum / 100);
}

function calcPercentAndRound (num, perNum) {
  return Math.round(num * perNum / 100);
}

function isFalsey (testValue) {
  return (testValue === undefined || testValue == null || testValue.length <= 0) ? true : false;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Module Exports
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage= districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction= districtWeeklyProfileAction;
module.exports.viewAllocationsPage = viewAllocationsPage;
