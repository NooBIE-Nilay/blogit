# frozen_string_literal: true

class MyPostPolicy
  attr_reader :user, :posts

  def initialize(user, posts)
    @user = user
    @posts = posts
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(user_id: user.id)
    end
  end
end
