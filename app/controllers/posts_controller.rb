# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = Post
      .where(organization_id: @current_user.organization_id)
      .order(created_at: :desc)
    @posts = @posts.where(category_id: params[:category_id]) if params[:category_id].present?
  end

  def show
    render
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", name: @post.title))
  end

  def create
    post = Post.new(
      post_params.merge(
        user_id: @current_user.id,
        organization_id: @current_user.organization_id))
    post.save!
    render_notice(t("successfully_created", name: post.title))
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", name: @post.title))
  end

  private

    def load_post!
      @post = Post.includes(:categories, :user).find_by!(
        slug: params[:slug],
        organization_id: @current_user.organization_id)
    end

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
