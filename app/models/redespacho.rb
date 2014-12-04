class Redespacho < ActiveRecord::Base
  obfuscate_id
  belongs_to :empresa
end
