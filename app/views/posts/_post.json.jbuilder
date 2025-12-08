# frozen_string_literal: true

json.extract! post,
  :id,
  :title,
  :slug,
  :status,
  :description,
  :last_published_at,
  :is_bloggable,
  :updated_at

json.user do
  json.extract! post.user, :name, :id
end

json.categories post.categories do |category|
  json.extract! category, :name, :id
end

json.vote do
  json.net_votes post.net_votes
  json.vote_type post.user_vote_type(@current_user)
end
