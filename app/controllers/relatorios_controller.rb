class RelatoriosController < ApplicationController
  before_action :filtrar, only: [:gerar_pdf, :relatorio_contas_a_pagar, :relatorio_contas_a_receber]
  
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
  
  def relatorio_contas_a_pagar
    respond_to do |format|
      format.pdf do 
        render  :pdf                            => 'Relatórios Contas a Pagar - Controle de Cargas',
                :orientation                    => 'Landscape',
                :title                          => 'Relatórios Contas a pagar - Controle de Cargas'
      end
    end
  end
  
  def relatorio_contas_a_receber
    respond_to do |format|
      format.pdf do 
        render  :pdf                            => 'Relatórios Contas a Receber - Controle de Cargas',
                :orientation                    => 'Landscape',
                :title                          => 'Relatórios Contas a pagar - Controle de Cargas'
      end
    end
  end
  def show
    
  end
  def resultado_relatorio_por_codigo
    
    
    
    #ids = eval(params[:id])
    
    #parametros = params
    filter = [ ]
    if !params.nil? && !params.empty? && !params[:id].nil?
      ids = [ ]
      ids = params[:id].split(',').map { |s| s.to_i }
        if !ids.blank?
          codigo = '('
          ids.each do |emp|
            if emp != ids.last
              codigo += emp.to_s + ','
            else
              codigo += emp.to_s + ')'  
            end 
          end
          filter << ["id in #{codigo}"]
        end
      @registros = Redespacho.where(filter.join(" AND ")).order('created_at DESC')
    end
       
    respond_to do |format|
      format.html
      format.js
      format.pdf do 
       render  :pdf                            => 'Relatórios Contas a Receber - Controle de Cargas',
                :orientation                    => 'Landscape',
                :title                          => 'Relatórios Contas a pagar - Controle de Cargas'
     end
    end
  end
  
  private 
  
  def filtrar
    filter = [ ]
    
    if !params.nil? && !params.empty? && !params[:id].nil?
        ids = [ ]
        ids = params[:id].split(',').map { |s| s.to_i }
        if !ids.blank?
          codigo = '('
          ids.each do |emp|
            if emp != ids.last
              codigo += emp.to_s + ','
            else
              codigo += emp.to_s + ')'  
            end 
          end
          filter << ["id in #{codigo}"]
        end
      end
    
    if params.has_key?('consulta')
      
      parametros = params[:consulta][:registros][:f] 
      if !parametros.nil? && !parametros.empty?
              
        if !parametros[:fornecedor_id].blank?
          fornecedor_id = '('
          parametros[:fornecedor_id].each do |emp|
            if emp != parametros[:fornecedor_id].last
              fornecedor_id += emp + ','
            else
              fornecedor_id += emp + ')'  
            end 
          end
          filter << ["fornecedor_id in #{fornecedor_id}"]
        end
        
        if !parametros[:status].blank?
          status = '(|'
          parametros[:status].each do |sta|
            status += sta + '|'
            if sta == parametros[:status].last
              status += ')' 
            end
          end
          filter << ["status similar to '%#{status}%'"]
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
    end
    
    @registros = Redespacho.where(filter.join(" AND ")).order('created_at DESC')
    
  end
  
end