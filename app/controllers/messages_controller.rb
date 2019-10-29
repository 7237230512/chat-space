class MessagesController < ApplicationController
  def index
  end

  def create
  end

  private

  def message_params
    params.require(:message).permit(:body, :image)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
