class AddRedeschoIdToFornecedor < ActiveRecord::Migration
  def change
    rename_column :redespachos, :empresa_id, :fornecedor_id
    add_column :users, :status, :string
  end
end
