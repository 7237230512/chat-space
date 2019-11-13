json.messages @messages.each do |message|
  json.name        message.user.name
  json.created_at  message.created_at
  json.image       message.image
  json.id          message.id
  json.content      message.content
  json.date         message.created_at.strftime("%Y/%m/%d %H:%M")
end