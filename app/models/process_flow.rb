class ProcessFlow < ApplicationRecord
    belongs_to :team
    belongs_to :business_process
    has_many :work_items    

end
