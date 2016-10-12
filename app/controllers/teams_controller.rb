class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy]

  # GET /teams
  # GET /teams.json
  def index

    if params[:all] == '1'
      @teams = Team.all_teams
    else
      @teams = Team.my_teams(current_user)
    end
    respond_to do |format|
      # byebug
      format.html
      format.json { render json:  @teams}
    end

  end

  # GET /teams/1
  # GET /teams/1.json
  def show
  end

  # GET /teams/new
  def new
    @team = Team.new
  end

  # GET /teams/1/edit
  def edit
    x = Team.team_members(params[:id])

    respond_to do |format|
      format.html
      format.json {render json: Team.team_members(params[:id])}
    end
  end

  # POST /teams
  # POST /teams.json
  def create

    if team_params[:action] == '1'
      user = User.find_by(email: team_params[:email])
      if user == nil
        user = User.new
      end

      user.name = team_params[:name]
      user.email = team_params[:email].downcase
      user.save

      team = Team.new



      if team_params[:id] == '0'
        team.title = team_params[:title]
        team.user = user
      else
        team = Team.find(team_params[:id])
      end

      team.save
      user.team = team
      user.save

  #     @team = Team.new(team_params)
  #     @team.user = current_user
  # # raise params.inspect
      # respond_to do |format|
      #    if @team.save(team_params)
      #      params[:peers].each do |number, peer|
  #          #  byebug
  #          User.find_or_create_by(email: peer[:email]) do |created_peer|
  #            created_peer.team = @team
  #            created_peer.name = peer[:name]
  #          end
  #          end
        respond_to do |format|
           format.html { redirect_to @team, notice: 'Team was successfully created.' }
           format.json { render json: team } #, status: :created, location: @team }
         end
  #       else
  #         format.html { render :new }
  #         format.json { render json: @team.errors, status: :unprocessable_entity }
  #       end
  #     end

      elsif team_params[:action] == '2'

        user = User.find_by(email: team_params[:email])
        if user == nil
          user = User.new
        end
          user.email = team_params[:email].downcase
          user.name = team_params[:name]
          user.team_id = team_params[:team_id]
          user.save
          respond_to do |format|
             format.html { redirect_to @team, notice: 'Team was successfully created.' }
             format.json { render json: user } #, status: :created, location: @team }
           end
    end


  end

  # PATCH/PUT /teams/1
  # PATCH/PUT /teams/1.json
  def update
    # raise params.inspect
    respond_to do |format|
      if @team.update(team_params)
         params[:peers].each do |number, peer|
          #  byebug
          User.find_or_create_by(email: peer[:email]) do |created_peer|
            created_peer.team = @team
            created_peer.name = peer[:name]
          end
        end
        format.html { redirect_to @team, notice: 'Team was successfully updated.' }
        format.json { render :show, status: :ok, location: @team }
      else
        format.html { render :edit }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teams/1
  # DELETE /teams/1.json
  def destroy
    @team.destroy
    respond_to do |format|
      format.html { redirect_to teams_url, notice: 'Team was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def team_params
      # byebug
      params.require(:team).permit(:title, :user, :name, :email, :user_id, :id, :business_process_name, :action, :team_title, :team_id)
    end
end
