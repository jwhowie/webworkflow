class Team < ApplicationRecord
    has_many :work_items
    has_many :users
    belongs_to :user
    has_many :process_flows

    def self.all_teams
      query = "select teams.id, teams.title, users.name, users.email, users.id as team_user_id from teams, users where teams.user_id = users.id"
      return result = ActiveRecord::Base.connection.execute(query).to_json
    end

    def self.my_teams(current_user)
      query = "select teams.id, title, name, email, user_id from teams, users where user_id = users.id"

      return result = ActiveRecord::Base.connection.execute(query).to_json
    end


def self.team_members(team)
  query = "select teams.id, teams.title, users.name, users.email, users.id as team_user_id from teams, users where users.team_id = teams.id and teams.id = #{team}"
  return result = ActiveRecord::Base.connection.execute(query).to_json
end

end
