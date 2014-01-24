class PinsController < ApplicationController
  before_filter :ban_filter

  def index
    @boards = Board.all
    @users = User.all
    @pins = Pin.all

    render :index
  end

  def create
    @pin = Pin.new(params[:pin])
    if @pin.save
      render :json => @pin
    else
      render :json => @pin.errors.full_messages
    end
  end

  def update
    @pin = current_pin.edit_attributes(params[:pin])
    if @pin.save
      render :json => {"message-alerts" => "Pin edits saved!"}
    else
      render :json => @pin.errors.full_messages
    end
  end

  def destroy
    @pin = Pin.find(params[:id])
    if @pin.destroy
      render :json => {"message-alerts" => "Pin deleted!"}
    else
      render :json => {:errors => "Couldn't delete your pin."}
    end
  end
end
