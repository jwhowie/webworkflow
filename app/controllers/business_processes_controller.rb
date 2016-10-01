class BusinessProcessesController < ApplicationController

  def index
    @business_processes = BusinessProcess.get_current_users_business_processes(current_user)
    respond_to do |format|
      format.html
      format.json { render json: @business_processes } #@pokemons.as_json(only: [:name, :image_url]) }
    end
  end
end
