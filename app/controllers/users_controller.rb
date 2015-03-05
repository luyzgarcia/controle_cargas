class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  respond_to :html, :xml, :json
  
  def index
    set_listagem
    @users = User.all.order(created_at: :desc)
    @user = User.new
    respond_to do |format|
      format.html
      format.json {render :json => @users.as_json}
    end
  end

  def show
  end
  
  def new
    @user = User.new
  end
  
  def create
    save_user
    
    respond_to do |format|
      if @user.save
       format.html { redirect_to users_path, notice: 'Usuario foi cadastrado com sucesso.' }
      else
        format.json { render json: {:errors => @user.errors}, status: 422}
        format.html { render 'new', notice: 'Erro ao cadastradar!'}   
      end
    end
  end
  
  def edit
  end
  
  def update
    @user = User.find(params[:id])
    
    if params[:user][:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end
    
    if(@user.update(user_params))
      respond_to do |format|
        format.html {redirect_to users_path, notice: 'Usuário atualizado com sucesso!'}
      end
    else
      respond_to do |format|
        format.json { render json: {:errors => @user.errors}, status: 422}
        format.html { render 'edit', notice: 'Erro ao cadastradar!'} 
      end    
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    if @user.id == current_user.id
      logger.debug 'Você nao pode se excluir'
      respond_to do |format|
        format.html {redirect_to users_path, notice: 'Você não pode se excluir'}
        format.json { render json: {:errors => @user.errors}, status: 422}
      end
    end
    respond_to do |format|
      if @user.destroy
        format.html {redirect_to users_path, notice: 'Registro excluido!'}
      else
        format.json { render json: {:errors => @user.errors}, status: 422}
        format.html {redirect_to users_path, notice: 'Erro ao excluir registro!'} 
      end
   end
  end
  
  private
    def save_user
      @user = User.new(user_params)
      
      if params[:user][:password].blank?
        params[:user].delete(:password)
        params[:user].delete(:password_confirmation)
      end
    end
  
    def set_listagem
      #@users = initialize_grid(User.order(created_at: :desc), per_page: 20)
    end
  
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:nome, :email, :password, :password_confirmation, :encrypted_password, :status)
    end
end
