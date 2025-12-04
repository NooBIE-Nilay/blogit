# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  # TODO: ASK: Is creating organizations via db ok? or should i add any flow to add organizations
  def index
    @organizations = Organization.all
  end
end
