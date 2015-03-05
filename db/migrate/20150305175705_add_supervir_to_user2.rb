class AddSupervirToUser2 < ActiveRecord::Migration
  def change
    add_reference :users, :supervisor, index: true
  end
end
