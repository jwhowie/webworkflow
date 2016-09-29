# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

services = Team.create(title: 'Services')
sales = Team.create(title: 'Sales')
purchasing = Team.create(title: 'Purchasing')
receiving = Team.create(title: 'Receiving')
accounts_receivable = Team.create(title: 'Accounts Receivable')

@user = User.create(email:'rickwebworkflow@gmail.com', team_id: services.id)
@user = User.create(email:'joewebworkflow@gmail.com', team_id: sales.id)
@user = User.create(email:'georgewebworkflow@gmail.com', team_id: purchasing.id)
@user = User.create(email:'alwebworkflow@gmail.com', team_id: receiving.id)
@user = User.create(email:'billwebworkflow@gmail.com', team_id: accounts_receivable.id)


@process = ProcessFlow.create(step_number: 1, step_name:'Take Order', team_id: sales.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Book Measurments', team_id: services.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Take Measurments', team_id: services.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Provide Quote', team_id: services.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Invite Customer Option', team_id: sales.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Order liner', team_id: purchasing.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Receive Liner', team_id: receiving.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Book Installation', team_id: services.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Install Liner', team_id: services.id)
@process = ProcessFlow.create(step_number: 2, step_name:'Invoice Customer', team_id: accounts_receivable.id)
