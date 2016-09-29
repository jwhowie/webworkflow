$(document).ready(function(){

  $('#addToTeam').on('click', function(e){

    e.preventDefault();

    var nextUserId = $('.dynamic').data('latest-user-id') + 1;

    $('.dynamic').data('latest-user-id', nextUserId);


    $('.dynamic').append("<div style='clear: both'><div class='user_specs'><input type='text' name='peers["+nextUserId+"][name]' id='team_users_" + nextUserId + "_name'><input type='text' name='peers[" + nextUserId + "][email]' id='team_users_" + nextUserId + "_email'></div></div>");
  });

});

// <div class="user_specs" data-user-id=0>
//   <%= uf.label :name %>
//   <%= uf.text_field :name, {name: "users[0][name]"} %>
//
// </div>
