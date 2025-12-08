# frozen_string_literal: true

class MyPostsController < ApplicationController
  DEFAULT_PAGE_SIZE = 8

  after_action :verify_policy_scoped, only: %i[index bulk_delete bulk_update_status]

  before_action :load_scoped_posts!, only: %i[index bulk_delete bulk_update_status]

  def index
    @posts = Posts::FilterService.new(@scoped_posts, params).process!
  end

  def bulk_update_status
    post_ids = Array(bulk_update_params[:post_ids])
    count = post_ids.count
    return render_error("No posts selected", :bad_request) if post_ids.blank?

    selected_posts = find_posts post_ids
    update_posts selected_posts
    render_notice(t("successfully_updated_bulk", entity: t("post.plural"), count:))
  end

  def bulk_delete
    post_ids = Array(bulk_delete_params[:post_ids])
    return render_error("No posts selected", :bad_request) if post_ids.blank?

    selected_posts = @scoped_posts.where(id: post_ids)
    count = selected_posts.count
    selected_posts.destroy_all
    render_notice(t("successfully_deleted_bulk", entity: t("post.plural"), count:))
  end

  private

    def load_scoped_posts!
      @scoped_posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)
    end

    def bulk_delete_params
      params.permit(post_ids: [])
    end

    def bulk_update_params
      params.permit(:status, post_ids: [])
    end

    def find_posts(post_ids)
      @scoped_posts.where(id: post_ids).where.not(status: bulk_update_params[:status])
    end

    def update_posts(posts)
      if bulk_update_params[:status] == "published"
        posts.update_all(last_published_at: Time.current, status: bulk_update_params[:status])
      else
        posts.update_all(status: bulk_update_params[:status])
      end
    end
end
