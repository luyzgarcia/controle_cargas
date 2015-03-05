class AddSupervirToUser < ActiveRecord::Migration
  def change
    add_reference :users, :supervior_id, index: true
  end
end
