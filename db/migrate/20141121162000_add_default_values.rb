class AddDefaultValues < ActiveRecord::Migration
  def change
    change_column :redespachos, :valor_redespacho, :decimal, precision: 5, scale: 2, default: 0.00
    change_column :redespachos, :valor_comissao, :decimal, precision: 5, scale: 2, default: 0.00
    change_column :redespachos, :valor_liquido, :decimal, precision: 5, scale: 2, default: 0.00
    change_column :redespachos, :valor_frete, :decimal, precision: 5, scale: 2, default: 0.00
    change_column :redespachos, :peso, :decimal, precision: 5, scale: 2, default: 0.00
    change_column :redespachos, :nf_valor, :decimal, precision: 5, scale: 2, default: 0.00
    
    
    remove_column :redespachos, :valor_liquido
  end
end
