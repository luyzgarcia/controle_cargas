class User < ActiveRecord::Base
  belongs_to :empresa
  belongs_to :supervisor, :class_name => "Empresa", :foreign_key => :supervisor_id
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,:timeoutable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/missing.png"
  
  scope :with_role, lambda { |role| {:conditions => "roles_mask & #{2**ROLES.index(role.to_s)} > 0"} }
  
  ROLES = %w[admin usuario teste]
  
  validates :nome,:email,  presence: true 
  
  def roles=(roles)
    self.roles_mask = (roles & ROLES).map { |r| 2**ROLES.index(r)}.sum
  end
  
  def roles
    ROLES.reject { |r| ((roles_mask || 0) & 2**ROLES.index(r)).zero? }
  end

  def role?(role)
    self.role.to_s == role.to_s
  end
  
  #Para acessar o current_user de um model
  def self.current_user
    Thread.current[:user]
  end
  
  def self.current_user=(user)
    Thread.current[:user] = user
  end
  
  
end
