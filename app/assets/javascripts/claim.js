(function(){
  var $saveClaimButton = $('#save-claim-button');

  $saveClaimButton.on('click', function(e){
    var nextPage =  $saveClaimButton.attr('href'),
     queryString = '';

    if( $('#processed-day').val().length && $('#processed-month').val().length && $('#processed-year').val().length){
      queryString += 'dateProcessed=1';
    }

    if( $('#received-day').val().length && $('#received-month').val().length && $('#received-year').val().length){
      queryString += 'dateReceived=1';
    }

    e.preventDefault();

    window.location = queryString.length ? nextPage + '?' + queryString : nextPage;
  })
})();