class RelatoriosController < ApplicationController
  before_action :filtrar, only: [:gerar_pdf]
  
  def index
    
    @registros = initialize_grid(Redespacho.order(created_at: :desc), per_page: 100,
                :name => 'registros', 
                :enable_export_to_csv => true,
                :csv_field_separator => ';',
                :csv_file_name => 'Redespachos')
    
    respond_to do |format|
      format.html
      format.pdf do 
        render :pdf => 'registros'
      end
    end
    
  end
  
  def gerar_pdf
   respond_to do |format|
      format.pdf do 
        render  :pdf                            => 'Controle de Cargas',
                :orientation                    => 'Landscape',
                :title                          => 'Relatórios Controle de Cargas'
      end
    end
  end
  
  private 
  
  def filtrar
    filter = [ ]
    parametros = params[:consulta][:registros][:f]
    
    if !parametros.nil? && !parametros.empty?
            
      if !parametros[:empresa_id].blank?
        empresa_id = 0
        parametros[:empresa_id].each do |emp|
          if !emp == parametros[:empresa_id].last
            empresa_id = ' or ' + emp  
          end 
          empresa_id = emp
        end
        filter << ["empresa_id = #{empresa_id}"]
      end
      
      if !parametros[:status].blank?
        status = ''
        parametros[:status].each do |sta|
          if !sta == parametros[:status].last
            status = ' or ' + sta  
          end 
          status = sta
        end
        filter << ["status like '%#{status}%'"]
      end

      if !parametros[:remetente].blank?
        remetente = parametros[:remetente]
        filter << ["LOWER(remetente) like LOWER('%#{remetente}%')"]
      end
      
      if !parametros[:remetente_cidade].blank?
        valor = parametros[:remetente_cidade]
        filter << ["LOWER(remetente_cidade) like LOWER('%#{valor}%')"]
      end
      
      if !parametros[:destinatario].blank?
        valor = parametros[:destinatario]
        filter << ["LOWER(destinatario) like LOWER('%#{valor}%')"]
      end
      
      if !parametros[:destinatario_cidade].blank?
        valor = parametros[:destinatario_cidade]
        filter << ["LOWER(destinatario_cidade) like LOWER('%#{valor}%')"]
      end
      
      if !parametros[:data_envio].blank?
        from = Time.new
        
        if !parametros[:data_envio][:fr].blank?
          from = parametros[:data_envio][:fr]
          filter << ["data_envio >= '#{from}'"]
        end
        to = Time.new
        if !parametros[:data_envio][:to].blank?
          to = parametros[:data_envio][:to]
          filter << ["data_envio <= '#{to}'"]
        end
        
      end
      
      if !parametros[:data_entrega].blank?
        from = Time.new
        if !parametros[:data_entrega][:fr].blank?
          from = parametros[:data_entrega][:fr]
          filter << ["data_entrega >= '#{from}'"]
        end
        to = Time.new
        if !parametros[:data_entrega][:to].blank?
          to = parametros[:data_entregao][:to]
          filter << ["data_entrega <= '#{to}'"]
        end
        
      end
      
    end
    
    @registros = Redespacho.where(filter.join(" AND ")).order('created_at DESC')
    
  end
  
end