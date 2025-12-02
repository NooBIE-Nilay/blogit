# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i.freeze

  has_and_belongs_to_many :posts

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX },
    uniqueness: { case_sensitive: false }
end
