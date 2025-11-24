# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]

  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end

  def show
    render
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", name: post.title))
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created", name: post.title))
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", name: post.title))
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
