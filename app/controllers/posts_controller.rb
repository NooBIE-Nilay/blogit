# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_authorized, except: %i[index my_posts]
  after_action :verify_policy_scoped, only: %i[index my_posts]
  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = apply_filters(policy_scope(Post))
  end

  def my_posts
    @posts = apply_filters(
      policy_scope(Post).where(user_id: @current_user.id)
       )
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

    def apply_filters(scope)
      scope =
        scope.where(organization_id: @current_user.organization_id)

      if params[:category_ids].present?
        ids = Array(params[:category_ids]).map(&:to_i)

        scope =
          scope.joins(:categories)
            .where(categories: { id: ids })
            .distinct
      end

      scope.order(created_at: :desc)
        .page(params[:page] || 1)
        .per(params[:per_page] || 4)
    end
end
