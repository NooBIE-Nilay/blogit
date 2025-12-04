# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category, only: [:show]

  def index
    @categories = policy_scope(Category)
  end

  def create
    category = @current_user.organization.categories.new(category_params)
    authorize category
    category.save!
    render_notice(t("successfully_created", entity: t("category.title")))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
