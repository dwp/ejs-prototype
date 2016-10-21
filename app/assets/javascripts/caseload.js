$(function(){
	$('#search-caseload').on('click', function(e){
		e.preventDefault();

		var provisionSelected = $('#provision-type').find('option:selected').val();

		if(provisionSelected){
			window.location = 'performance_jsa?provisionSelected=true'
		} else {
			window.location = 'performance_jsa'
		}
	})	
})