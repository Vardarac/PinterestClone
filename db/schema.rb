# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140115183944) do

  create_table "boards", force: true do |t|
    t.text     "description"
    t.integer  "privacy_attribute", default: 0, null: false
    t.string   "name",                          null: false
    t.string   "image_url",                     null: false
    t.integer  "user_id",                       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pins", force: true do |t|
    t.text     "description"
    t.string   "name",                    null: false
    t.integer  "hidden",      default: 0
    t.string   "link"
    t.string   "image_url",               null: false
    t.integer  "board_id",                null: false
    t.integer  "user_id",                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.integer  "site_permissions", default: 0,                                                                         null: false
    t.string   "password_hash",                                                                                        null: false
    t.string   "name"
    t.string   "email",                                                                                                null: false
    t.string   "session_token",                                                                                        null: false
    t.string   "avatar_url",       default: "http://img.photobucket.com/albums/v61/omniicyshelf/vardaracextended.png", null: false
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
