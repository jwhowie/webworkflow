


class ProcessFlowsController < ApplicationController
  before_action :set_process_flow, only: [:show, :edit, :destroy]

  # GET /process_flows
  # GET /process_flows.json
  def index
    @process_flows = ProcessFlow.all

    respond_to do |format|
      format.html
      # format.json { render json: }
    end


  end

  # GET /process_flows/1
  # GET /process_flows/1.json

  def show
  end

  # GET /process_flows/new
  def new
    @process_flow = ProcessFlow.new
  end

  # GET /process_flows/1/edit
  def edit
  end

  # POST /process_flows
  # POST /process_flows.json
  def create

    @process_flow = ProcessFlow.new
    @process_flow.step_name = process_flow_params[:step_name]
    @process_flow.business_process_id = process_flow_params[:business_process_id]

    @process_flow.team_id = process_flow_params[:team_id]
    # byebug

    # @process_flow.add_step_number

    @process_flow.save
    # byebug

    respond_to do |format|
        format.html { redirect_to @process_flow, notice: 'Process flow was successfully created.' }
        format.json { render json: @process_flow.to_json }
      end
  end

  # PATCH/PUT /process_flows/1
  # PATCH/PUT /process_flows/1.json
  def update

    b_process_id  = params['business_process_id']
    params['process_flow'].each do |key, process_json|
      if process_json['id'] == nil
        process = ProcessFlow.new
      else
        process = ProcessFlow.find(process_json['id'])
      end

        process.business_process_id = b_process_id

        process.step_number = process_json['step_number'].to_i

        process.step_name   = process_json['step_name']

        process.team_id     = process_json['team_id']

        process.save


    end
    # render 'work_items/index'
    #respond_to do |format|
      # if @process_flow.update(process_flow_params)
      #   format.html { redirect_to @process_flow, notice: 'Process flow was successfully updated.' }
      #   format.json { render :show, status: :ok, location: @process_flow }
      # else
      #   format.html { render :edit }
      #  format.json { render json: @process_flow.errors, status: :unprocessable_entity }
      #end
    #end
  end

  # DELETE /process_flows/1
  # DELETE /process_flows/1.json
  def destroy
    @process_flow.destroy
    respond_to do |format|
      format.html { redirect_to process_flows_url, notice: 'Process flow was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_process_flow
      @process_flow = ProcessFlow.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def process_flow_params
      params.require(:process_flow).permit(:step_number, :step_name, :team_id, :id, :business_process_id)
    end
end
