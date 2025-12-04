# frozen_string_literal: true

json.extract! post,
  :id,
  :title,
  :slug,
  :status,
  :description,
  :last_published_at,
  :updated_at

json.user do
  json.extract! post.user, :name, :id
end

json.categories post.categories do |category|
  json.extract! category, :name, :id
end
