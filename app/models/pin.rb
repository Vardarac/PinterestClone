# == Schema Information
#
# Table name: pins
#
#  id          :integer          not null, primary key
#  description :text
#  name        :string(255)      not null
#  hidden      :integer          default(0)
#  link        :string(255)
#  image_url   :string(255)      not null
#  board_id    :integer          not null
#  user_id     :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Pin < ActiveRecord::Base
  validates :name,
    :presence => true,
    :uniqueness => {:scope => :board_id}

  validates :image_url, 
    :presence => true

  validates :link, 
    :length => {:minimum => 1},
    :allow_blank => true

  validates :board_id, 
    :presence => true

  belongs_to :board
  belongs_to :user
end
