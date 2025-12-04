# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @organization = @user.organization
    @category = create(:category)
    @post = create(:post, user: @user, organization: @organization, categories: [@category], status: "published")
    @headers = headers(@user)
  end

  def test_should_list_published_posts_for_valid_user
    get posts_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_kind_of Array, response_json[:posts]
    slugs = response_json[:posts].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end

  def test_should_filter_posts_based_on_categories
    get posts_path(category_ids: [@category.id]), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    slugs = response_json[:posts].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end

  def test_should_filter_posts_based_on_categories
    get posts_path(category_ids: [@category.id]), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    slugs = response_json[:posts].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end

  def test_should_show_details_of_task_based_on_slug
    get post_path(slug: @post.slug), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @post.id, response_json[:post][:id]
  end

  def test_should_create_valid_post
    post_params = {
      post: {
        title: "New Post",
        description: "A description",
        status: "draft",
        category_ids: [@category.id]
      }
    }
    post posts_path, params: post_params, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", name: post_params[:post][:title]), response_json["notice"]
  end

  def test_should_not_create_post_without_title
    post_params = {
      post: {
        description: "A description",
        status: "draft",
        category_ids: [@category.id]
      }
    }
    post posts_path, params: post_params, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Title can't be blank, Title is invalid", response_json["error"]
  end

  def test_should_update_post_details
    patch post_path(slug: @post.slug), params: {
      post: { title: "Updated Title" }
    }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", name: "Updated Title"), response_json["notice"]
    assert_equal "Updated Title", @post.reload.title
  end

  def test_should_update_last_published_at
    published_at = @post.last_published_at
    patch post_path(slug: @post.slug), params: {
      post: { title: "Updated Title", status: "published" }
    }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", name: "Updated Title"), response_json["notice"]
    assert_not_equal published_at, @post.reload.last_published_at
  end

  def test_should_delete_post
    assert_difference "Post.count", -1 do
      delete post_path(slug: @post.slug), headers: @headers
    end
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_deleted", name: @post.title.truncate(15)), response_json["notice"]
  end

  def test_should_get_my_posts
    get my_posts_posts_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    slugs = response_json[:posts].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end
end
