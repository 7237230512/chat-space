$(function() {
  function buildHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class='chat-part' data-id="${message.id}">
                  <div class='chat-body__name'>
                    ${message.name}
                  </div>
                  <div class='chat-body__time'>
                    ${message.created_at}
                  </div>
                  <div class='message'>
                    ${message.content}
                    ${insertImage}
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e) {
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

    .done(function(message) {
      var html = buildHTML(message);
      console.log(html)
      $('.chat-parts').append(html)
      $('#message_content').val('')
      $('.chat-parts').animate({scrollTop: $(".chat-parts")[0].scrollHeight}, 1500);
    })
    .fail(function() {
      alert('メッセージの送信に失敗しました');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);　//ここで解除
    })
  })

  function scroll() {
    $('.chat-parts').animate({scrollTop: $('.chat-parts')[0].scrollHeight}, 'fast')
  }

  var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: location.href.json,
      type: 'GET',
      dataType: 'json'
    })

    .done(function(json) {
      var last_message_id = $('.chat-part:last').data('id');
      var insertHTML = '';
      json.messages.forEach(function(message) {
        if (message.id > last_message_id ) {
          insertHTML += buildHTML(message);
        }
      });
      $('.chat-parts').append(insertHTML);
    scroll()
    })

    .fail(function() {
      alert('自動更新に失敗しました');
    });
    } else {
    clearInterval(interval);
   }} , 5 * 1000 );
});