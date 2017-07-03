/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       District Places Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtPlacesPage (req, res) {
  var sessionPlacesData = req.session.placesData || {};

  var placesData = {
    totalWHPPlaces: sessionPlacesData.totalWHPPlaces ? sessionPlacesData.totalWHPPlaces : 0,
    totalPSCPlaces: sessionPlacesData.totalPSCPlaces ? sessionPlacesData.totalPSCPlaces : 0,
    mandRatio: sessionPlacesData.mandRatio ? sessionPlacesData.mandRatio : 1.1,
    volRatio: sessionPlacesData.volRatio ? sessionPlacesData.volRatio : 1.5
  };

  if (req.session.user.role !== 'gatekeeper') {
    res.redirect('/latest/selection_tool');
  } else {
    res.locals.user = req.session.user;
    res.render('latest/whp-places', placesData);
  }
}

function districtPlacesAction (req, res) {
  var placesData = {
    totalWHPPlaces: parseInt(req.body.totalWHPPlaces),
    totalPSCPlaces: parseInt(req.body.totalPSCPlaces),
    mandRatio: parseFloat(req.body.mandRatio).toFixed(1),
    volRatio: parseFloat(req.body.volRatio).toFixed(1),
    previousCalcFlag: 0
  };

  req.session.placesData = placesData;
  res.redirect('/latest/gatekeeper/placesBreakdown');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Profile Places Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtPlacesBreakdownPage (req, res) {

  var sessionPlacesData = req.session.placesData || {};

  let totalWHPPlaces = sessionPlacesData.totalWHPPlaces ? sessionPlacesData.totalWHPPlaces : 45;
  let disWHPPlaces;
  let eagWHPPlaces;
  let ltuWHPPlaces;
  let totalPSCPlaces = parseInt(sessionPlacesData.totalPSCPlaces ? sessionPlacesData.totalPSCPlaces : 17);
  let disPSCPlaces;
  let eagPSCPlaces;
  let ltuPSCPlaces;
  const mandRatio = parseFloat(sessionPlacesData.mandRatio ? sessionPlacesData.mandRatio : 1.1).toFixed(1);
  const volRatio = parseFloat(sessionPlacesData.volRatio ? sessionPlacesData.volRatio : 1.5).toFixed(1);
  let placesData;

  eagWHPPlaces = Math.round((10 / 100) * totalWHPPlaces);
  ltuWHPPlaces = Math.round((15 / 100) * totalWHPPlaces);
  disWHPPlaces = totalWHPPlaces - (eagWHPPlaces + ltuWHPPlaces);
  eagPSCPlaces = Math.round((10 / 100) * totalPSCPlaces);
  ltuPSCPlaces = Math.round((15 / 100) * totalPSCPlaces);
  disPSCPlaces = totalPSCPlaces - (eagPSCPlaces + ltuPSCPlaces);

  placesData = {
    totalWHPPlaces: totalWHPPlaces,
    disWHPPlaces: disWHPPlaces,
    eagWHPPlaces: eagWHPPlaces,
    ltuWHPPlaces: ltuWHPPlaces,
    totalPSCPlaces: totalPSCPlaces,
    disPSCPlaces: disPSCPlaces,
    eagPSCPlaces: eagPSCPlaces,
    ltuPSCPlaces: ltuPSCPlaces,
    mandRatio : mandRatio,
    volRatio : volRatio
  };

  req.session.placesData = placesData;

  res.render('latest/whp-profile-places-breakdown');
}

function districtPlacesBreakdownAction (req, res) {

  var sessionPlacesData = req.session.placesData || {};

  let totalWHPPlaces;
  let disWHPPlaces = parseInt(req.body.disWHPPlaces);
  let eagWHPPlaces = parseInt(req.body.eagWHPPlaces);
  let ltuWHPPlaces = parseInt(req.body.ltuWHPPlaces);
  let totalPSCPlaces;
  let disPSCPlaces = parseInt(req.body.disPSCPlaces);
  let eagPSCPlaces = parseInt(req.body.eagPSCPlaces);
  let ltuPSCPlaces = parseInt(req.body.ltuPSCPlaces);
  let disRefsNeeded;
  let eagRefsNeeded;
  let ltuRefsNeeded;
  let disControlGroup;
  let eagControlGroup;
  let volControlGroup;
  let mandControlGroup;
  let totalVolRefs;
  let totalMandRefs;
  const mandRatio = sessionPlacesData.mandRatio;
  const volRatio = sessionPlacesData.volRatio;
  let placesData;

  totalWHPPlaces = disWHPPlaces + eagWHPPlaces + ltuWHPPlaces;
  totalPSCPlaces = disPSCPlaces + eagPSCPlaces + ltuPSCPlaces;
  disRefsNeeded = Math.round((disWHPPlaces + disPSCPlaces) * volRatio);
  eagRefsNeeded = Math.round((eagWHPPlaces + eagPSCPlaces) * volRatio);
  ltuRefsNeeded = Math.round((ltuWHPPlaces + ltuPSCPlaces) * mandRatio);
  disControlGroup = Math.round(disRefsNeeded / 10);
  eagControlGroup = Math.round(eagRefsNeeded / 10);
  volControlGroup = disControlGroup + eagControlGroup;
  mandControlGroup = Math.round(ltuRefsNeeded / 10);
  totalVolRefs = disRefsNeeded + eagRefsNeeded + volControlGroup;
  totalMandRefs = ltuRefsNeeded + mandControlGroup;

  placesData = {
    totalWHPPlaces   : totalWHPPlaces,
    disWHPPlaces     : disWHPPlaces,
    eagWHPPlaces     : eagWHPPlaces,
    ltuWHPPlaces     : ltuWHPPlaces,
    totalPSCPlaces   : totalPSCPlaces,
    disPSCPlaces     : disPSCPlaces,
    eagPSCPlaces     : eagPSCPlaces,
    ltuPSCPlaces     : ltuPSCPlaces,
    disRefsNeeded    : disRefsNeeded,
    eagRefsNeeded    : eagRefsNeeded,
    ltuRefsNeeded    : ltuRefsNeeded,
    disControlGroup  : disControlGroup,
    eagControlGroup  : eagControlGroup,
    volControlGroup  : volControlGroup,
    mandControlGroup : mandControlGroup,
    totalVolRefs     : totalVolRefs,
    totalMandRefs    : totalMandRefs,
    mandRatio        : mandRatio,
    volRatio         : volRatio,
  };

  req.session.displayPlacesData = placesData;

  res.redirect('/latest/gatekeeper/placesSummary');

}

function districtPlacesSummaryPage (req, res) {

  res.render('latest/whp-profile-places-summary');

}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Selection Report Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtSelectionPage (req, res) {

  const placesData = req.session.displayPlacesData || {};
  const totalDisRefs = (placesData.disRefsNeeded + placesData.disControlGroup);
  const totalEAGRefs = (placesData.eagRefsNeeded + placesData.eagControlGroup);

  const selectionReport = {
    newReferrals: 100,
    totalDisRefs: totalDisRefs ? totalDisRefs : 30,
    totalEAGRefs: totalEAGRefs ? totalEAGRefs : 10
  };

  req.session.displayPlacesData = selectionReport;

  res.render('latest/whp-selection-report');
}

function districtSelectionAction (req, res) {

  let placesToFill = req.body.placesToFill;
  let referralsSelected = req.body.referralsSelected;
  let totalDisRefs = req.body.totalDisRefs;
  let totalEAGRefs = req.body.totalEAGRefs;

  const confirmPlaces = {
    placesToFill: placesToFill,
    referralsSelected: referralsSelected,
    totalDisRefs : totalDisRefs,
    totalEAGRefs: totalEAGRefs
  };

  res.render('latest/whp-confirm-selection', confirmPlaces);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        OLD - District Yearly Profile Controllers
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function districtProfilePage (req, res) {
  const profileYearList = ['Select', '2017/2018', '2018/2019', '2019/2020'];

  req.session.profileData = req.session.profileData || {};

  var profileData = {
    profileYearList: profileYearList,
    profileYear: req.session.profileData.profileYear ? req.session.profileData.profileYear : '2017/2018',
    whpProfile: req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile: req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    totalProvPlaces: req.session.profileData.totalProvPlaces ? req.session.profileData.totalProvPlaces : 1400,
    controlGpPlaces: req.session.profileData.controlGpPlaces ? req.session.profileData.controlGpPlaces : 140,
    totalPlaces: req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540
  };
  res.render('latest/whp-annual-profile', profileData);
}

function districtProfileAction (req, res) {
  var totalProvPlaces = parseInt(req.body.whpProfile) + parseInt(req.body.pscProfile);
  var controlGpPlaces = Math.round(totalProvPlaces / 10);
  var totalPlaces = Math.round(totalProvPlaces + controlGpPlaces);
  var inputProfileData = {
    profileYear: req.body.profileYear,
    whpProfile: req.body.whpProfile,
    pscProfile: req.body.pscProfile,
    addPlaces: req.body.addPlaces,
    totalProvPlaces: totalProvPlaces,
    controlGpPlaces: controlGpPlaces,
    totalPlaces: totalPlaces
  };

  req.session.profileData = inputProfileData;
  res.redirect('/latest/gatekeeper/weeklyProfile');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        OLD - District Weekly Profile Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function districtWeeklyProfilePage (req, res) {
  req.session.profileData = req.session.profileData || {};
  req.session.weeklyProfileData = req.session.weeklyProfileData || {};

  var whpFlatProfile = 0;
  var pscFlatProfile = 0;
  var fullYearProfileData = [];
  var weeklyProfileDataToRender = {};

  if (isFalsey(req.session.profileData) || Object.keys(req.session.profileData).length === 0) {
    whpFlatProfile = Math.round(1300 / 52);
    pscFlatProfile = Math.round(100 / 52);
  } else {
    whpFlatProfile = Math.round(req.session.profileData.whpProfile / 52);
    pscFlatProfile = Math.round(req.session.profileData.pscProfile / 52);
  }

  // Check if data already saved in fullYearProfileData. If so, use session.weeklyProfileData. If not, initialise session.weeklyProfileData.
  if (isFalsey(req.session.weeklyProfileData) || Object.keys(req.session.weeklyProfileData).length === 0) {
    fullYearProfileData = setUpInitialFullYearProfile(req, whpFlatProfile, pscFlatProfile);
  } else {
    fullYearProfileData = setUpFullYearProfileFromSessionData(req);
  }

  var weeklyProfileDataToRender = {
    totalPlaces: req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540,
    district: req.session.profileData.district ? req.session.profileData.district : 'Mercia',
    profileYear: req.session.profileData.profileYear ? req.session.profileData.profileYear : '2017/2018',
    whpProfile: req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile: req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    fullYearProfileData: fullYearProfileData
  };

  req.session.weeklyProfileData = fullYearProfileData;

  res.render('latest/whp-weekly-profile', weeklyProfileDataToRender);
}

function districtWeeklyProfileAction (req, res) {
  let fullYearProfileData = getFullYearProfileDataFromRequestBody(req);

  req.session.weeklyProfileData = fullYearProfileData;

  res.redirect('/latest/gatekeeper/weeklyProfile');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        View Allocation Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function viewAllocationsPage (req, res) {
  res.render('latest/whp-district-allocations');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Utilities
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function setUpInitialFullYearProfile (req, whpFlatProfile, pscFlatProfile) {
  let i;
  let fullYearProfileData = [];
  var weekDate;
  var stringDate;
  var newDate;
  var weekNum;

  if (req.session.profileData.profileYear === '2019/2020') {
    weekDate = new Date('2019-04-06');
  } else if (req.session.profileData.profileYear === '2018/2019') {
    weekDate = new Date('2018-04-06');
  } else {
    weekDate = new Date('2017-04-06');
  }

  for (i = 0; i <= 51; i++) {
    weekNum = i + 1;

    if (weekNum > 1) {
      newDate = weekDate.getDate() + 7;
      weekDate.setDate(newDate);
    }

    stringDate = formatDateForDisplay(weekDate);

    let weekProfileData = {
      weekNum: weekNum,
      weekDate: stringDate,
      weekwhpProfile: whpFlatProfile,
      weekpscProfile: pscFlatProfile,
      weekwhpExtrasProfile: 0,
      weekpscExtrasProfile: 0
    };
    fullYearProfileData.push(weekProfileData);
  }

  return fullYearProfileData;
}

function setUpFullYearProfileFromSessionData (req) {
  let j;
  let fullYearProfileData = [];
  for (j = 0; j <= 51; j++) {
    let weekProfileData = {
      weekNum: req.session.weeklyProfileData[j].weekNum,
      weekDate: req.session.weeklyProfileData[j].weekDate,
      weekwhpProfile: req.session.weeklyProfileData[j].weekwhpProfile,
      weekpscProfile: req.session.weeklyProfileData[j].weekpscProfile,
      weekwhpExtrasProfile: req.session.weeklyProfileData[j].weekwhpExtrasProfile,
      weekpscExtrasProfile: req.session.weeklyProfileData[j].weekpscExtrasProfile
    };
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function getFullYearProfileDataFromRequestBody (req) {
  req.session.weeklyProfileData = req.session.weeklyProfileData || {};

  let k;
  let fullYearProfileData = [];
  for (k = 0; k <= 51; k++) {
    let weekNum = k + 1;
    let weekProfileData = {
      weekNum: weekNum,
      weekDate: req.session.weeklyProfileData[k].weekDate,
      weekwhpProfile: req.body['week' + weekNum + 'whpProfile'],
      weekpscProfile: req.body['week' + weekNum + 'pscProfile'],
      weekwhpExtrasProfile: req.body['week' + weekNum + 'whpExtrasProfile'],
      weekpscExtrasProfile: req.body['week' + weekNum + 'pscExtrasProfile']
    };
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function isFalsey (testValue) {
  return (testValue === undefined || testValue == null || testValue.length <= 0) ? true : false;
}

function formatDateForDisplay (unformattedDate) {
  var formattedDate;
  var dateDay;
  var dateMonth;
  var dateYear;

  var month = new Array()
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  dateDay = unformattedDate.getDate();
  dateMonth = month[unformattedDate.getMonth()];
  dateYear = unformattedDate.getFullYear();

  formattedDate = dateDay + ' ' + dateMonth + ' ' + dateYear;
  return formattedDate;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Module Exports
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

module.exports.districtPlacesPage = districtPlacesPage;
module.exports.districtPlacesAction = districtPlacesAction;
module.exports.districtPlacesBreakdownPage = districtPlacesBreakdownPage;
module.exports.districtPlacesBreakdownAction = districtPlacesBreakdownAction;
module.exports.districtPlacesSummaryPage = districtPlacesSummaryPage;
module.exports.viewAllocationsPage = viewAllocationsPage;
module.exports.districtSelectionPage = districtSelectionPage;
module.exports.districtSelectionAction = districtSelectionAction;

// Old profile and weekly profile modules

module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage = districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction = districtWeeklyProfileAction;

