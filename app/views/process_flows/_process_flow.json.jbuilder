json.extract! process_flow, :id, :step_number, :step_name, :team, :created_at, :updated_at
json.url process_flow_url(process_flow, format: :json)