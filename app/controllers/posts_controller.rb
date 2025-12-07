# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :load_post!, only: %i[show update destroy]
  before_action :authorize_post, only: %i[show update destroy]

  def index
    @posts = policy_scope(Post)
    @posts = Posts::FilterService.new(@posts, params).process!
    @posts = @posts.order(last_published_at: :desc)
  end

  def show
    render
  end

  def create
    post = @current_user.posts.new(post_params)
    post.organization_id = @current_user.organization_id
    set_last_published post
    post.save!
    authorize post
    render_notice(t("successfully_created", entity: t("post.title")))
  end

  def update
    set_last_published @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: t("post.title")))
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", entity: t("post.title")))
  end

  private

    def load_post!
      @post = @current_user.organization.posts.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end

    def set_last_published(post)
      return unless post_params[:status] == "published"

      post.last_published_at = Time.current
    end

    def authorize_post
      authorize @post
    end
end
