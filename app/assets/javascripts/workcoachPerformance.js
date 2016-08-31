var workcoachPerformance = (function(){

	/*
	* displayCorrectCohortInputType - determine the correct cohort to display.   
	* Based on number of workcoaches selected and the benefit
	*/
	function displayCorrectCohortInputType(){
		var allSelected = $('#organisations-filter input:eq(0)').filter(':checked').length;
		var numberOfWorkcoachesSelected = $('#organisations-filter input:gt(0)').filter(':checked').length;

		var cohortMonthInputType = numberOfWorkcoachesSelected > 1 ? 'Single' : 'Multi';
		cohortMonthInputType = allSelected ? 'Single' : cohortMonthInputType;

		var numberOfCohorts = $('#benefit option:selected').data('numberOfCohorts');

		$('[data-type="cohortInput"]').hide();

		var selectorInput = '#cohortMonth' + cohortMonthInputType + 'Previous' + numberOfCohorts;

		$(selectorInput).show();
	}

	/*
	* toggleSearchButton
	*/
	function toggleSearchButton(){
		var disabledStatus = !$('[data-type="cohortInput"]:visible').length;

		$('#searchButton').prop('disabled', disabledStatus);
	}

	/*
	* clearFilter - clears the inputs
	*/
	function clearFilter(){
		// reset selects and 
		$('select').find('option:eq(0)').prop('selected', true)

		//reset check boxes
		$('input[type="checkbox"').prop('checked', false);		
	}

	/*
	* updatePageStatus - determine which cohort to display, if any and the status of the search button
	*/
	function updatePageStatus(){
		displayCorrectCohortInputType();
		toggleSearchButton();
	}

	return {
		updatePageStatus: updatePageStatus,
		clearFilter: function(){
			clearFilter();
			displayCorrectCohortInputType();
		}
	}
})();


$(function(){
	// On page load determine the correct coher, if any, to displasy
	workcoachPerformance.updatePageStatus();

	// When select a work coach then determine the correct cohort to display 
	$('#organisations-filter input[type="checkbox"]').on('click',workcoachPerformance.updatePageStatus);

	// When we change the benefit type then determine the correct cohort to show
	$('#benefit').on('change',workcoachPerformance.updatePageStatus)

	// Clear a filter
	$('#clearFilter').on('click', workcoachPerformance.clearFilter)
});