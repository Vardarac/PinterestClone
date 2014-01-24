json.array! @pins do |pin|
  json.id pin.id
  json.description pin.description
  json.image_url pin.image_url

  json.user do
    user.id = pin.user_id
  end
end