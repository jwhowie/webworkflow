class CreateWorkItems < ActiveRecord::Migration[5.0]
  def change
    create_table :work_items do |t|
      t.text :history_text
      t.reference :team
      t.reference :customer
      t.reference :step_number
      t.datetime :moved_to_queue
      t.integer :open
      t.reference :user

      t.timestamps
    end
  end
end
