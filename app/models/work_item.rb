class WorkItem < ApplicationRecord
    belongs_to :customer
    belongs_to :process_flow
    belongs_to :team
    belongs_to :user, optional: true

    def self.get_user_queue
      get_queue = "select concat(concat(concat(concat(concat(concat(customers.first_name, ' '),  customers.last_name), ' '), customers.phone), ' '), customers.email) as contact_info,
      to_char(work_items.moved_to_queue, 'MM-DD-YY HH12:MI') as moved_to_queue,
      to_char(work_items.created_at, 'MM-DD-YY HH12:MI') as created_at,
      work_items.open, work_items.id,
      teams.title,
            users.name, process_flows.step_name
      from work_items, teams, customers, users, process_flows
      where work_items.team_id = teams.id and
            work_items.customer_id = customers.id and
            work_items.user_id = users.id and
            work_items.process_flow_id = process_flows.id"

      return result = ActiveRecord::Base.connection.execute(get_queue).to_json
    end

    def get_work_data
        work_query = "select work_items.history_text,
        concat(concat(customers.first_name, ' '), customers.last_name) as name,
        customers.address_1, customers.address_2,
        customers.city, customers.phone, customers.email
        from work_items, customers
        where work_items.customer_id = customers.id and work_items.id = #{id}"

        return results = ActiveRecord::Base.connection.execute(work_query).to_json
    end

end
