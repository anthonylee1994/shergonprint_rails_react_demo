module ExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  # Define custom error subclasses - rescue catches `StandardErrors`
  class AuthenticationError < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end

  included do
    # Define custom handlers
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two

    rescue_from ActiveRecord::RecordNotFound do |e|
      json_response({ message: e.message }, :not_found)
    end
  end

  private

  def format_error(e)
    if (defined? e.record)
      messages = e.record.errors.messages
      messages[:codes] = messages.map {|k,v| k.to_s.downcase << "_error" }
    else
      messages = {}
      messages[:code] = e.message.to_s.downcase.gsub(' ', '_')
    end
    messages
  end

  # JSON response with message; Status code 422 - unprocessable entity
  def four_twenty_two(e)
    error = format_error e
    json_response({ error: error }, :unprocessable_entity)
  end

  # JSON response with message; Status code 401 - Unauthorized
  def unauthorized_request(e)
    error = format_error e
    json_response({ error: error }, :unauthorized)
  end
end