// When 'add another commitment' button is clicked, show another set of fields for action input data by unhiding the next
// hidden action div.

$('#add-button').click(function(e){
  e.preventDefault()
  $('.js-hidden').first().removeClass('js-hidden');
});

// If claimant has not yet had a Work Capability Assessment, all actions are Voluntary, so hide the voluntary or mandatory
// radio buttons for each commitment action

$("[id='pre-wca']").click(function(){
  $("[id^='volOrMandOptions-']").hide();
});

// If claimant has had a Work Capability Assessment, actions can be either voluntary or mandatory, so show the voluntary
// or mandatory radio buttons for each commitment action

$("[id='post-wca']").click(function(){
  $("[id^='volOrMandOptions-']").show();
});
