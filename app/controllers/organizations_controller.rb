# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def index
    @organizations = Organization.all
  end

  def create
    Organization.create(organization_params)
  end

  private

    def organization_params
      params.require(:organization).permit(:name)
    end
end
