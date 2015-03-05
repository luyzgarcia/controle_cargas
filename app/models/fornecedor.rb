class Fornecedor < ActiveRecord::Base
  has_one :redespacho
  belongs_to :empresa
  
  before_create :set_empresa
  
   validates :nome,  presence: true 
  
  def set_empresa
    if (User.current_user.role != 'admin')
      if !User.current_user.supervisor.nil?
        self.empresa = User.current_user.supervisor
      else
        self.empresa = User.current_user.empresa
      end
    end
    
  end
  
  
  def self.default_scope
    id = 0;
    if (User.current_user.role != 'admin')
      if !User.current_user.supervisor.nil?
        id = User.current_user.supervisor
      else
        id = User.current_user.empresa
      end
    end
    where(["empresa_id = ?", id])
  end
  
end
