class RemovePluralFromBusinessProcessIDinProcessFlow < ActiveRecord::Migration[5.0]
  def change
      remove_column :process_flows, :business_processes_id
      add_reference :process_flows, :business_process, index: true
  end
end
