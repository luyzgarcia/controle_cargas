class AddEmpresaIdToRedespacho < ActiveRecord::Migration
  def change
    add_column :redespachos, :empresa_id, :integer
  end
end
