# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :organization
  has_and_belongs_to_many :posts

  validates :name,
    presence: true,
    length: { maximum: Constants::MAX_NAME_LENGTH },
    format: { with: Constants::VALID_NAME_REGEX },
    uniqueness: { case_sensitive: false }
end
