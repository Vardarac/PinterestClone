class BoardsController < ApplicationController
  before_filter :ban_filter
  before_filter :require_authentication, :only => [:create, :update, :destroy]
  before_filter :require_ownership_or_admin, :only => :destroy

  def create
    @board = Board.new(params[:board])
    if @board.save
      render :json => @board
    else
      render :json => @board.errors.full_messages
    end
  end

  def update
    @board = current_board.edit_attributes(params[:board])
    if @board.save
      render :json => {"message-alerts" => "Board edits saved!"}
    else
      render :json => @board.errors.full_messages
    end
  end

  def destroy
    @board = Board.find(params[:id])
    if @board.destroy
      render :json => {"message-alerts" => "Board deleted!"}
    else
      render :json => {:errors => "Couldn't delete your board."}
    end
  end

  def index
    @boards = Board.all
    @users = User.all
    @pins = Pin.all

    render :index
  end
end
