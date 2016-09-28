class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception
  before_action :set_customer_item
  helper_method :current_user

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  private
  def set_customer_item
    @customer = Customer.new
  end

end
