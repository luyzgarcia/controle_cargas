class DashboardController < ApplicationController
  def index
    @registros = Redespacho.all
    
    respond_to do |format|
      format.xml {render xml: @registros}
      format.json {render json: @registros}
      format.html
    end
    
  end
end
