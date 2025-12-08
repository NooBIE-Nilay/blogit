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
      filter_by_title
      filter_by_categories
      filter_by_status
      paginate
    end

    private

      def filter_by_title
        return @scoped_posts unless params[:title].present?

        sanitized_title = ActiveRecord::Base.sanitize_sql_like(params[:title].to_s.downcase)
        @scoped_posts = scoped_posts.where("LOWER(title) LIKE ?", "%#{sanitized_title}%")
      end

      def filter_by_categories
        return @scoped_posts unless params[:category_ids].present?

        category_ids = Array(params[:category_ids]).map(&:to_i)

        @scoped_posts = scoped_posts.joins(:categories)
          .where(categories: { id: category_ids })
          .distinct
      end

      def filter_by_status
        return @scoped_posts unless params[:status].present?

        statuses = Array(params[:status])

        @scoped_posts = scoped_posts.where(status: statuses)
      end

      def paginate
        page = params[:page] || Constants::DEFAULT_PAGE_NUMBER
        page_size = params[:page_size] || DEFAULT_PAGE_SIZE

        @scoped_posts = scoped_posts.page(page).per(page_size)
      end
  end
end
