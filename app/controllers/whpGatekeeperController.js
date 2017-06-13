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
    mandRatio: parseFloat(req.body.mandRatio).toFixed(2),
    volRatio: parseFloat(req.body.volRatio).toFixed(2),
    previousCalcFlag: 0
  };

  req.session.placesData = placesData;
  res.redirect('/latest/gatekeeper/profilePlaces');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District ProfilePlaces Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtProfilePlacesPage (req, res) {
  var sessionPlacesData = req.session.placesData || {};

  let totalWHPPlaces;
  let disWHPPlaces;
  let eagWHPPlaces;
  let ltuWHPPlaces;
  let totalPSCPlaces;
  let disPSCPlaces;
  let eagPSCPlaces;
  let ltuPSCPlaces;
  let disRefsNeeded;
  let eagRefsNeeded;
  let ltuRefsNeeded;
  let totalRefsNeeded;
  let disControlGroup;
  let eagControlGroup;
  let ltuControlGroup;
  let totalControlGroup;
  let totalDisRefs;
  let totalEAGRefs;
  let totalLTURefs;
  let totalRefs;
  let totalCustRefs;
  const mandRatio = sessionPlacesData.mandRatio;
  const volRatio = sessionPlacesData.volRatio;
  let placesData;

  if (sessionPlacesData.previousCalcFlag !== 1) {
    totalWHPPlaces = sessionPlacesData.totalWHPPlaces;
    disWHPPlaces = Math.round((75 / 100) * totalWHPPlaces);
    eagWHPPlaces = Math.round((10 / 100) * totalWHPPlaces);
    ltuWHPPlaces = Math.round((15 / 100) * totalWHPPlaces);
    totalPSCPlaces = sessionPlacesData.totalPSCPlaces;
    disPSCPlaces = Math.round((75 / 100) * totalPSCPlaces);
    eagPSCPlaces = Math.round((10 / 100) * totalPSCPlaces);
    ltuPSCPlaces = Math.round((15 / 100) * totalPSCPlaces);
    disRefsNeeded = Math.round((disWHPPlaces + disPSCPlaces) * volRatio);
    eagRefsNeeded = Math.round((eagWHPPlaces + eagPSCPlaces) * volRatio);
    ltuRefsNeeded = Math.round((ltuWHPPlaces + ltuPSCPlaces) * mandRatio);
    totalRefsNeeded = disRefsNeeded + eagRefsNeeded + ltuRefsNeeded;
    disControlGroup = Math.round(disRefsNeeded / 10);
    eagControlGroup = Math.round(eagRefsNeeded / 10);
    ltuControlGroup = Math.round(ltuRefsNeeded / 10);
    totalControlGroup = disControlGroup + eagControlGroup + ltuControlGroup;
    totalDisRefs = disRefsNeeded + disControlGroup;
    totalEAGRefs = eagRefsNeeded + eagControlGroup;
    totalLTURefs = ltuRefsNeeded + ltuControlGroup;
    totalRefs = totalRefsNeeded + totalControlGroup;
    totalCustRefs = totalDisRefs + totalEAGRefs;
  } else {
    totalWHPPlaces = sessionPlacesData.totalWHPPlaces;
    disWHPPlaces = sessionPlacesData.disWHPPlaces;
    eagWHPPlaces = sessionPlacesData.eagWHPPlaces;
    ltuWHPPlaces = sessionPlacesData.ltuWHPPlaces;
    totalPSCPlaces = sessionPlacesData.totalPSCPlaces;
    disPSCPlaces = sessionPlacesData.disPSCPlaces;
    eagPSCPlaces = sessionPlacesData.eagPSCPlaces;
    ltuPSCPlaces = sessionPlacesData.ltuPSCPlaces;
    disRefsNeeded = sessionPlacesData.disRefsNeeded;
    eagRefsNeeded = sessionPlacesData.eagRefsNeeded;
    ltuRefsNeeded = sessionPlacesData.ltuRefsNeeded;
    totalRefsNeeded = sessionPlacesData.totalRefsNeeded;
    disControlGroup = sessionPlacesData.disControlGroup;
    eagControlGroup = sessionPlacesData.eagControlGroup;
    ltuControlGroup = sessionPlacesData.ltuControlGroup;
    totalControlGroup = sessionPlacesData.totalControlGroup;
    totalDisRefs = sessionPlacesData.totalDisRefs;
    totalEAGRefs = sessionPlacesData.totalEAGRefs;
    totalLTURefs = sessionPlacesData.totalLTURefs;
    totalRefs = sessionPlacesData.totalRefs;
    totalCustRefs = sessionPlacesData.totalCustRefs;
  }

  placesData = {
    totalWHPPlaces: totalWHPPlaces,
    disWHPPlaces: disWHPPlaces,
    eagWHPPlaces: eagWHPPlaces,
    ltuWHPPlaces: ltuWHPPlaces,
    totalPSCPlaces: totalPSCPlaces,
    disPSCPlaces: disPSCPlaces,
    eagPSCPlaces: eagPSCPlaces,
    ltuPSCPlaces: ltuPSCPlaces,
    disRefsNeeded: disRefsNeeded,
    eagRefsNeeded: eagRefsNeeded,
    ltuRefsNeeded: ltuRefsNeeded,
    totalRefsNeeded: totalRefsNeeded,
    disControlGroup: disControlGroup,
    eagControlGroup: eagControlGroup,
    ltuControlGroup: ltuControlGroup,
    totalControlGroup: totalControlGroup,
    totalDisRefs: totalDisRefs,
    totalEAGRefs: totalEAGRefs,
    totalLTURefs: totalLTURefs,
    totalRefs: totalRefs,
    totalCustRefs: totalCustRefs
  };

  res.render('latest/whp-profile-places', placesData);
}

