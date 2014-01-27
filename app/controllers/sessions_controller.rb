class SessionsController < ApplicationController
  before_filter :ban_filter
  before_filter :require_logout, :only => :create
  before_filter :require_authentication, :only => :destroy

  def create
    eval_user_email = params[:user][:email]
    @user = User.find_by_credentials(params[:user])
    if(@user)
      log_in(@user)
      render :json => current_user.to_json(:only => [:id, :email, :name]).html_safe
    else
      @user = User.find_by_email(eval_user_email)
      if @user
        message = "Hey there,"
        message.concat(" it looks like you're trying to sign as #{eval_user_email}.")
        message.concat(" We couldn't confirm the password you provided. You can either")
        message.concat(" enter a different password or change the e-mail to")
        message.concat(" sign in or sign up (if we don't already have the e-mail)!")
        message.concat("\n\n(We're also working on a reset-password system - contact us if")
        message.concat(" you need help.)")

        render :json => {:errors => message, :type => "email_found"}, :status => :unauthorized
      elsif(is_valid_email?(params[:user][:email]))
        message = "Hmm. We can't find that e-mail in our database."
        message.concat(" Are you new here? You can enter your password again")
        message.concat(" below to confirm, or click the e-mail you")
        message.concat(" entered to change it.")
        render :json => {:errors => message, :type => "email_not_found"}, :status => :unauthorized
      else
        render :json => {:errors => "Invalid e-mail address!"}, :status => :unauthorized
      end
    end
  end

  def destroy
    log_out
    render :json => {"message-alerts" => "See you later!"}
  end

  def show
    if logged_in?
      render :json => current_user.to_json(:only => [:id, :email, :name]).html_safe
    else
      render :json => {:errors => "User not logged in"}, :status => 401
    end
  end
end