# frozen_string_literal: true

json.posts @posts do |post|
  json.partial! "posts/post", post: post
end

json.meta do
  json.partial! "posts/meta"
end
