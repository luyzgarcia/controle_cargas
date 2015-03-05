class EmpresasController < ApplicationController
  #layout 'blue'
  before_action :set_empresa, only: [:show, :edit, :update, :destroy]
  before_action :set_listagem

  respond_to :html, :xml, :json

  def index
    @empresa = Empresa.new
    #@empresa.supervisor.build
    @empresa.create_supervisor
    respond_to do |format|
      format.html
      format.json{render :json => @empresas.to_json(:include => :supervisor)}
    end
  end
  
  def show
    respond_with(@empresa)
  end

  def new
    @empresa = Empresa.new
    @empresa.create_supervisor
    respond_with(@empresa) do |format|
      format.html 
      #format.js {render :layout => false}
    end
  end

  def edit
  end

  def create
    @empresa = Empresa.new(empresa_params)
    #logger.debug empresa_params
    #logger.debug @empresa
    #responde_with(@fornecedor)
    
    
    respond_to do |format|
      #render 'new'
      if @empresa.save
        #format.xml {render xml:@fornecedor}
     #   format.json {render @empresa}
        #responde_with(@empresa)
        format.html {redirect_to empresas_path, notice: 'Empresa foi cadastrada com sucesso!'}
      else
        logger.debug @empresa.errors.full_messages 
      #  format.json
        #render :action => 'new'
        #redirect_to :back
        format.json { render json: {:errors => @empresa.errors}, status: 422}
        format.html { render 'new', notice: 'Erro ao cadastradar!'} 
      end
    end
  end

  def update
    if params[:empresa][:supervisor_attributes][:password].blank?
      params[:empresa][:supervisor_attributes].delete(:password)
      params[:empresa][:supervisor_attributes].delete(:password_confirmation)
    end
    
    respond_to do |format| 
      if @empresa.update_attributes(empresa_params)
          logger.debug('atualizou')
          #format.html {redirect_to fornecedors_path, notice: 'Fornecedor foi atualizada com sucesso!'}
          format.json {render json:@empresa}
        else
          format.json { render json: {:errors => @empresa.errors}, status: 422}
          format.html { render 'new', notice: 'Erro ao cadastradar!'}  
          
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
      #@fornecedors = initialize_grid(Fornecedor.order(created_at: :desc), per_page: 20)
      @empresas = Empresa.all.order(:created_at)
    end
  
    def set_empresa
      @empresa = Empresa.find(params[:id])
    end

    def empresa_params
      params.require(:empresa).permit(:nome, :cnpj, :email, :telefone, :endereco, :cidade, :estado, :status, :razao_social, :email, :responsavel,
              :observacao, :logo,
              {:supervisor_attributes => [:id,:supervisor_id, :empresa_id, :nome, :email, :password, :password_confirmation, :encrypted_password, :status, :role]})
    end
end
