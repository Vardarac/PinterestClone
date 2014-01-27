class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.text :description
      t.string :name, :null => false
      t.integer :hidden, :default => 0
      t.string :link
      t.string :image_url, :null => false
      t.integer :board_id, :null => false
      t.integer :user_id, :null => false

      t.timestamps
    end

    add_index :pins, :name
    add_index :pins, :hidden
    add_index :pins, :privacy_attribute
    add_index :pins, :image_url
    add_index :pins, :board_id
    add_index :pins, :user_id
  end
end
