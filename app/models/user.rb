class User < ApplicationRecord
    has_many :business_processes
    belongs_to :team
end
