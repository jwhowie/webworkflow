require 'test_helper'

class ProcessFlowsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @process_flow = process_flows(:one)
  end

  test "should get index" do
    get process_flows_url
    assert_response :success
  end

  test "should get new" do
    get new_process_flow_url
    assert_response :success
  end

  test "should create process_flow" do
    assert_difference('ProcessFlow.count') do
      post process_flows_url, params: { process_flow: { step_name: @process_flow.step_name, step_number: @process_flow.step_number, team: @process_flow.team } }
    end

    assert_redirected_to process_flow_url(ProcessFlow.last)
  end

  test "should show process_flow" do
    get process_flow_url(@process_flow)
    assert_response :success
  end

  test "should get edit" do
    get edit_process_flow_url(@process_flow)
    assert_response :success
  end

  test "should update process_flow" do
    patch process_flow_url(@process_flow), params: { process_flow: { step_name: @process_flow.step_name, step_number: @process_flow.step_number, team: @process_flow.team } }
    assert_redirected_to process_flow_url(@process_flow)
  end

  test "should destroy process_flow" do
    assert_difference('ProcessFlow.count', -1) do
      delete process_flow_url(@process_flow)
    end

    assert_redirected_to process_flows_url
  end
end
