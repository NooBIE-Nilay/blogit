  # frozen_string_literal: true

  json.categories @category do |category|
  json.extract! category, :id, :name
end
