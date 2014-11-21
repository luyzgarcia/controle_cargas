class AddRemetenteCidadeToRedespacho < ActiveRecord::Migration
  def change
    add_column :redespachos, :remetente_cidade, :string
    change_column :redespachos, :volume, :integer
  end
end
