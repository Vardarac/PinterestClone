module ApplicationHelper
  def log_in(user)
    session[:session_token] = user.session_token
  end

  def log_out
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def require_logout
    if(logged_in?)
      render :json => {:errors => "You can't do that when you're already logged in!"}
    end
    nil
  end

  def require_ownership_or_admin
    if current_user.is_admin? || current_user.id == params[:id]
      return nil
    else
      render :json => {:errors => "You don't have permission to do that :("}
    end
  end

  def require_friendship_with
    # To be filled in phase four
  end

  def require_authentication
    unless logged_in?
      render :json => {:errors => "You have to be logged in to do that!"}, :status => 422
    end
    nil
  end

  def ban_filter
    render :json => {:errors => "http://www.banned.ytmnd.com/"}, :status => 666 if current_user && current_user.is_banned?
  end
end