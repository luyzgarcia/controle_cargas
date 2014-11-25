class CreateTipoPagamentos < ActiveRecord::Migration
  def change
    create_table :tipo_pagamentos do |t|
      t.string :nome
      t.integer :status, default: 1

      t.timestamps null: false
    end
  end
end
