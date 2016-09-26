Rails.application.routes.draw do
  resources :work_items
  resources :process_flows
  resources :teams
  resources :customers
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
