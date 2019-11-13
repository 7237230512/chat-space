$(function() {
  function buildHTML(message){
    if (message.image){
    var html =
      `<div class="chat-part" data-message-id="${message.id}">
        <div class="chat-body">
          <div class='chat-body__name'>
            ${message.user_name}
          </div>
          <div class='chat-body__time'>
            ${message.create_at}
          </div>
        </div>
        <div class='message'>
          <p class = 'message__content'>
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
    return html;
    
    } else {
      var html = 
      `<div class="chat-part" data-messageid=${message.id}>
        <div class="chat-body">
            <div class="chat-body__name">
            ${message.user_name}
            </div>
            <div class="chat-body__time">
            ${message.created_at}
            </div>
        </div>
        <div class="message">
          <p class="message__content">
          ${message.content}
          </p>
        </div>
      </div>`
    return html;
    };
  }


  $('.js-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-parts').append(html)
      $('js-form').val('')
      $('.chat-parts').animate({scrollTop: $(".chat-parts")[0].scrollHeight}, 1500);
  });
})
})

//   var interval = setInterval(function() {
//       if (window.location.href.match(/\/groups\/\d+\/messages/)) {
//     $.ajax({
//       url: location.href.json,
//       type: 'GET',
//       dataType: 'json'
//     })

//     .done(function(json) {
//       var last_message_id = $('.chat-part:last').data('id');
//       var insertHTML = '';
//       json.messages.forEach(function(message) {
//         if (message.id > last_message_id ) {
//           insertHTML += buildHTML(message);
//         }
//       });
//       $('.main-content__chat-contents').append(insertHTML);
//     })

//     .fail(function(json) {
//       alert('自動更新に失敗しました');
//     });
//     } else {
//     clearInterval(interval);
//    }} , 5 * 1000 );
// });

