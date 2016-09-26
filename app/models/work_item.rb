class WorkItem < ApplicationRecord
    belongs_to :customer
    belongs_to :process_flow
    belongs_to :team
    belongs_to :user, optional: true
end
