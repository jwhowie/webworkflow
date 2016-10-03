class Team < ApplicationRecord
    has_many :work_items
    has_many :users
    belongs_to :user
    has_many :process_flows

    def self.my_teams(current_user)
      query = "select teams.id, title, name, email, user_id from teams, users where user_id = users.id"

      return result = ActiveRecord::Base.connection.execute(query).to_json
    end


end
