class UpdateEmpresas < ActiveRecord::Migration
  def change
      add_column(:empresas, :created_at, :datetime)
      add_column(:empresas, :updated_at, :datetime)
  end
end
