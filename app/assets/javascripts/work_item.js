$(document).on('turbolinks:load', function(){

  if (window.location.pathname.split('/')[1] === "work_items") {
    var customerId = ''
    $('#autocomplete').autocomplete({
      source: function(request, response){
        console.log(request);
        $.ajax({
          url: '/customers?term='+request['term'],
          method: 'GET',
          dataType: 'json',
          data: {}

        }).done(function(responseData){
          var result = [];
          var customer = ''
          for(var i = 0; i < responseData.length; i++){
            customer = ''
            customer = responseData[i].first_name + ' ';
            customer += responseData[i].last_name + ' ';
            customer += responseData[i].address_1 + ' ';
            customer += responseData[i].phone;
            result.push({label:customer, value:responseData[i].id});
          }

          response(result);

          console.log(response);
        })
      },
      select: function (suggestion, ui) {
        event.preventDefault();
        customerId = ui.item.value;
        this.value = ui.item.label;
        return false;
        // $('#autocomplete').val(ui.itme.label);
        // PK.render(ui.item.value);
      // some function here
      console.log(suggestion);
      },
      focus: function(event, ui) {
        event.preventDefault();
        $("#autocomplete").val(ui.item.label);
    }
    });

    var selectedRow = '';
    var id = '';
    // $('button').prop('disabled', true);
    // $('button').css('color', 'grey');
    loadTable();

 }

 $(window).on("beforeunload", function() {
   window.clearTimeout(window.timer);

});

  function loadTable(){
    $.ajax({
      url: '/work_items',
      method: 'GET',
      dataType: 'json',
      data: {}
    }).done(function(responseData){
      var firstRow;
      for(var i = 0; i < responseData.length; i++)
      {
        var body = $('#queue-body');
        var row = $('<tr>').attr('id', responseData[i].id);
        var moved = $('<td>').html(responseData[i].moved_to_queue);
        var created = $('<td>').html(responseData[i].created_at);
        var team = $('<td>').html(responseData[i].title);
        var stepName = $('<td>').html(responseData[i].step_name);
        var customerInfo = $('<td>').html(responseData[i].contact_info);
        var assigned =  $('<td>').html(responseData[i].name);
        row.append(moved);
        row.append(created);
        row.append(team);
        row.append(stepName);
        row.append(customerInfo);
        row.append(assigned);
        body.append(row);
        if(i === 0)
        {
          firstRow = row;
        }
      }

      if (id != '' && $('#'+id).length){
        var lastRow = $('#'+id);
        var comment = $('#queue-comment').val()
        lastRow.trigger('click');
        $('#queue-comment').val(comment);
      }
      else {
        firstRow.trigger('click');
      }

      });
      window.timer = window.setTimeout(loadTable, 10000);
    }


  $('#queue_table').on('click', 'tr', function(){
    selectedRow = $(this);
    id = selectedRow.attr('id');
    // $('button').prop('disabled', false);
    // $('button').css('color', 'black');
    $('tr').css('background-color', '');
    selectedRow.css('background-color', 'aqua');
    $.ajax({
      url: '/work_items/' + selectedRow.attr('id') + '/edit',
      method: 'GET',
      dataType: 'json',
      data: {}
    }).done(function(responseData){
      console.log(responseData);
      cust = $('#customer-info');
      cust.empty();
      cust.append($('<div>').attr('id', responseData[0].step_number).html(responseData[0].name));
      cust.append($('<div>').html(responseData[0].address_1));
      cust.append($('<div>').html(responseData[0].address_2));
      cust.append($('<div>').html(responseData[0].city));
      cust.append($('<div>').html(responseData[0].phone));
      cust.append($('<div>').html(responseData[0].email));

      var hist = $('#queue-history').val(responseData[0].history_text);
      if(responseData[0].step_number == '1') {
         $("#queue-back").prop("disabled", true)//.removeClass('btn-primary').addClass('btn-disabled');
      }
      else {
        $("#queue-back").prop("disabled", false)//.removeClass();
      }
      //var comment = $('#queue-comment');
      //$('#queue-comment').val('');

    });
  });
  $('#queue-back').on('click', function(){
    saveComments(1);

  });

  function saveComments(action){
    var comment = $('#queue-comment');
    if(comment.val() === '') {
      return;
    }
    var sendData = {};
    sendData['action'] =  action;
    sendData['comment'] = comment.val();
    sendData['work_item_key'] = selectedRow.attr('id');
    console.log(sendData);
    $.ajax({
       url: '/work_items/' + selectedRow.attr('id'),
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      method: 'PATCH',
      dataType: 'json',
      data: {work_item: sendData}
    }).done(function(){
      $('#queue-body').empty();
      loadTable();
    });

  }

  function postComments(action){
    var pair = window.location.search.split('=')

    var comment = $('#queue-comment');
    if(comment.val() === '') {
      return;
    }
    var sendData = {};
    sendData['action'] =  action;
    sendData['comment'] = comment.val();
    sendData['processKey'] = pair[1];
    sendData['customer'] = customerId
    console.log(sendData);
    $.ajax({
       url: '/work_items/',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      method: 'POST',
      dataType: 'json',
      data: {work_item: sendData}
    }).done(function(){
      $('#queue-body').empty();
      loadTable();
    });

  }

  $('#queue-escalate').on('click', function(){
    if($(comment).val === '') {
      return;
    }
    var pair = window.location.search.split('=')
    if (pair[0] === "")
    {
      saveComments(2);
    }
    else {
      postComments(2);
    }
  });

  $('#queue-forward').on('click', function(){
    if($(comment).val === '') {
      return;
    }
    var pair = window.location.search.split('=')
    if (pair[0] === "")
    {
      saveComments(3);
    }
    else {
      postComments(3);
      window.location.href = '/work_items';
    }
  });

  $('#queue-save').on('click', function(){
    if($(comment).val === '') {
      return;
    }
    var pair = window.location.search.split('=')
    if (pair[0] === "")
    {
      saveComments(4);
    }
    else {

      postComments(4);
      window.location.href = '/work_items';
    }
  });

  $('#work-item-cancel').on('click', function(){
    window.location.href = '/work_items';
  });

  $('#myModal').on('click', '#save-customer', function(){
    $('.new_customer').submit();
  });

});
