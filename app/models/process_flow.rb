class ProcessFlow < ApplicationRecord
    belongs_to :team
    belongs_to :business_process
    has_many :work_items


    def self.my_process_flows(current_user)
      query = "select process_flows.id, step_number, step_name, team_id from process_flows, teams where team_id = teams.id"

      return result = ActiveRecord::Base.connection.execute(query).to_json

    end

    def add_step_number

    return
    end

end
