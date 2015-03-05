class UpdateRedespachosAndFornecedores < ActiveRecord::Migration
  def change
    Redespacho.find_each do |re|
      re.empresa_id = 1
      re.save!
    end
    
    Fornecedor.find_each do |re|
      re.empresa_id = 1
      re.save!
    end
    
  end
end
