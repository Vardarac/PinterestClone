class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.text :description
      t.integer :privacy_attribute, {:default => 0, :null => false}
      t.string :name, :null => false
      t.string :image_url, :null => false
      t.integer :user_id, :null => false

      t.timestamps
    end

    add_index :boards, :privacy_attribute
    add_index :boards, :name
    add_index :boards, :image_url
    add_index :boards, :user_id
  end
end
