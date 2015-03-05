class Empresa < ActiveRecord::Base
  has_many :usuarios, :class_name => "User"
  has_one  :supervisor, :class_name => "User", :foreign_key => :supervisor_id
  #has_many :user
  accepts_nested_attributes_for :supervisor
  
  validates :nome, presence: true 
  #has_one :redespacho
  
  has_attached_file :logo, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/missing.png"
end
