$(function(){
  var $extraOption = $('#extraCaseloadSegmentationOption'),
    $dayOneEvidenceFilter = $('#day-one-evidence-filter'),
    $childAgeFilter = $('#child-age-filter');

  toggleCaseloadSegmentationOptions();
  toggleDayOneEvidenceFilter();
  toggleChildAgeFilter();

  $('#search-caseload').on('click', function(e){
    e.preventDefault();

    var provisionSelected = $('#provision-type').find('option:selected').val(),
      benefitSelected = $('#benefit').find('option:selected').data('type'),
      childAgeSelected = $('#child-age-select').find('option:selected').val(),
      action = 'performance_' + (benefitSelected.toLowerCase() || 'jsa' ) + '?childAge=' + childAgeSelected;

    if(provisionSelected){
      window.location = action + '&provisionSelected';
    } else {
      window.location = action;
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

  function toggleChildAgeFilter(){
    var type = $('#benefit').find('option:selected').data('subtype');

    if(type === 'lone-parent'){
      $childAgeFilter.show();
    } else{
      $childAgeFilter.hide();
    }
  }

  $('#benefit').on('change', function(){
    toggleCaseloadSegmentationOptions();
    toggleDayOneEvidenceFilter();
    toggleChildAgeFilter();
  });
})