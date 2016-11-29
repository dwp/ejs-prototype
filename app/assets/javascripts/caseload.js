$(function(){
  var $extraOption = $('#extraCaseloadSegmentationOption');

  toggleCaseloadSegmentationOptions();

  $('#search-caseload').on('click', function(e){
    e.preventDefault();

    var provisionSelected = $('#provision-type').find('option:selected').val();

    if(provisionSelected){
      window.location = 'performance_jsa?provisionSelected=true'
    } else {
      window.location = 'performance_jsa'
    }
  });

  function toggleCaseloadSegmentationOptions(){
    var type = $('#benefit').find('option:selected').data('type');

    if(type === 'IS' || type === 'ESA'){
      $extraOption.show()
    } else {
      $extraOption.hide()
    }
  }

  $('#benefit').on('change', toggleCaseloadSegmentationOptions);
})