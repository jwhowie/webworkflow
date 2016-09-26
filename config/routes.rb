Rails.application.routes.draw do
  root 'work_items#index'
  resources :work_items
  resources :process_flows
  resources :teams
  resources :customers
  resources :users


  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
