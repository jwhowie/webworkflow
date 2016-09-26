class CreateWorkItems < ActiveRecord::Migration[5.0]
  def change
    create_table :work_items do |t|
      t.text :history_text
      t.references :team
      t.references :customer
      t.references :step_number
      t.datetime :moved_to_queue
      t.integer :open
      t.references :user

      t.timestamps
    end
  end
end
