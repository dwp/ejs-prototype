$(function(){
  var $confirmDeleteRow = $('#confirm-delete'),
    $reopenRow = $('#confirm-reopen');


  $('#deleteClaimantButton').on('click',function(){
    $(this).parent().parent().hide();

    $confirmDeleteRow.show();
  });

  $('#reopenClaimButton').on('click', function(){
    $(this).parent().parent().hide();

    $reopenRow.show();
  });

  $('#cancelDeleteLink').on('click', function(){
    $(this).parent().parent().hide();
    $('#delete-button').show();
  })
})