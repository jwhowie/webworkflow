rails g scaffold User provider uid name oauth_token oauth_expires_at:datetime email:string team:reference
rails g scaffold Customer last_name:string first_name:string phone:string address_1:string address_2:string city:string email:string
rails g scaffold Team title:string user:reference
rails g scaffold ProcessFlow step_number:integer step_name:string team:reference
rails g scaffold WorkItem history_text:text team:reference customer:reference step_number:reference moved_to_queue:datetime open:integer user:reference
rails g controller Sessions create destroy

rails g migration DropStepNumberIdFromWorkItem
rails g migration AddProcessFlowIdToWorkItem
