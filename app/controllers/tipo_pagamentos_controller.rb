class TipoPagamentosController < ApplicationController
  before_action :set_tipo_pagamento, only: [:show, :edit, :update, :destroy]
  before_action :set_listagem
  
  respond_to :html

  def index
    respond_with(@tipo_pagamentos)
  end

  def show
    respond_with(@tipo_pagamento)
  end

  def new
    @tipo_pagamento = TipoPagamento.new
    respond_with(@tipo_pagamento)
  end

  def edit
  end

  def create
    @tipo_pagamento = TipoPagamento.new(tipo_pagamento_params)
    #flash[:notice] = 'TipoPagamento was successfully created.' 
    if @tipo_pagamento.save
      respond_to do |format|
        format.html {redirect_to tipo_pagamentos_path, notice: 'Tipo de pagamento cadastrado com sucesso!'} 
      end
    else
      respond_to do |format|
        render 'new'
      end
    end
  end

  def update
    
    if @tipo_pagamento.update(tipo_pagamento_params)
      respond_to do |format|
        format.html {redirect_to tipo_pagamentos_path, notice: 'Tipo de pagamento editado com sucesso!'} 
      end
    else
      respond_to do |format|
        render 'edit'
      end
    end
    
  end

  def destroy
    @tipo_pagamento.destroy
    respond_with(@tipo_pagamento)
  end

  private
    def set_listagem 
      @tipo_pagamentos = initialize_grid(TipoPagamento.order(created_at: :desc), per_page: 20)
    end
  
    def set_tipo_pagamento
      @tipo_pagamento = TipoPagamento.find(params[:id])
    end

    def tipo_pagamento_params
      params.require(:tipo_pagamento).permit(:nome, :status)
    end
end
