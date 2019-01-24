class Todo < ApplicationRecord
  # model association
  has_many :items, dependent: :destroy

  # validations
  validates_presence_of :title, :created_by
  validates :title, uniqueness: { scope: :created_by }
end
