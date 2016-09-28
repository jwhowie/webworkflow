class BusinessProcess < ApplicationRecord
  belongs_to :user
  has_many :process_flows
end
