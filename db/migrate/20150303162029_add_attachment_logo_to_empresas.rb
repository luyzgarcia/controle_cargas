class AddAttachmentLogoToEmpresas < ActiveRecord::Migration
  def self.up
    change_table :empresas do |t|
      t.attachment :logo
    end
  end

  def self.down
    remove_attachment :empresas, :logo
  end
end
