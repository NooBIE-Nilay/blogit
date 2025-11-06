class PostsController < ApplicationController
  respond_to :html, :xml, :json
  def index
    @posts = Post.all
    responsd_with(@posts)
  end
end
