$(document).ready(function(){
  var newButton = 0;

  $('#addToTeam').on('click', function(e){

    e.preventDefault();

    var nextUserId = $('.dynamic').data('latest-user-id') + 1;

    $('.dynamic').data('latest-user-id', nextUserId);


    var nextButton = $('.dynamic').data('remove-button-id') + 1;

    $('.dynamic').data('remove-button-id', nextButton);

    newButton = newButton +1;

    $('.dynamic').append("<div style='clear: both'><div class='user_specs' data-remove-button-id=0><input type='text' name='peers["+nextUserId+"][name]' id='team_users_" + nextUserId + "_name'><input type='text' name='peers[" + nextUserId + "][email]' id='team_users_" + nextUserId + "_email'><input type='button' id='removeFromTeam" + newButton.toString() + "'/></div></div>");

    $('#removeFromTeam'+newButton).on('click', function(e2){
      console.log('im happening')
      e2.preventDefault();


      $(this).parent().remove();
    });
  });


});
