# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :users
  has_many :posts
  has_many :categories

  validates :name, presence: true,
    length: { maximum: Constants::MAX_NAME_LENGTH },
    format: { with: Constants::VALID_NAME_REGEX },
    uniqueness: { case_sensitive: false }
end
