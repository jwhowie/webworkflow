class ProcessFlowsController < ApplicationController
  before_action :set_process_flow, only: [:show, :edit, :update, :destroy]

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

    @process_flow = ProcessFlow.new(process_flow_params)
    @process_flow.add_step_number
    @process_flow.save
    respond_to do |format|
        format.html { redirect_to @process_flow, notice: 'Process flow was successfully created.' }
        format.json { render :show, status: :created, location: @process_flow }
      end
    end
  end

  # PATCH/PUT /process_flows/1
  # PATCH/PUT /process_flows/1.json
  def update
    respond_to do |format|
      if @process_flow.update(process_flow_params)
        format.html { redirect_to @process_flow, notice: 'Process flow was successfully updated.' }
        format.json { render :show, status: :ok, location: @process_flow }
      else
        format.html { render :edit }
        format.json { render json: @process_flow.errors, status: :unprocessable_entity }
      end
    end
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
