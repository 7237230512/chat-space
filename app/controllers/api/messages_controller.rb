class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    group = Group.find(params[:group_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:last_id].to_i
    puts last_message_id
    # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
  end
end


#class Api::MessagesController < ApplicationController
  #def index
    #@group = Group.find(params[:group_id]) #今いるグループの情報をパラムスの値を元にDBから取得。
    #@messages = @group.messages.includes(:user).where('id > ?', params[:last_id]) #グループが所有しているメッセージの中から、params[:last_id]よりも大きいidがないかMessageから検索して、@messagesに代入。
  #end
#end