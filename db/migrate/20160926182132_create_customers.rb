class CreateCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customers do |t|
      t.string :last_name
      t.string :first_name
      t.string :phone
      t.string :address_1
      t.string :address_2
      t.string :city
      t.string :email

      t.timestamps
    end
  end
end
