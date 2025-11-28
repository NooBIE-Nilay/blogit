# frozen_string_literal: true

json.posts Post.all do |post|
  json.extract! post, :id, :title, :slug, :description, :created_at

  json.user do
    json.extract! post.user, :name
  end

  json.categories post.categories do |category|
    json.extract! category, :name, :id
  end
end
