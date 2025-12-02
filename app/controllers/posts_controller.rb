# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = policy_scope(Post)
    @posts = Post.where(organization_id: @current_user.organization_id)

    if params[:category_ids].present?
      category_ids = Array(params[:category_ids]).map(&:to_i)

      @posts = @posts.joins(:categories)
        .where(categories: { id: category_ids })
        .distinct
    end

    @posts = @posts
      .order(created_at: :desc)
      .page(params[:page] || 1)
      .per(params[:per_page] || 4)
  end

  def show
    authorize @post
    render
  end

  def update
    authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", name: @post.title))
  end

  def create
    post = Post.new(
      post_params.merge(
        user_id: @current_user.id,
        organization_id: @current_user.organization_id))
    authorize post
    post.save!
    render_notice(t("successfully_created", name: post.title))
  end

  def destroy
    authorize @post
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
      permitted = params.require(:post).permit(:title, :description, :status, category_ids: [],)
      if permitted[:status] == "published"
        permitted[:last_published_at] = Time.current
      end
      permitted
    end
end
