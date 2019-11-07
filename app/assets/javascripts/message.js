$(function() {
  function buildHTML(message){
    var insertImage = message.image_url?
    `<img src="${message.image_url}">,class='image__message'>`:"";
    var html = `<div class='chat-part' data-id="${message.id}">
                <div class='chat-body__name'>
                ${message.name}
                </div>
                <div class='chat-body__time'>
                ${message.created_at}
                </div>
                <div class='message__content'>
                ${message.content}
                ${insertImage}
                </div>
                </div>`;
    return html;
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

  
});


if (message.image_url) {
        insertImage = `<img src="${message.image_url}">`;
      }
  