# frozen_string_literal: true

class PostsController < ApplicationController
  respond_to :html, :xml, :json
  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end
end
