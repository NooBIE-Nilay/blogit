# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end

  def show
    @post = Post.find_by(identifier_name: params[:identifier_name])
  end
end
