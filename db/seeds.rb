# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# == Schema Information
#
# Table name: boards
#
#  id                :integer          not null, primary key
#  description       :text
#  privacy_attribute :integer          default(0), not null
#  name              :string(255)      not null
#  image_url         :string(255)      not null
#  user_id           :integer          not null
#  created_at        :datetime
#  updated_at        :datetime
#

rootAdmin = User.new()
rootAdmin.name = "Admin"
rootAdmin.password = "hehehe"
rootAdmin.description = ":D"
rootAdmin.email = "swensonsd@gmail.com"
rootAdmin.site_permissions = 1500
rootAdmin.save!

steve = User.new()
steve.name = "Steve! :D"
steve.password = "password"
steve.description = "Hi! I'm Steve!\n\nProtector of all that is good!"
steve.email = "Steve@Ste.ve"
steve.site_permissions = 1000
steve.save!

ned = User.new()
ned.name = "Ned Ruggeri"
ned.password = "wuhaha"
ned.description = ""
ned.email = "ruggeri@appacademy.io"
ned.site_permissions = 1000
ned.avatar_url = "http://www.appacademy.io/assets/site/staff/ned-ruggeri-136055ae63e7b9b88cc5ad4186b096bb.jpg"
ned.save!

mod = User.new()
mod.name = "Mod"
mod.password = "garbanzo"
mod.description = ":D"
mod.email = "mod@m.od"
mod.site_permissions = 500
mod.save!

banned_user = User.new()
banned_user.name = "Jackass"
banned_user.password = "bitch_tits"
banned_user.description = "Admin is a huge donkey behind!"
banned_user.email = "lol69@yousuck.com"
banned_user.site_permissions = -1
banned_user.save!

includedNames = []
includedSizes = []
boards = []

birds = Board.new();
birds.description = "Birds go here!"
birds.name = "Birds"
birds.image_url = "http://upload.wikimedia.org/wikipedia/commons/b/bf/Bird_Diversity_2013.png"
birds.user_id = 1
birds.save!
boards << birds

motorcycles = Board.new();
motorcycles.description = "Motorcycles go here!"
motorcycles.name = "Motorcycles"
motorcycles.image_url = "http://upload.wikimedia.org/wikipedia/commons/8/85/Triumph_T_110_650_cc_1954.jpg"
motorcycles.user_id = 2
motorcycles.save!
boards << motorcycles

cats = Board.new();
cats.description = "Cats go here!"
cats.name = "Cats"
cats.image_url = "http://upload.wikimedia.org/wikipedia/commons/9/93/Cat_poster_2.jpg"
cats.user_id = 3
cats.save!
boards << cats

food = Board.new();
food.description = "Food goes here!"
food.name = "Food"
food.image_url = "http://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"
food.user_id = 4
food.save!
boards << food

lasers = Board.new();
lasers.description = "Lasers go here!"
lasers.name = "Lasers"
lasers.image_url = "http://upload.wikimedia.org/wikipedia/commons/e/eb/RGB_laser.jpg"
lasers.user_id = 4
lasers.save!
boards << lasers

boards.each do |board|
  if board.name == "Cats"
    30.times do |n|
      lorem = Pin.new()
      lorem.description = Faker::Lorem.paragraph(6)
      lorem.name = Faker::Name.first_name()
      while includedNames.include?(lorem.name)
        lorem.name = Faker::Name.first_name()
      end
      includedNames << lorem.name
      lorem.image_url = "http://placekitten.com/200/"
      randomSize = 100 + rand(600)
      while includedSizes.include?(randomSize)
        randomSize = 100 + rand(600)
      end
      includedSizes << randomSize

      lorem.image_url.concat(randomSize.to_s)
      puts lorem.image_url
      lorem.board_id = board.id
      lorem.user_id = 1
      lorem.save!
    end
  else
    30.times do |n|
      lorem = Pin.new()
      lorem.description = Faker::Lorem.paragraph(6)
      lorem.name = Faker::Lorem.word
      while includedNames.include?(lorem.name)
        lorem.name = Faker::Lorem.word
      end
      includedNames << lorem.name
      lorem.image_url = "http://lorempixel.com/200/"
      randomSize = 100 + rand(600)
      while includedSizes.include?(randomSize)
        randomSize = 100 + rand(600)
      end
      includedSizes << randomSize

      lorem.image_url.concat(randomSize.to_s)
      puts lorem.image_url
      lorem.board_id = board.id
      lorem.user_id = 1
      lorem.save!
    end
  end
end