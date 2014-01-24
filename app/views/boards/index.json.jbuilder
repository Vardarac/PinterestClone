json.array! @boards do |board|
  json.id board.id
  json.image_url board.image_url
  json.name board.name

  json.user do
    json.id board.user_id
    json.email @users[board.user_id - 1][:email]
    json.name @users[board.user_id - 1][:name] if @users[board.user_id][:name]
    json.avatar_url @users[board.user_id - 1][:avatar_url]
  end 

  select_pins = []

  @pins.each do |pin|
    if pin.board_id == board.id && select_pins.length < 4
      select_pins << pin
    end
  end

  json.pins do
    json.array! select_pins do |pin|
      json.id pin.id
      json.name pin.name
      json.image_url pin.image_url
    end
  end
end