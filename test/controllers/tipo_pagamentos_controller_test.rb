require 'test_helper'

class TipoPagamentosControllerTest < ActionController::TestCase
  setup do
    @tipo_pagamento = tipo_pagamentos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tipo_pagamentos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tipo_pagamento" do
    assert_difference('TipoPagamento.count') do
      post :create, tipo_pagamento: { nome: @tipo_pagamento.nome, status: @tipo_pagamento.status }
    end

    assert_redirected_to tipo_pagamento_path(assigns(:tipo_pagamento))
  end

  test "should show tipo_pagamento" do
    get :show, id: @tipo_pagamento
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tipo_pagamento
    assert_response :success
  end

  test "should update tipo_pagamento" do
    patch :update, id: @tipo_pagamento, tipo_pagamento: { nome: @tipo_pagamento.nome, status: @tipo_pagamento.status }
    assert_redirected_to tipo_pagamento_path(assigns(:tipo_pagamento))
  end

  test "should destroy tipo_pagamento" do
    assert_difference('TipoPagamento.count', -1) do
      delete :destroy, id: @tipo_pagamento
    end

    assert_redirected_to tipo_pagamentos_path
  end
end
