# frozen_string_literal: true

class AddForeignKeyToPost < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :posts, :users, column: :assigned_user_id
  end
end
