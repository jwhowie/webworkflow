class ProcessFlow < ApplicationRecord
    belongs_to :team
    has_many :work_items

end
