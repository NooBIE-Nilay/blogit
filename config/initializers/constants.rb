# frozen_string_literal: true

module Constants
  is_sqlite_db = ActiveRecord::Base.connection_db_config.configuration_hash[:adapter] == "sqlite3"
  DB_REGEX_OPERATOR = is_sqlite_db ? "REGEXP" : "~*"

  MAX_NAME_LENGTH = 125
  MAX_TITLE_LENGTH = 125
  MAX_EMAIL_LENGTH = 255
  MAX_DESCRIPTION_LENGTH = 10000
  MIN_PASSWORD_LENGTH = 6
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i.freeze
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i.freeze
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  VALID_BLOGGABLE_VALUES = [true, false].freeze
  DEFAULT_PAGE_NUMBER = 1
  BLOGGABLE_THRESHOLD = 2
end
