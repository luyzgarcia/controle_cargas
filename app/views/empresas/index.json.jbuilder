json.array!(@empresas) do |empresa|
  json.extract! empresa, :id, :nome, :razao_social, :cnpj, :email, :telefone, :responsavel, :cidade, :estado, :observacoa
  json.url empresa_url(empresa, format: :json)
end
