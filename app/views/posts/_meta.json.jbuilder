  # frozen_string_literal: true

  json.total_count @posts.total_count
  json.current_page @posts.current_page
  json.total_pages @posts.total_pages
  json.page_size @posts.limit_value
