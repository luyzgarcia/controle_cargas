class RenameEmpresasToFornecedores < ActiveRecord::Migration
  def change
    rename_table :empresas, :fornecedores
  end
end
