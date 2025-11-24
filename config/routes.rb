# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug
    resources :categories, only: %i[index create show]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
