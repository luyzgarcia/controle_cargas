class ChangeStatusUser < ActiveRecord::Migration
  def change
    change_column :users, :status, :string, :default => 'Ativo'
  end
end
