class AddFielsToEmpresas < ActiveRecord::Migration
  def change
    add_column :empresas, :supervisor_id, :integer
    add_column :empresas, :numero, :integer
    add_column :empresas, :status, :string
    add_column :empresas, :razao_social, :string
    add_column :empresas, :responsavel, :string
    add_column :empresas, :observacao, :text
    add_column :empresas, :email, :string
  end
end
