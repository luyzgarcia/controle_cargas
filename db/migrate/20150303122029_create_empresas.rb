class CreateEmpresas < ActiveRecord::Migration
  def change
    create_table :empresas do |t|
      t.string :nome
      t.string :cnpj
      t.string :telefone
      t.string :endereco
      t.string :cidade
      t.string :estado
    end
  end
end
