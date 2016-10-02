var provision = (function(){
	var startDateInputs, 
		endDateInputs,  
		endDateLabels, 
		startStatusInputs, 
		startStatusLabels,
		didNotStartInput,
		outcomeInputs,
		outcomeLabels;

	/*
	* init - set up the provision object
	*/
	function init(){
		startDateInputs = $('#start-date-group').find('input');
		endDateInputs = $('#end-date-group').find('input');
		endDateLabels = $('#end-date-group').find('label');
		startStatusInputs = $('#start-status-group').find('input');
		startStatusLabels = $('#start-status-group').find('label');
		outcomeInputs = $('#outcome-group').find('input');
		outcomeLabels = $('#outcome-group').find('label');

		setStartDateState();
		setEndDateState();
		setOutcomeStatusState();

		startDateInputs.on('blur', setStartDateState);
		endDateInputs.on('blur', setOutcomeStatusState);

		startStatusInputs.on('click', setEndDateState)
	}

	/*
	* setStartDateState - based on the current selection determine and set the status start date radio buttons
	*/
	function setStartDateState(){
		var startDay = startDateInputs[0],
			startMonth = startDateInputs[1],
			startYear = startDateInputs[2],
			endDay = endDateInputs[0],
			endMonth = endDateInputs[1],
			endYear = endDateInputs[2];

		// if start date is invalid then set the start date status radio buttons to invalid
		if(isValidDate(startDateInputs)){
			startStatusInputs.prop('disabled', false);
			startStatusLabels.removeClass('disabled');
		} else {
			startStatusInputs.prop('disabled', true);
			startStatusLabels.addClass('disabled');
		}
	}

	/*
	* setEndDateState - based on the current selection determine and set the status start date radio buttons
	*/
	function setEndDateState(){
		var checkedValue = $('input[name=start-status]:checked').val();

		if(checkedValue !== 'confirmed'){
			//disable end date inputs and outcome options
			endDateInputs.val('');
			setOutcomeStatusState()
			endDateInputs.prop('disabled', true);
			endDateInputs.addClass('disabled');
			endDateLabels.addClass('disabled');
		} else {
			endDateInputs.prop('disabled', false);
			endDateLabels.removeClass('disabled');
			endDateInputs.removeClass('disabled');
		}

	}

	/*
	* setOutcomeStatusState 
	*/
	function setOutcomeStatusState(){
		// If the end date is valid then enabel the outcome status inputs and labels
		if(isValidDate(endDateInputs)){
			outcomeInputs.prop('disabled', false);
			outcomeLabels.removeClass('disabled');
		} else{
			outcomeInputs.prop('disabled', true);
			outcomeLabels.addClass('disabled');
		}
	}

	/*
	* isValidDate - simple check 
	*/
	function isValidDate(dateInputs){
		// for the purposes of the prototype if all the inputs have a length then a date is valid
		return (dateInputs[0].value.length &&  dateInputs[1].value.length  && dateInputs[2].value.length )
	}

	return {
		init : init
	}
})();


$(function(){

	//set up the provision page
	provision.init();

});