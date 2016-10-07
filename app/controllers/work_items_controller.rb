class WorkItemsController < ApplicationController
  before_action :set_work_item, only: [:show, :edit, :update, :destroy]

  # GET /work_items
  # GET /work_items.json
  def index
    @work_items = WorkItem.all
    respond_to do |format|
      format.html
      format.json { render json: WorkItem.get_user_queue(current_user) } #@pokemons.as_json(only: [:name, :image_url]) }
    end
  end

  # GET /work_items/1
  # GET /work_items/1.json
  def show
  end

  # GET /work_items/new
  def new
    @work_item = WorkItem.new
    respond_to do |format|
      format.html
      format.js
    end
  end

  # GET /work_items/1/edit
  def edit
    respond_to do |format|
      format.html
      format.json { render json: @work_item.get_work_data } #@pokemons.as_json(only: [:name, :image_url]) }
    end
  end

  # POST /work_items
  # POST /work_items.json
  def create
    @work_item = WorkItem.new
    @work_item.create_work_item(work_item_params, current_user)

    respond_to do |format|
      if @work_item.save
        format.html { redirect_to @work_item, notice: 'Work item was successfully created.' }
        format.json { redirect_to action: :index } #{ render :show, status: :created, location: @work_item }
      else
        format.html { render :new }
        format.json { render json: @work_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /work_items/1
  # PATCH/PUT /work_items/1.json
  def update

    respond_to do |format|
      if @work_item.update_action(work_item_params)
        format.html { redirect_to @work_item, notice: 'Work item was successfully updated.' }
        format.json #{ render :show, status: :ok, location: @work_item }
      else
        format.html { render :edit }
        format.json { render json: @work_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /work_items/1
  # DELETE /work_items/1.json
  def destroy
    @work_item.destroy
    respond_to do |format|
      format.html { redirect_to work_items_url, notice: 'Work item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_work_item
      @work_item = WorkItem.find(params[:id])
      @customer = Customer.new

    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def work_item_params
      params.require(:work_item).permit(:history_text, :team, :customer, :step_number, :moved_to_queue, :open, :user, :action, :comment, :work_item_key, :processKey, :business_processes_id)
    end
end
