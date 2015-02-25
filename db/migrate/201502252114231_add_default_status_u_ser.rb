class AddDefaultStatusUSer < ActiveRecord::Migration
  def change
    change_column :users, :status, :string, :default => 'Inativo'
    User.update_all(:status => "Inativo")
  end
end
