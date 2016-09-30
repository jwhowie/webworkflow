$(document).ready(function(){

  $('#addToTeam').on('click', function(e){

    e.preventDefault();

    var nextUserId = $('.dynamic').data('latest-user-id') + 1;

    $('.dynamic').data('latest-user-id', nextUserId);


    $('.dynamic').append("<div style='clear: both'><div class='user_specs'><input type='text' name='peers["+nextUserId+"][name]' id='team_users_" + nextUserId + "_name'><input type='text' name='peers[" + nextUserId + "][email]' id='team_users_" + nextUserId + "_email'><button id='removeFromTeam'>-</button></div></div>");
  });

  $('#removeFromTeam').on('click', function(e2){

    e2.preventDefault();

    var lastUserId = $('.user_specs');

    $('.dynamic').remove("<div style='clear: both'><div class='user_specs'><input type='text' name='peers["+nextUserId+"][name]' id='team_users_" + nextUserId + "_name'><input type='text' name='peers[" + nextUserId + "][email]' id='team_users_" + nextUserId + "_email'></div></div>");
  });
});
