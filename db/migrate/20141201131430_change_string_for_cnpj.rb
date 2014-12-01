class ChangeStringForCnpj < ActiveRecord::Migration
  def change
    change_table :empresas do |t|
      t.change :cnpj, :string
    end
  end
end
