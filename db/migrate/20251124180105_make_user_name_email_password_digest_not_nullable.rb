# frozen_string_literal: true

class MakeUserNameEmailPasswordDigestNotNullable < ActiveRecord::Migration[7.1]
  def change
    change_column_null :users, :name, false
    change_column_null :users, :email, false
    change_column_null :users, :password_digest, false
  end
end
