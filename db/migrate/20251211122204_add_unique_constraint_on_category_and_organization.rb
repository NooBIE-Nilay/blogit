# frozen_string_literal: true

class AddUniqueConstraintOnCategoryAndOrganization < ActiveRecord::Migration[7.1]
  def change
    remove_index :categories, :name if index_exists?(:categories, :name)
    add_index :categories, [:name, :organization_id], unique: true
  end
end
