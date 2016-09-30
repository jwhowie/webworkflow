class AddIndexOnCustomerLastName < ActiveRecord::Migration[5.0]
  def change


    def up
      connection.execute(%q{
        CREATE INDEX ix_customer_last_name on customers (lower(last_name))
      })
    end

    def down
      connection.execute(%q{
        drop index ix_customer_last_name
      })
    end
  end
end
