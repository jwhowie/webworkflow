json.extract! customer, :id, :last_name, :first_name, :phone, :address_1, :address_2, :city, :email, :created_at, :updated_at
json.url customer_url(customer, format: :json)