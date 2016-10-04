class BusinessProcessesController < ApplicationController
  before_action :set_business_process, only: [:show, :edit, :update, :destroy]


  def index
    @business_processes = BusinessProcess.get_current_users_business_processes(current_user)
    respond_to do |format|
      format.html
      format.json { render json: @business_processes }
    end
  end

  def create
    @business_process = BusinessProcess.new(business_process_params)
    @business_process.user = current_user
    @business_process.save

    respond_to do |format|
      format.html
      format.json { render json: @business_process }
    end

  end

    def show
      respond_to do |format|
        format.html
        format.json { render json: @business_process }
      end

    end


  private

  def business_process_params
    params.require(:business_process).permit(:title)
  end

  def set_business_process
    @business_process = BusinessProcess.find(params[:id])
  end


end
