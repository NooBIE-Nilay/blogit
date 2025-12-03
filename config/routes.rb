# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug do
        collection do
          get "my_posts"
        end
      end
    resources :categories, only: %i[index create show]
    resources :users, only: %i[create]
    resources :organizations, only: %i[index]
    resource :session, only: %i[create destroy]

  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
