# == Schema Information
#
# Table name: boards
#
#  id                :integer          not null, primary key
#  description       :text
#  privacy_attribute :integer          default(0), not null # 0 public, 1 friends, 2 custom users, 3 custom groups
#  name              :string(255)      not null
#  image_url         :string(255)      not null
#  user_id           :integer          not null
#  created_at        :datetime
#  updated_at        :datetime
#

class Board < ActiveRecord::Base
  attr_accessible :description, :privacy_attribute, :name, :image_url, :user_id

  validates :image_url,  
    :presence => true

  validates :name,  
    :presence => true,
    :uniqueness => {:scope => :user_id}

  validates :user_id,  
    :presence => true

  has_many :pins, :dependent => :destroy

  belongs_to :user
end
