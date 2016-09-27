class WorkItem < ApplicationRecord
    belongs_to :customer
    belongs_to :process_flow
    belongs_to :team
    belongs_to :user, optional: true

    def self.get_user_queue
      getQueue = "select concat(concat(concat(concat(concat(concat(customers.first_name, \' \'),  customers.last_name), ' '), customers.phone), ' '), customers.email) as contact_info,
      work_items.moved_to_queue, work_items.open, work_items.id,
      teams.title,
            users.name, process_flows.step_name
      from work_items, teams, customers, users, process_flows
      where work_items.team_id = teams.id and
            work_items.customer_id = customers.id and
            work_items.user_id = users.id and
            work_items.process_flow_id = process_flows.id"

      return result = ActiveRecord::Base.connection.execute(getQueue).to_json
    end

end
