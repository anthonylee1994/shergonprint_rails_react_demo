module Api
  module V1
    module Response
      def json_response(object, status = :ok)
        render json: object, status: status
      end
    end
  end
end