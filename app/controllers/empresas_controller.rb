class EmpresasController < ApplicationController
  #layout 'blue'
  before_action :set_empresa, only: [:show, :edit, :update, :destroy]
  before_action :set_listagem

  respond_to :html, :xml, :json

  def index
    @empresa = Empresa.new
    respond_with(@empresas)
  end
  
  def index_remote
    @empresas = Empresa.all
    @empresa = Empresa.new
    respond_to do |format|
      format.js
      format.html
    end
  end

  def show
    respond_with(@empresa)
  end

  def new
    @empresa = Empresa.new
    respond_with(@empresa) do |format|
      format.html {render :layout => false}
      format.js {render :layout => false}
    end
  end

  def edit
  end

  def create
    @empresa = Empresa.new(empresa_params)
    logger.debug empresa_params
    logger.debug @empresa
    #responde_with(@empresa)
    
    respond_to do |format|
      if @empresa.save
        #format.xml {render xml:@empresa}
        format.json {render json:@empresa}
        #responde_with(@empresa)
        #format.html {redirect_to empresas_path, notice: 'Empresa foi cadastrada com sucesso!'}
      else
        format.json
        #format.html {redirect_to empresas_path, notice: 'Erro ao cadastradar!'} 
      end
    end
  end

  def update
    respond_to do |format| 
      if @empresa.update(empresa_params)
          #format.html {redirect_to empresas_path, notice: 'Empresa foi atualizada com sucesso!'}
          format.json {render json:@empresa}
        else
          #format.html {redirect_to empresas_path, notice: 'Erro ao atualizar registro'} 
          format.json {render json:@empresa}
        end
    end
  end

  def destroy
    respond_to do |format|
      if @empresa.destroy
        format.html {redirect_to empresas_path, notice: 'Empresa excluida!'}
      else
        format.html {redirect_to empresas_path, notice: 'Erro ao excluir excluida!'}
      end
   end
  end

  private
  
    def set_listagem
      #@empresas = initialize_grid(Empresa.order(created_at: :desc), per_page: 20)
      @empresas = Empresa.all.order(:created_at)
    end
  
    def set_empresa
      @empresa = Empresa.find(params[:id])
    end

    def empresa_params
      params.require(:empresa).permit(:nome, :razao_social, :cnpj, :email, :telefone, :responsavel, :cidade, :estado, :observacao)
    end
end
