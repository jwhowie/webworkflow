class CreateProcessFlows < ActiveRecord::Migration[5.0]
  def change
    create_table :process_flows do |t|
      t.integer :step_number
      t.string :step_name
      t.references :team

      t.timestamps
    end
  end
end
