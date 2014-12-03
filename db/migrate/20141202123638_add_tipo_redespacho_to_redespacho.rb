class AddTipoRedespachoToRedespacho < ActiveRecord::Migration
  def change
    add_column :redespachos, :tipo_redespacho, :string, :limit => 3
    add_column :redespachos, :status, :string, :limit => 3
  end
end
