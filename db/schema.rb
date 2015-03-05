# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 201502252114231) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "empresas", force: true do |t|
    t.string   "nome"
    t.string   "cnpj"
    t.string   "telefone"
    t.string   "endereco"
    t.string   "cidade"
    t.string   "estado"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.datetime "logo_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
    t.string   "razao_social"
    t.string   "responsavel"
    t.text     "observacao"
    t.string   "email"
  end

  create_table "fornecedores", force: true do |t|
    t.string   "nome"
    t.string   "razao_social"
    t.string   "cnpj"
    t.string   "email"
    t.string   "telefone"
    t.string   "responsavel"
    t.string   "cidade"
    t.string   "estado"
    t.text     "observacao"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "empresa_id"
  end

  add_index "fornecedores", ["empresa_id"], name: "index_fornecedores_on_empresa_id", using: :btree

  create_table "redespachos", force: true do |t|
    t.string   "remetente"
    t.string   "destinatario"
    t.string   "destinatario_cidade"
    t.decimal  "valor_redespacho",                     precision: 10, scale: 2, default: 0.0
    t.decimal  "valor_comissao",                       precision: 10, scale: 2, default: 0.0
    t.decimal  "valor_frete",                          precision: 10, scale: 2, default: 0.0
    t.integer  "volume"
    t.decimal  "peso",                                 precision: 10, scale: 2, default: 0.0
    t.decimal  "nf_valor",                             precision: 10, scale: 2, default: 0.0
    t.integer  "nf_numero"
    t.datetime "data_envio"
    t.datetime "data_entrega"
    t.string   "recebido_por"
    t.string   "jadlog_lista_numero"
    t.string   "jadlog_conhecimento_numero"
    t.datetime "created_at",                                                                  null: false
    t.datetime "updated_at",                                                                  null: false
    t.string   "remetente_cidade"
    t.string   "forma_pagamento"
    t.integer  "fornecedor_id"
    t.string   "tipo_redespacho",            limit: 3
    t.string   "status",                     limit: 3
    t.integer  "empresa_id"
  end

  add_index "redespachos", ["empresa_id"], name: "index_redespachos_on_empresa_id", using: :btree

  create_table "tipo_pagamentos", force: true do |t|
    t.string   "nome"
    t.integer  "status",     default: 1
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: true do |t|
    t.string   "nome"
    t.string   "email",                  default: "",        null: false
    t.string   "encrypted_password",     default: "",        null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,         null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "status",                 default: "Inativo"
    t.integer  "empresa_id"
    t.string   "role"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["empresa_id"], name: "index_users_on_empresa_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
