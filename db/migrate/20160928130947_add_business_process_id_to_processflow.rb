class AddBusinessProcessIdToProcessflow < ActiveRecord::Migration[5.0]
  def change
    add_reference :process_flows, :business_processes, index: true
  end
end
