$(function() {
  function buildHTML(message){
    
    if (message.image.url != null){
    var html =
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
                <img src=${message.image.url} >
            </div>`
    return html;
    
    } else {
      var html = 
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
      return html;
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
      $('.js-form')[0].reset();
      $('.chat-parts').animate({scrollTop: $(".chat-parts")[0].scrollHeight}, 1500);
    })
    .fail(function(){
      alert("失敗しました")
    })
    .always(function(){
      $('.form__submit').prop("disabled",false);
    });
    return false; 
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.chat-part').eq(-1).data("messageid");
      
      //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      
      // var group_id = $(".group").data("group-id");
      
      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
      
        var insertHTML = '';//追加するHTMLの入れ物を作る
       
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        })
        $('.chat-parts').append(insertHTML);//メッセージを追加
        //$('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        console.log('error');//ダメだったらアラートを出す
      });
    }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
})



