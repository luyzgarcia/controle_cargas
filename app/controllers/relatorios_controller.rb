class RelatoriosController < ApplicationController
  def index
    @registros = initialize_grid(Redespacho.order(created_at: :desc), per_page: 100,
                :name => 'registros', 
                :enable_export_to_csv => true,
                :csv_field_separator => ';',
                :csv_file_name => 'Redespachos')
                
    export_grid_if_requested('registros' => 'registros')
    
    respond_to do |format|
      format.html
      format.pdf do 
        render :pdf => 'registros'
      end
    end
    
  end
end
