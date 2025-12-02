# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    post.user.organization_id === user.organization_id
  end

  def edit?
    post.user.id === user.id
  end

  def update?
    edit?
  end

  def create?
    true
  end

  def destroy?
    edit?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(organization_id: user.organization_id)
    end
  end
end
