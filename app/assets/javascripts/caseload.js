$(function(){
  var $extraOption = $('#extraCaseloadSegmentationOption');
  var $dayOneEvidenceFilter = $('#day-one-evidence-filter')

  toggleCaseloadSegmentationOptions();
  toggleDayOneEvidenceFilter();

  $('#search-caseload').on('click', function(e){
    e.preventDefault();

    var provisionSelected = $('#provision-type').find('option:selected').val();

    if(provisionSelected){
      window.location = 'performance_jsa?provisionSelected'
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

  function toggleDayOneEvidenceFilter(){
    var type = $('#benefit').find('option:selected').data('type');

    if(type === 'JSA'){
      $dayOneEvidenceFilter.show();
    } else{
      $dayOneEvidenceFilter.hide();
    }
  }

  $('#benefit').on('change', function(){
    toggleCaseloadSegmentationOptions();
    toggleDayOneEvidenceFilter();
  });
})