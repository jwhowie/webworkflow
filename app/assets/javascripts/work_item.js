$(document).on('turbolinks:load', function(){
  var selectedRow = '';
  var customerId = ''


  var id = '';
  if (window.location.pathname.split('/')[1] === "work_items") {

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
      $('#queue-body').empty();
      for(var i = 0; i < responseData.length; i++)
      {
        var body = $('#queue-body');
        var row = $('<tr>').attr('id', responseData[i].id);
        var moved = $('<td>').attr('class', 'table-col').html(responseData[i].moved_to_queue);

        var created = $('<td>').attr('class', 'table-col').html(responseData[i].created_at);
        var team = $('<td>').attr('class', 'table-col').html(responseData[i].title);
        var stepName = $('<td>').attr('class', 'table-col').html(responseData[i].step_name);
        var customerInfo = $('<td>').attr('class', 'table-col').html(responseData[i].contact_info);
        var assigned =  $('<td>').attr('class', 'table-col').html(responseData[i].name);
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
      cust.append($('<div>').attr('id', responseData[0].step_number)
           .attr('class', 'customer-info-content')
           .html(responseData[0].name));
      cust.append($('<div>')
            .attr('class', 'customer-info-content')
            .html(responseData[0].address_1));
      cust.append($('<div>')
            .attr('class', 'customer-info-content')
            .html(responseData[0].address_2));
      cust.append($('<div>')
            .attr('class', 'customer-info-content')
            .html(responseData[0].city));
      cust.append($('<div>')
            .attr('class', 'customer-info-content')
            .html(responseData[0].phone));

      cust.append($('<div>')
            .attr('class', 'customer-info-content')
            .html(responseData[0].email));

      var hist = $('#queue-history')
            .attr('class', 'customer-info-content')
            .val(responseData[0].history_text);
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





  $('#queue-escalate').on('click', function(){
    if($('#queue-comment').val === '') {
      return;
    }
    var pair = window.location.search.split('=')
    if (pair[0] === "")
    {
      saveComments(2);
    }
    else {
    //  post Comments(2);
    }
  });

  $('#queue-forward').on('click', function(){
    if($('#queue-comment').val === '') {
      return;
    }
    var pair = window.location.search.split('=')
    if (pair[0] === "")
    {
      saveComments(3);
    }
    else {
    //  post Comments(3);
    //  window.location.href = '/work_items';
    }
  });

  $('#queue-save').on('click', function(){
    if($('#queue-comment').val === '') {
      return;
    }
    var pair = window.location.search.split('=')
    if (pair[0] === "")
    {
      saveComments(4);
    }
    else {

    //  post Comments(4);
      window.location.href = '/work_items';
    }
  });

  $('#work-item-cancel').on('click', function(){
    window.location.href = '/work_items';
  });

  $('#myModal').on('click', '#save-customer', function(){
    $('.new_customer').submit();
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

});
