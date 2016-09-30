json.extract! work_item, :id, :history_text, :team, :customer, :step_number_id, :moved_to_queue, :open, :user, :created_at, :updated_at
json.url work_item_url(work_item, format: :json)
