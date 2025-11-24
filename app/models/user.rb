# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 35
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i.freeze

  MAX_EMAIL_LENGTH = 255
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  MIN_PASSWORD_LENGTH = 6

  belongs_to :organization
  has_many :posts

  has_secure_password

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }

  validates :email,
    presence: true,
    length: { maximum: MAX_EMAIL_LENGTH },
    uniqueness: { case_sensitive: false },
    format: { with: VALID_EMAIL_REGEX }

  validates :password,
    length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password.present? }

  validates :password_confirmation, presence: true, on: :create

  before_save :normalize_email

  private

    def normalize_email
      email.downcase!
      email.strip!
    end
end
