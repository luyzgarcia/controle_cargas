class EmpresasController < ApplicationController
  before_action :set_empresa, only: [:show, :edit, :update, :destroy]
  before_action :set_listagem

  respond_to :html

  def index
    respond_with(@empresas)
  end

  def show
    respond_with(@empresa)
  end

  def new
    @empresa = Empresa.new
    respond_with(@empresa)
  end

  def edit
  end

  def create
    @empresa = Empresa.new(empresa_params)
    flash[:notice] = 'Empresa foi cadastrada.' if @empresa.save
    respond_with(@empresa)
  end

  def update
    flash[:notice] = 'Empresa atualizada com sucesso.' if @empresa.update(empresa_params)
    respond_with(@empresa)
  end

  def destroy
    @empresa.destroy
    respond_with(@empresa)
  end

  private
  
    def set_listagem
      @empresas = initialize_grid(Empresa.order(created_at: :desc), per_page: 20)
    end
  
    def set_empresa
      @empresa = Empresa.find(params[:id])
    end

    def empresa_params
      params.require(:empresa).permit(:nome, :razao_social, :cnpj, :email, :telefone, :responsavel, :cidade, :estado, :observacao)
    end
end
