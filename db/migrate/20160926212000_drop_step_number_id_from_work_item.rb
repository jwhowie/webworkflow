class DropStepNumberIdFromWorkItem < ActiveRecord::Migration[5.0]
  def change
    remove_column :work_items, :step_number_id

  end
end
