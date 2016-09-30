var provision = (function(){
	var startDateInputs, 
		endDateInputs,  
		endDateLabels, 
		statusStatusInputs, 
		statusStatusLabels,
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
		statusStatusInputs = $('#start-status-group').find('input');
		statusStatusLabels = $('#start-status-group').find('label');
		outcomeInputs = $('#outcome-group').find('input');
		outcomeLabels = $('#outcome-group').find('label');

		//setStartDateStatus();

		startDateInputs.on('blur', setStartDateStatus);
		//endDateInputs.on('blur', setStartDateStatus);

		statusStatusInputs.on('click', setEndDateStatus)
	}

	/*
	* setStartDateStatus - based on the current selection determine and set the status start date radio buttons
	*/
	function setStartDateStatus(){
		var startDay = startDateInputs[0],
			startMonth = startDateInputs[1],
			startYear = startDateInputs[2],
			endDay = endDateInputs[0],
			endMonth = endDateInputs[1],
			endYear = endDateInputs[2];

		// if start date is invalid then set the start date status radio buttons to invalid
		if(isValidDate(startDateInputs)){
			statusStatusInputs.prop('disabled', false);
			statusStatusLabels.removeClass('disabled');
		} else {
			statusStatusInputs.prop('disabled', true);
			statusStatusLabels.addClass('disabled');
		}
	}

	/*
	* setEndDateStatus - based on the current selection determine and set the status start date radio buttons
	*/
	function setEndDateStatus(){
		var checkedValue = $('input[name=start-status]:checked').val();

		if(checkedValue === 'did-not-start'){
			//disable end date inputs and outcome options
			endDateInputs.prop('disabled', true);
			endDateInputs.addClass('disabled');
			endDateLabels.addClass('disabled');
			outcomeInputs.prop('disabled', true);
			outcomeLabels.addClass('disabled');
		} else {
			endDateInputs.prop('disabled', false);
			endDateLabels.removeClass('disabled');
			endDateInputs.removeClass('disabled');
			outcomeInputs.prop('disabled', false);
			outcomeLabels.removeClass('disabled');
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