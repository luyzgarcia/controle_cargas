class CreateRedespachos < ActiveRecord::Migration
  def change
    create_table :redespachos do |t|
      t.string :remetente
      t.string :destinatario
      t.string :destinatario_cidade
      t.decimal :valor_redespacho, precision: 5, scale: 2
      t.decimal :valor_comissao, precision: 5, scale: 2
      t.decimal :valor_liquido, precision: 5, scale: 2
      t.decimal :valor_frete, precision: 5, scale: 2
      t.decimal :volume, precision: 5, scale: 2
      t.decimal :peso, precision: 5, scale: 2
      t.decimal :nf_valor, precision: 5, scale: 2
      t.integer :nf_numero
      t.datetime :data_envio
      t.datetime :data_entrega
      t.string :recebido_por
      t.string :jadlog_lista_numero
      t.string :jadlog_conhecimento_numero
      
      

      t.timestamps null: false
    end
  end
end
