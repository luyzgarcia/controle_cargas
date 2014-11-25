class RedespachosController < ApplicationController
  before_action :carrega_lista
  
  def index
    #@registros = Redespacho.all
    @redespacho = Redespacho.new 
  end
  
  def show
    
  end
  
  def new
    @redespacho = Redespacho.new
  end
  
  def edit
    @redespacho = Redespacho.find(params[:id])
    respond_to do |format|
      format.html {render 'edit'}
    end
    #flash[:notice] = 'Não esqueça de salvar as alteçoes após a edição.'
  end
  
  def create
    begin
      @redespacho = Redespacho.new(redespacho_params)
      
      respond_to do |format|
        if @redespacho.save
          format.html {redirect_to redespachos_path, notice: 'Redespacho salvo com sucesso!'}
        else
          format.html {redirect_to redespachos_path, notice: 'Nem todos os campos foram preenchidos!'}
        end
      end
    rescue
      respond_to do |format|
        format.html {redirect_to redespachos_path, notice: 'Um erro aconteceu :( '}
      end
    end
  end
  
  def update
    @redespacho = Redespacho.find(params[:id])
    if(@redespacho.update(redespacho_params))
      respond_to do |format|
        format.html {redirect_to redespachos_path, notice: 'Redespacho atualizado com sucesso!'}
      end
    else
      respond_to do |format|
        render :action => 'edit'
      end    
    end
    
  end
  
  private
  
  def carrega_lista
    @registros = initialize_grid(Redespacho.order(created_at: :desc), per_page: 30)
  end
  
  def redespacho_params
    params.require(:redespacho).permit(:remetente,:destinatario, :destinatario_cidade, :valor_redespacho,
    :valor_comissao, :valor_liquido, :valor_frete, :volume, :peso, :nf_valor, :nf_numero, :forma_pagamento,
    :data_envio, :data_entrega, :recebido_por, :jadlog_lista_numero, :jadlog_conhecimento_numero, :empresa_id)
  end
end
