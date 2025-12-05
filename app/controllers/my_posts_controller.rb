# frozen_string_literal: true

class MyPostsController < ApplicationController
  DEFAULT_PAGE_SIZE = 8

  before_action :load_scoped_posts!, only: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @posts = paginate(@scoped_posts.order(created_at: :desc))
  end

  private

    def load_scoped_posts!
      @scoped_posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)
    end

    def paginate (scope)
      scope.page(params[:page] || Constants::DEFAULT_PAGE_NUMBER)
        .per(params[:page_size] || DEFAULT_PAGE_SIZE)
    end
end
