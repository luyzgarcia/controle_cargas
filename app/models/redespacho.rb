class Redespacho < ActiveRecord::Base
  #obfuscate_id
  belongs_to :empresa
  
  def status_label
    case self[:status]
    when 'AND'
      'Andamento'
    when 'FIN'
      'Finalizado'
    else 
      'Não definido'
    end
  end
  
  def tipo_redespacho_label
    case self[:tipo_redespacho]
    when 'ENT'
      'Entrega'
    when 'COL'
      'Coleta'
    when 'RED'
      'Redespacho'
    when 'OUT'
      'Outros'
    else 
      'Não definido'
    end
  end
  
  #def volume
  #  self[:volume].to_s + ' (un)'
  #end
  
  #def peso
  #  self[:peso].to_s + ' (Kg)'
  #end
  
  def data_envio
    if self[:data_envio] != nil
      self[:data_envio].to_time + 4.hours
    end
  end
  
  def data_entrega
    if self[:data_entrega] != nil
      self[:data_entrega].to_time + 4.hours
    end
  end
  
  
  def as_json(options = {})
    options[:methods] = :status_label, :tipo_redespacho_label
    super(options)
  end
  
end
