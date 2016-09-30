# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160930152013) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "business_processes", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_business_processes_on_user_id", using: :btree
  end

  create_table "customers", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "phone"
    t.string   "address_1"
    t.string   "address_2"
    t.string   "city"
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "process_flows", force: :cascade do |t|
    t.integer  "step_number"
    t.string   "step_name"
    t.integer  "team_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "business_process_id"
    t.index ["business_process_id"], name: "index_process_flows_on_business_process_id", using: :btree
    t.index ["team_id"], name: "index_process_flows_on_team_id", using: :btree
  end

  create_table "teams", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_teams_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "email"
    t.integer  "team_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["team_id"], name: "index_users_on_team_id", using: :btree
  end

  create_table "work_items", force: :cascade do |t|
    t.text     "history_text"
    t.integer  "team_id"
    t.integer  "customer_id"
    t.datetime "moved_to_queue"
    t.integer  "open"
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "process_flow_id"
    t.index ["customer_id"], name: "index_work_items_on_customer_id", using: :btree
    t.index ["team_id"], name: "index_work_items_on_team_id", using: :btree
    t.index ["user_id"], name: "index_work_items_on_user_id", using: :btree
  end

  add_foreign_key "business_processes", "users"
end