function districtProfilePlacesAction (req, res) {
  var profilePlacesData = req.session.placesData || {};

  let totalWHPPlaces;
  let disWHPPlaces;
  let eagWHPPlaces;
  let ltuWHPPlaces;
  let totalPSCPlaces;
  let disPSCPlaces;
  let eagPSCPlaces;
  let ltuPSCPlaces;
  let disRefsNeeded;
  let eagRefsNeeded;
  let ltuRefsNeeded;
  let totalRefsNeeded;
  let disControlGroup;
  let eagControlGroup;
  let ltuControlGroup;
  let totalControlGroup;
  let totalDisRefs;
  let totalEAGRefs;
  let totalLTURefs;
  let totalRefs;
  let totalCustRefs;
  const mandRatio = profilePlacesData.mandRatio;
  const volRatio = profilePlacesData.volRatio;
  let placesData;

  totalWHPPlaces = profilePlacesData.totalWHPPlaces;
  disWHPPlaces = Math.round((75 / 100) * totalWHPPlaces);
  eagWHPPlaces = Math.round((10 / 100) * totalWHPPlaces);
  ltuWHPPlaces = Math.round((15 / 100) * totalWHPPlaces);
  totalPSCPlaces = profilePlacesData.totalPSCPlaces;
  disPSCPlaces = Math.round((75 / 100) * totalPSCPlaces);
  eagPSCPlaces = Math.round((10 / 100) * totalPSCPlaces);
  ltuPSCPlaces = Math.round((15 / 100) * totalPSCPlaces);
  disRefsNeeded = Math.round((disWHPPlaces + disPSCPlaces) * volRatio);
  eagRefsNeeded = Math.round((eagWHPPlaces + eagPSCPlaces) * volRatio);
  ltuRefsNeeded = Math.round((ltuWHPPlaces + ltuPSCPlaces) * mandRatio);
  totalRefsNeeded = disRefsNeeded + eagRefsNeeded + ltuRefsNeeded;
  disControlGroup = Math.round(disRefsNeeded / 10);
  eagControlGroup = Math.round(eagRefsNeeded / 10);
  ltuControlGroup = Math.round(ltuRefsNeeded / 10);
  totalControlGroup = disControlGroup + eagControlGroup + ltuControlGroup;
  totalDisRefs = disRefsNeeded + disControlGroup;
  totalEAGRefs = eagRefsNeeded + eagControlGroup;
  totalLTURefs = ltuRefsNeeded + ltuControlGroup;
  totalRefs = totalRefsNeeded + totalControlGroup;
  totalCustRefs = totalDisRefs + totalEAGRefs;

  placesData = {
    totalWHPPlaces: totalWHPPlaces,
    disWHPPlaces: disWHPPlaces,
    eagWHPPlaces: eagWHPPlaces,
    ltuWHPPlaces: ltuWHPPlaces,
    totalPSCPlaces: totalPSCPlaces,
    disPSCPlaces: disPSCPlaces,
    eagPSCPlaces: eagPSCPlaces,
    ltuPSCPlaces: ltuPSCPlaces,
    disRefsNeeded: disRefsNeeded,
    eagRefsNeeded: eagRefsNeeded,
    ltuRefsNeeded: ltuRefsNeeded,
    totalRefsNeeded: totalRefsNeeded,
    disControlGroup: disControlGroup,
    eagControlGroup: eagControlGroup,
    ltuControlGroup: ltuControlGroup,
    totalControlGroup: totalControlGroup,
    totalDisRefs: totalDisRefs,
    totalEAGRefs: totalEAGRefs,
    totalLTURefs: totalLTURefs,
    totalRefs: totalRefs,
    totalCustRefs: totalCustRefs,
    previousCalcFlag: 1
  };

  req.session.placesData = placesData;
  res.redirect('/latest/gatekeeper/selection');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Selection Report Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtSelectionPage (req, res) {
  const placesData = req.session.placesData || {};

  const selectionReport = {
    newReferrals: 100,
    placesToFill: placesData.totalCustRefs ? placesData.totalCustRefs : 30
  };

  res.render('latest/whp-selection-report', selectionReport);
}

function districtSelectionAction (req, res) {
  const confirmPlaces = {
    newReferrals: 10,
    placesToFill: 20,
    referralsSelected: 30
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
module.exports.districtProfilePlacesPage = districtProfilePlacesPage;
module.exports.districtProfilePlacesAction = districtProfilePlacesAction;
module.exports.viewAllocationsPage = viewAllocationsPage;
module.exports.districtSelectionPage = districtSelectionPage;
module.exports.districtSelectionAction = districtSelectionAction;

// Old profile and weekly profile modules

module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage = districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction = districtWeeklyProfileAction;

