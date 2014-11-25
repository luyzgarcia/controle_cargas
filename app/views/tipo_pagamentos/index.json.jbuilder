json.array!(@tipo_pagamentos) do |tipo_pagamento|
  json.extract! tipo_pagamento, :id, :nome, :status
  json.url tipo_pagamento_url(tipo_pagamento, format: :json)
end
