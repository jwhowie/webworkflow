class BusinessProcess < ApplicationRecord
  belongs_to :user
  has_many :process_flows

  def self.get_current_users_business_processes(current_user)
    query_string  = "select distinct business_processes.* from business_processes, process_flows, teams, users where business_processes.id = process_flows.business_process_id and process_flows.team_id = teams.id"
    return ActiveRecord::Base.connection.execute(query_string)
  end

  def self.get_first_step(process)
    return BusinessProcess.find(process).process_flows.order(:step_number).first
  end
end
