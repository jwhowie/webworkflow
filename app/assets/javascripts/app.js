
$(document).on('turbolinks:load', function(){
  $("#workItemModal").on('shown.bs.modal', function () {
    window.customerId = ''
    $('#autocompleted').autocomplete({
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
        window.customerId = ui.item.value;
        this.value = ui.item.label;
        return false;
        // $('#autocomplete').val(ui.itme.label);
        // PK.render(ui.item.value);
      // some function here
      console.log(suggestion);
      },
      focus: function(event, ui) {
        event.preventDefault();
        $("#autocompleted").val(ui.item.label);
    },
    appendTo : "#autoCompleteParentWorkItem"
    });


    $('#queue-forward-modal').on('click', function(){
      var comment = $('#queue-comment-modal');
      if($(comment).val === '') {
        return;
      }

        postComments(3);
        $('#workItemModal').modal('hide');
        //window.location.href = '/work_items';
      });
    });

    $('#work-item-cancel').on('click', function(){

      window.location.href = '/work_items';
    });

    function postComments(action){
      var pair = window.location.search.split('=')
      var business_processes_id =   $('#workItemModal').data('business-process-id');

      var comment = $('#queue-comment-modal');
      if(comment.val() === '') {
        return;
      }
      var sendData = {};
      sendData['action'] =  action;
      sendData['comment'] = comment.val();
      sendData['processKey'] = pair[1];
      sendData['customer'] = window.customerId
      sendData['business_processes_id'] = business_processes_id;
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
  //});



  console.log('page loaded');
  $.ajax({
    url: '/business_processes',
    method: 'GET',
    dataType: 'json',
    data: {}

  }).done(function(responseData){
    console.log(responseData);
    var menuPlaceHolder = $('#dynamic-items');
    for(var i = 0; i < responseData.length; i++) {
      listItem = $('<li>').attr('role', 'presentation');

        href = ($('<a>'))
        .attr('href', '/work_items/new?business=' + responseData[i].id)
        .attr('role', 'menuitem')
        .attr('tabindex', '-1')
        .attr('data-remote', true)
        .attr('data-target', '#workItemModal')
        .attr('class', 'dynamic-menu-item')
        .data('business-process-id', responseData[i].id)
        .html(responseData[i].title);

        listItem.append(href);
        listItem.insertAfter(menuPlaceHolder);
        //$('#workItemModal').data('business-process-id', responseData[i].id);
        // $('.dropdown-toggle').dropdown();
    }
  });

  $('li').on('click', '.dynamic-menu-item', function(){
    var process_id = $(this).data('business-process-id');
      $('#workItemModal').data('business-process-id', process_id);

  });

});
