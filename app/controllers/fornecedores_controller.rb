class FornecedoresController < ApplicationController
  #layout 'blue'
  before_action :set_fornecedor, only: [:show, :edit, :update, :destroy]
  before_action :set_listagem

  respond_to :html, :xml, :json

  def index
    @fornecedor = Fornecedor.new
    
    respond_with(@fornecedores)
  end
  
  def index_remote
    @fornecedores = Fornecedor.all
    @fornecedor = Fornecedor.new
    respond_to do |format|
      format.js
      format.html
    end
  end

  def show
    respond_with(@fornecedor)
  end

  def new
    @fornecedor = Fornecedor.new
    respond_with(@fornecedor) do |format|
      format.html {render :layout => false}
      format.js {render :layout => false}
    end
  end

  def edit
  end

  def create
    @fornecedor = Fornecedor.new(fornecedor_params)
    logger.debug fornecedor_params
    logger.debug @fornecedor
    #responde_with(@fornecedor)
    
    respond_to do |format|
      if @fornecedor.save
        #format.xml {render xml:@fornecedor}
        format.json {render json:@fornecedor}
        #responde_with(@fornecedor)
        #format.html {redirect_to fornecedors_path, notice: 'Fornecedor foi cadastrada com sucesso!'}
      else
        format.json { render json: {:errors => @fornecedor.errors}, status: 422}
        #format.html {redirect_to fornecedors_path, notice: 'Erro ao cadastradar!'} 
      end
    end
  end

  def update
    respond_to do |format| 
      if @fornecedor.update(fornecedor_params)
          #format.html {redirect_to fornecedors_path, notice: 'Fornecedor foi atualizada com sucesso!'}
          format.json {render json:@fornecedor}
        else
          #format.html {redirect_to fornecedors_path, notice: 'Erro ao atualizar registro'} 
          format.json { render json: {:errors => @fornecedor.errors}, status: 422}
        end
    end
  end

  def destroy
    respond_to do |format|
      if @fornecedor.destroy
        format.html {redirect_to fornecedores_path, notice: 'Fornecedor excluida!'}
        format.json { render json: {}, status: 200}
      else
        format.json { render json: {:errors => @fornecedor.errors}, status: 422}
        format.html {redirect_to fornecedores_path, notice: 'Erro ao excluir excluida!'}
      end
   end
  end

  private
  
    def set_listagem
      #@fornecedors = initialize_grid(Fornecedor.order(created_at: :desc), per_page: 20)
      @fornecedores = Fornecedor.all.order(:created_at)
    end
  
    def set_fornecedor
      @fornecedor = Fornecedor.find(params[:id])
    end

    def fornecedor_params
      params.require(:fornecedor).permit(:nome, :razao_social, :cnpj, :email, :telefone, :responsavel, :cidade, :estado, :observacao)
    end
end
