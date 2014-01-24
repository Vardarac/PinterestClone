class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :site_permissions, {:default => 0, :null => false}
      t.string :password_hash, :null => false
      t.string :name
      t.string :email, :null => false
      t.string :session_token, :null => false
      t.string :avatar_url, {
        :default => "http://img.photobucket.com/albums/v61/omniicyshelf/vardaracextended.png",
        :null => false
      }
      t.text :description

      t.timestamps
    end

    add_index :users, :name
    add_index :users, :email
    add_index :users, :session_token
    add_index :users, :avatar_url
  end
end
