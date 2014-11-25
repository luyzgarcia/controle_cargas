class AddFormaPagamentoToRedespacho < ActiveRecord::Migration
  def change
    add_column :redespachos, :forma_pagamento, :string
  end
end
