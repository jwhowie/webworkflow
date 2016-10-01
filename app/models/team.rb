class Team < ApplicationRecord
    has_many :work_items
    has_many :users
    belongs_to :user
    has_many :process_flows
end
