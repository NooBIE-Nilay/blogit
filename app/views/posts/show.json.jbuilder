# frozen_string_literal: true

json.post do
  json.extract! @post,
    :slug,
    :id,
    :title,
    :status,
    :description,
    :last_published_at,
    :updated_at

  json.user do
    json.extract! @post.user,
      :name, :id
  end

  json.categories @post.categories do |category|
    json.extract! category, :id, :name
  end
end
