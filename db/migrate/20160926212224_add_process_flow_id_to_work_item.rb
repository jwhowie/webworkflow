class AddProcessFlowIdToWorkItem < ActiveRecord::Migration[5.0]
  def change
    add_column :work_items, :process_flow_id, :integer
  end
end
