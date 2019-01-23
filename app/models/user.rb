class User < ApplicationRecord
  # encrypt password
  has_secure_password

  # Model associations
  has_many :todos, foreign_key: :created_by
  # Validations
  validates_presence_of :name, :email, :password_digest
  validates :password, confirmation: { case_sensitive: true }
  validates :email, uniqueness: true
end
