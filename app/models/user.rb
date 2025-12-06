# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :organization
  has_many :posts

  validates :name,
    presence: true,
    length: { maximum: Constants::MAX_NAME_LENGTH },
    format: { with: Constants::VALID_NAME_REGEX }

  validates :email,
    presence: true,
    length: { maximum: Constants::MAX_EMAIL_LENGTH },
    uniqueness: { case_sensitive: false },
    format: { with: Constants::VALID_EMAIL_REGEX }

  validates :password,
    length: { minimum: Constants::MIN_PASSWORD_LENGTH }, if: -> { password.present? }

  validates :password_confirmation, presence: true, on: :create

  before_save :normalize_email

  has_secure_password
  has_secure_token :authentication_token

  private

    def normalize_email
      email.downcase!
      email.strip!
    end
end
