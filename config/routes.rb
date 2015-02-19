Rails.application.routes.draw do
  
  
  resources :empresas
  resources :tipo_pagamentos

  #get 'redespacho/index'
  
  devise_for :users, :path_prefix => 'my'
  resources :users
  
  resources :redespachos do
    member do
      get :andamento
      get :finalizado
    end
  end
  resources :dashboard
  resources :relatorios do
    collection do
      get 'relatorio_por_codigo', to: 'relatorios#relatorio_por_codigo'
      get 'resultado_relatorio_por_codigo'  
    end
  end
  get 'gerar_pdf_relatorio' => 'relatorios#gerar_pdf'
  get 'relatorio_contas_a_pagar' => 'relatorios#relatorio_contas_a_pagar'
  get 'relatorio_contas_a_receber' => 'relatorios#relatorio_contas_a_receber'
  root 'redespachos#index'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
