# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    users = User.select(:id, :name)
    render status: :ok, json: { users: users }
  end

  def create
    user = User.new(user_params)
    user.save!
    render_notice(t("successfully_created", name: user.name))
  end
end
