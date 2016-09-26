require 'test_helper'

class WorkItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @work_item = work_items(:one)
  end

  test "should get index" do
    get work_items_url
    assert_response :success
  end

  test "should get new" do
    get new_work_item_url
    assert_response :success
  end

  test "should create work_item" do
    assert_difference('WorkItem.count') do
      post work_items_url, params: { work_item: { customer: @work_item.customer, history_text: @work_item.history_text, moved_to_queue: @work_item.moved_to_queue, open: @work_item.open, step_number: @work_item.step_number, team: @work_item.team, user: @work_item.user } }
    end

    assert_redirected_to work_item_url(WorkItem.last)
  end

  test "should show work_item" do
    get work_item_url(@work_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_work_item_url(@work_item)
    assert_response :success
  end

  test "should update work_item" do
    patch work_item_url(@work_item), params: { work_item: { customer: @work_item.customer, history_text: @work_item.history_text, moved_to_queue: @work_item.moved_to_queue, open: @work_item.open, step_number: @work_item.step_number, team: @work_item.team, user: @work_item.user } }
    assert_redirected_to work_item_url(@work_item)
  end

  test "should destroy work_item" do
    assert_difference('WorkItem.count', -1) do
      delete work_item_url(@work_item)
    end

    assert_redirected_to work_items_url
  end
end
