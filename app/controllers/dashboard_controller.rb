class DashboardController < ApplicationController
  def index
    @redespachos_ultima_semana = Redespacho.all.where('created_at >= ?', 1.week.ago).count
    @redespachos_ultima_mes = Redespacho.all.where("created_at > ? AND created_at < ?", Time.now.beginning_of_month, Time.now.end_of_month).count
  end
end
