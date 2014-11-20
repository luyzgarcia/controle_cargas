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
      format.html {render 'index'}
    end
    #flash[:notice] = 'Não esqueça de salvar as alteçoes após a edição.'
  end
  
  def create
    
    @redespacho = Redespacho.new(redespacho_params)
    
    respond_to do |format|
      if @redespacho.save
        format.html {redirect_to redespachos_path, notice: 'Redespacho salvo com sucesso!'}
      else
        format.html {redirect_to redespachos_path, notice: 'Nem todos os campos foram preenchidos!'}
      end
    end
  end
  
  def carrega_lista
    @registros = initialize_grid(Redespacho, per_page: 10) 
  end
  
  def redespacho_params
    params.require(:redespacho).permit(:remetente,:destinatario, :destinatario_cidade, :valor_redespacho,
    :valor_comissao, :valor_liquido, :valor_frete, :volume, :peso, :nf_valor, :nf_numero, 
    :data_envio, :data_entrega, :recebido_por)
  end
end
