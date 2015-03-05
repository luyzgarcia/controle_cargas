class AddEmpresaToUser < ActiveRecord::Migration
  def change
    add_reference :users, :empresa, index: true
    add_reference :redespachos, :empresa, index: true
    add_reference :fornecedores, :empresa, index: true
  end
end
