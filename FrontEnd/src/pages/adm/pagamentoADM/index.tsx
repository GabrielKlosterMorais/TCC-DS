import { useEffect, useState } from 'react'
import AdmNavBar from '../../../components/admNavBar'
import './styles.css'

interface Pagamento {
  _id: string
  clienteId?: {
    nomeCliente: string
  }
  agendamentoId?: {
    petId?: {
      nome: string
    }
    servicoId?: {
      nome: string
    }
    data: string
    hora: string
  }
  formaPagamento: string
  status: 'pendente' | 'pago' | 'cancelado'
  valor: number
}

function PagamentoAdm() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/Pagamento')
      .then(res => res.json())
      .then(data => setPagamentos(data.data || []))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  const formatarPreco = (valor: number) =>
    valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

  const formatarData = (data: string) =>
    new Date(data).toLocaleDateString('pt-BR')

  return (
    <div className="pagamento-adm-page">

      <AdmNavBar />

      <main className="pagamento-adm-container">

        <div className="pagamento-adm-header">
          <span>ÁREA ADMINISTRATIVA</span>
          <h1>Pagamentos</h1>
          <p>Consulte os pagamentos dos clientes.</p>
        </div>

        {loading ? (
          <p>Carregando pagamentos...</p>
        ) : (

          <div className="pagamentos-adm-list">

            {pagamentos.map(pagamento => (

              <div
                className={`pagamento-adm-card ${pagamento.status}`}
                key={pagamento._id}
              >

                <div className="pagamento-adm-info">

                  <span className="status">
                    {pagamento.status === 'pendente'
                      ? 'PAGAMENTO PENDENTE'
                      : pagamento.status === 'pago'
                      ? 'PAGAMENTO FINALIZADO'
                      : 'PAGAMENTO CANCELADO'}
                  </span>

                  <h2>
                    {pagamento.agendamentoId?.servicoId?.nome || 'Serviço'}
                  </h2>

                  <p>
                    Cliente:{' '}
                    {pagamento.clienteId?.nomeCliente || 'Cliente'}
                  </p>

                  <p>
                    Pet:{' '}
                    {pagamento.agendamentoId?.petId?.nome || 'Pet'}
                  </p>

                  <p>
                    Data:{' '}
                    {pagamento.agendamentoId?.data
                      ? formatarData(pagamento.agendamentoId.data)
                      : '-'}
                    {' às '}
                    {pagamento.agendamentoId?.hora || '-'}
                  </p>

                </div>

                <div className="pagamento-adm-valor">

                  <span>Valor</span>

                  <strong>
                    {formatarPreco(pagamento.valor)}
                  </strong>

                  <small>
                    {pagamento.formaPagamento}
                  </small>

                </div>

              </div>

            ))}

            {pagamentos.length === 0 && (
              <p>Nenhum pagamento encontrado.</p>
            )}

          </div>

        )}

      </main>

    </div>
  )
}

export default PagamentoAdm