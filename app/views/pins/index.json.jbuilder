json.array! @pins do |pin|
  json.id pin.id
  json.name pin.name
  json.description pin.description
  json.image_url pin.image_url
  json.link pin.link

  json.user do
    json.id pin.user_id
    json.name @users[pin.user_id - 1].name
    json.email @users[pin.user_id - 1].email
    json.avatar_url @users[pin.user_id - 1].avatar_url
  end

  json.board do
    json.id pin.board_id
    json.name @boards[pin.board_id - 1].name
  end
end