$(document).on('turbolinks:load', function(){
  var newButton = 0;


  if (window.location.pathname === "/teams") {
    $.ajax({
      URL: "/teams",
      method: "GET",
      dataType: "json",
      data: {}
    }).done(function(responseData){
    console.log(responseData);
    for (var i = 0; i < responseData.length; i++) {
      var row = $('<tr>').attr('id', responseData[i].id);

      var team = $('<input>').attr('type', 'text').attr('class', 'team-name').val(responseData[i].title);
      var leader = $('<input>').attr('type', 'text').attr('class', 'team-lead').val(responseData[i].name);
      var email = $('<input>').attr('type', 'text').attr('class', 'team-email').attr('id', responseData[i].user_id).val(responseData[i].email);
      var action = $('<button>').attr('id', responseData[i].id).attr('class', 'action_button').html('+');



      row.append($('<td>').append(team));

      row.append($('<td>').append(leader));

      row.append($('<td>').append(email));

      row.append($('<td>').append(action));

      $('tbody').append(row);
    }
    });

  }
    else{
      team = window.location.pathname.split('/')[2];
      $.ajax({
        url: window.location.pathname,
        method: 'GET',
        dataType: 'json',
        data: {}
      }).done(function(responseData){
        console.log(responseData);
        var team = $('<input>').attr('type', 'text').attr('class', 'team-title').attr('id', responseData[0].team_id).val(responseData[0].title);

        $('#team_name').append(team);

        for (var i = 0; i < responseData.length; i++){
          var row = $('<tr>').attr('id', responseData[i].team_user_id);

          var leader = $('<input>').attr('type', 'text').attr('class', 'team-lead').val(responseData[i].name);
          var email = $('<input>').attr('type', 'text').attr('class', 'team-email').attr('id', responseData[i].user_id).val(responseData[i].email);
          var action = $('<button>').attr('id', responseData[i].id).attr('class', 'team_button').html('+');




          row.append($('<td>').append(leader));

          row.append($('<td>').append(email));

          row.append($('<td>').append(action));

          $('tbody').append(row);
        }
      });
    }


 $('tbody').on('click', '.team_button', function(){

   if ( $('.team-title').val() || cells[1].children[0].value || cells[2].children[0].value === 0) {
     console.log('EMPTY CHECK!!!')
   }  ;

   var oldRow = $(this).closest('tr');
   var cells = oldRow.find('td');
   var sendData = {};
   sendData['id'] = oldRow.attr('id');
   sendData['team_title'] = $('.team-title').val();
   sendData['action'] = 2;
   sendData['name'] = cells[1].children[0].value;
   sendData['email'] = cells[2].children[0].value;
   // sendData['user_id'] = cells[2].attr('id');
   $(this).html(' - ');



   $.ajax({
     url: '/teams',
     method: 'POST',
     dataType: 'json',
     data: {user: sendData}
   }).done(function(responseData){
     console.log(responseData);

   });

   console.log(sendData);

   var row = $('<tr>').attr('id', 0);

   var leader = $('<input>').attr('type', 'text').attr('class', 'team-lead');
   var email = $('<input>').attr('type', 'text').attr('class', 'team-email').attr('id', 0);
   var action = $('<button>').attr('id', 0).attr('class', 'team_button').html('+');



     row.append($('<td>').append(leader));

     row.append($('<td>').append(email));

     row.append($('<td>').append(action));

     $('tbody').append(row);


 });

  $('tbody').on('click', '.action_button', function(e) {
    var oldRow = $(this).closest('tr');
    var cells = oldRow.find('td');
    var sendData = {};
    sendData['id'] = oldRow.attr('id');
    sendData['business_process_name'] = '';
    sendData['action'] = 1;
    sendData['title'] = cells[0].children[0].value;
    sendData['name'] = cells[1].children[0].value;
    sendData['email'] = cells[2].children[0].value;
    // sendData['user_id'] = cells[2].attr('id');
    $(this).html(' - ');



    $.ajax({
      url: '/teams',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      method: 'POST',
      dataType: 'json',
      data: {team: sendData}

    }).done(function(responseData){
      console.log(responseData);

    });


    console.log(sendData);

    var row = $('<tr>').attr('id', 0);

    var team = $('<input>').attr('type', 'text').attr('class', 'team-title');
    var leader = $('<input>').attr('type', 'text').attr('class', 'team-lead');
    var email = $('<input>').attr('type', 'text').attr('class', 'team-email').attr('id', 0);
    var action = $('<button>').attr('id', 0).attr('class', 'action_button').html('+');


      row.append($('<td>').append(team));

      row.append($('<td>').append(leader));

      row.append($('<td>').append(email));

      row.append($('<td>').append(action));

      $('tbody').append(row);


  });

  // $('#addToTeam').on('click', function(e){
  //
  //   e.preventDefault();
  //
  //   var nextUserId = $('.dynamic').data('latest-user-id') + 1;
  //
  //   $('.dynamic').data('latest-user-id', nextUserId);
  //
  //
  //   var nextButton = $('.dynamic').data('remove-button-id') + 1;
  //
  //   $('.dynamic').data('remove-button-id', nextButton);
  //
  //   newButton = newButton +1;
  //
  //   $('.dynamic').append("<div style='clear: both'><div class='user_specs' data-remove-button-id=0><input type='text' name='peers["+nextUserId+"][name]' id='team_users_" + nextUserId + "_name'><input type='text' name='peers[" + nextUserId + "][email]' id='team_users_" + nextUserId + "_email'><input type='button' id='removeFromTeam" + newButton.toString() + "'/></div></div>");
  //
  //   $('#removeFromTeam'+newButton).on('click', function(e2){
  //     console.log('im happening')
  //     e2.preventDefault();
  //
  //
  //     $(this).parent().remove();
  //   });
  // });


});
