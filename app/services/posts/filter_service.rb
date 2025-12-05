# frozen_string_literal: true

module Posts
  class FilterService
    DEFAULT_PAGE_SIZE = 4
    attr_reader :scoped_posts, :params

    def initialize(scoped_posts, params)
      @scoped_posts = scoped_posts
      @params = params
    end

    def process!
      filter_by_categories
      paginate
    end

    private

      def filter_by_categories
        return @scoped_posts unless params[:category_ids].present?

        category_ids = Array(params[:category_ids]).map(&:to_i)

        @scoped_posts = scoped_posts.joins(:categories)
          .where(categories: { id: category_ids })
          .distinct
      end

      def paginate
        @scoped_posts = scoped_posts.page(params[:page] || Constants::DEFAULT_PAGE_NUMBER)
          .per(params[:per_page] || DEFAULT_PAGE_SIZE)
      end
  end
end
