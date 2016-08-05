function displayCorrectCohortInputType(){
	var allSelected = $('#organisations-filter input:eq(0)').filter(':checked').length;
	var numberOfWorkcoachesSelected = $('#organisations-filter input:gt(0)').filter(':checked').length;

	var cohortMonthInputType = numberOfWorkcoachesSelected > 1 ? 'Single' : 'Multi';
	cohortMonthInputType = allSelected ? 'Single' : cohortMonthInputType;

	$('#cohortMonthMulti,#cohortMonthSingle').hide();
	$('#cohortMonth' + cohortMonthInputType).show();
}


$(function(){
	displayCorrectCohortInputType();

	$('#organisations-filter input[type="checkbox"]').on('click', function(){
		displayCorrectCohortInputType();
	});
})