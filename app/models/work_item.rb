class WorkItem < ApplicationRecord
  belongs_to :customer
  belongs_to :process_flow, optional: true
  belongs_to :team, optional: true
  belongs_to :user, optional: true

  def create_work_item(params, creator)
  self.process_flow = BusinessProcess.get_first_step(params[:business_processes_id])

  self.team = self.process_flow.team

  self.user = self.process_flow.team.user

  self.customer_id = params[:customer]

  self.moved_to_queue = Time.now.getutc

  build_history(creator.name, self.process_flow.step_name, "created new", self.team.title, params[:comment])

  self.save

  if params[:action] != 4
  update_action(params)
  end
  end

  def update_action(params)

  #@history_text = params[:comment]
  #super(params)
  user_name = user.name
  from_team = process_flow.team.title
  actiontitle = ''
  case params[:action]
  when '1' then actiontitle = send_back
  when '2' then actiontitle = escalate
  when '3' then actiontitle = forward
  when '4' then actiontitle = savecomments
  end
  if process_flow != nil
  newaction = process_flow.step_name
  else
  newaction = 'finished'
  end
  build_history(user_name, newaction, actiontitle, from_team, params[:comment])
  self.save

  return true
  end

  def send_back

  self.process_flow = process_flow.business_process.process_flows.order(step_number: :desc ).where("step_number < ?", process_flow.step_number).first()
  team_lead = self.process_flow.team.user
  self.user = team_lead
  self.team = team_lead.team
  self.moved_to_queue = Time.now.getutc
  return 'returned'
  end

  def escalate
  team_lead = process_flow.team.user
  self.user = team_lead
  return 'escalated'
  end

  def savecomments
  end

  def forward

  self.process_flow = process_flow.business_process.process_flows.order(:step_number).where("step_number > ?", self.process_flow.step_number).first()


  if self.process_flow != nil
    self.team_id = self.process_flow.team_id
    self.user_id = self.process_flow.team.user_id
  else
    self.team_id = nil
    self.user_id = nil
  end
    self.moved_to_queue = Time.now.getutc
  return 'forward';
  end

  def build_history(name, title, action, from_team, comment)
  if self.history_text == nil
  self.history_text = ''
  end
  history_header = "#{name} from #{from_team} at #{Time.now.getutc} #{action} to "
  history_header += title
  history = history_header + "\n" + comment + "\n\n" + history_text
  self.history_text = history

  end

  def self.get_user_queue(user)
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
  work_items.process_flow_id = process_flows.id and work_items.team_id = #{user.team_id} order by work_items.created_at"

  return result = ActiveRecord::Base.connection.execute(get_queue).to_json
  end

  def get_work_data
  # work_query = "select work_items.history_text,
  # concat(concat(customers.first_name, ' '), customers.last_name) as name,
  # customers.address_1, customers.address_2,
  # customers.city, customers.phone, customers.email
  # from work_items, customers
  # where work_items.customer_id = customers.id and work_items.id = #{id}"

  work_query = "select work_items.history_text,
  concat(concat(customers.first_name, ' '), customers.last_name) as name,
  customers.address_1, customers.address_2,
  customers.city, customers.phone, customers.email, process_flows.step_number
  from work_items, customers, process_flows
  where work_items.customer_id = customers.id and
  work_items.process_flow_id = process_flows.id and work_items.id = #{id}"

  return results = ActiveRecord::Base.connection.execute(work_query).to_json
  end

  def self.get_work_item_status(customer_info_id)
    open_query = "Select 'Open' as status, business_processes.title as title, work_items.created_at, history_text
    From work_items, process_flows, business_processes
    Where work_items.process_flow_id = process_flows.id
    and process_flows.business_process_id = business_processes.id
    and work_items.customer_id = #{customer_info_id} Order by work_items.created_at"
    open_result =  ActiveRecord::Base.connection.execute(open_query)

    closed_query = "select 'Closed' as status, '  ' as title, work_items.created_at, history_text
    From work_items where process_flow_id is null
    and customer_id = #{customer_info_id}
    Order by work_items.created_at"
    closed_result =  ActiveRecord::Base.connection.execute(closed_query)

    results = []
    open_result.each {|item| results.push(item)}
    closed_result.each {|item| results.push(item)}
    return results
  end
end
