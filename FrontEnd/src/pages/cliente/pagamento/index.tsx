import { useEffect, useState } from 'react'
import LogNavbar from '../../../components/logNavBar'
import './styles.css'

interface Pagamento {
  _id: string
  clienteId: string | {
    _id: string
    nomeCliente: string
  }
  agendamentoId: {
    _id: string
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
  dataPagamento?: string
  valor: number
}

function Pagamento() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [pagamentoSelecionado, setPagamentoSelecionado] =
    useState<Pagamento | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const carregarPagamentos = async () => {
      try {
        const userData = localStorage.getItem('user')

        if (!userData) {
          window.location.href = '/login'
          return
        }

        const usuario = JSON.parse(userData)

        const res = await fetch(
          'http://localhost:3001/Pagamento'
        )

        if (!res.ok) {
          throw new Error('Erro ao buscar pagamentos')
        }

        const data = await res.json()

        const pagamentosCliente = data.data.filter(
          (pagamento: Pagamento) => {
            const clienteId =
              typeof pagamento.clienteId === 'string'
                ? pagamento.clienteId
                : pagamento.clienteId?._id

            return clienteId === usuario.id
          }
        )

        setPagamentos(pagamentosCliente)

      } catch (error) {
        console.error(error)
        setError(
          'Não foi possível carregar os pagamentos.'
        )
      } finally {
        setLoading(false)
      }
    }

    carregarPagamentos()
  }, [])

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  return (
    <div className="pagamento-page">

      <LogNavbar />

      <main className="pagamento-container">

        <div className="pagamento-header">

          <span>PAGAMENTOS</span>

          <h1>Seus pagamentos</h1>

          <p>
            Consulte seus pagamentos e quite os pagamentos
            pendentes dos seus agendamentos.
          </p>

        </div>

        {loading && (
          <p>Carregando pagamentos...</p>
        )}

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          pagamentos.length === 0 && (
            <div className="empty-payment">

              <h2>Nenhum pagamento encontrado</h2>

              <p>
                Quando um agendamento for confirmado,
                o pagamento aparecerá aqui.
              </p>

            </div>
          )}

        <div className="payments-list">

          {pagamentos.map((pagamento) => (

            <div
              className={`payment-card ${pagamento.status}`}
              key={pagamento._id}
            >

              <div className="payment-info">

                <span className="payment-status">
                  {pagamento.status === 'pendente'
                    ? 'PAGAMENTO PENDENTE'
                    : pagamento.status === 'pago'
                    ? 'PAGAMENTO REALIZADO'
                    : 'PAGAMENTO CANCELADO'}
                </span>

                <h2>
                  {pagamento.agendamentoId?.servicoId?.nome ||
                    'Serviço'}
                </h2>

                <p>
                  Pet:{' '}
                  {pagamento.agendamentoId?.petId?.nome ||
                    'Pet'}
                </p>

                <p>
                  Data:{' '}
                  {pagamento.agendamentoId?.data
                    ? formatarData(
                        pagamento.agendamentoId.data
                      )
                    : '-'}
                  {' às '}
                  {pagamento.agendamentoId?.hora || '-'}
                </p>

              </div>

              <div className="payment-value">

                <span>Valor</span>

                <strong>
                  {formatarPreco(pagamento.valor)}
                </strong>

                {pagamento.status === 'pendente' && (

                  <button
                    onClick={() =>
                      setPagamentoSelecionado(pagamento)
                    }
                  >
                    Pagar agora
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </main>

      {pagamentoSelecionado && (

        <div className="payment-overlay">

          <div className="payment-modal">

            <button
              className="close-payment"
              onClick={() =>
                setPagamentoSelecionado(null)
              }
            >
              ×
            </button>

            <span className="modal-label">
              PAGAMENTO
            </span>

            <h2>
              Confirmar pagamento
            </h2>

            <div className="payment-details">

              <div>
                <span>Serviço</span>

                <strong>
                  {pagamentoSelecionado.agendamentoId
                    ?.servicoId?.nome || 'Serviço'}
                </strong>
              </div>

              <div>
                <span>Pet</span>

                <strong>
                  {pagamentoSelecionado.agendamentoId
                    ?.petId?.nome || 'Pet'}
                </strong>
              </div>

              <div>
                <span>Data</span>

                <strong>
                  {pagamentoSelecionado.agendamentoId?.data
                    ? formatarData(
                        pagamentoSelecionado.agendamentoId.data
                      )
                    : '-'}
                </strong>
              </div>

              <div>
                <span>Horário</span>

                <strong>
                  {pagamentoSelecionado.agendamentoId?.hora ||
                    '-'}
                </strong>
              </div>

            </div>

            <div className="modal-total">

              <span>Total</span>

              <strong>
                {formatarPreco(
                  pagamentoSelecionado.valor
                )}
              </strong>

            </div>

            <div className="payment-method">

              <label>
                Forma de pagamento
              </label>

              <select defaultValue="pix">

                <option value="pix">
                  PIX
                </option>

                <option value="cartao">
                  Cartão
                </option>

                <option value="dinheiro">
                  Dinheiro
                </option>

              </select>

            </div>

            <button
              className="confirm-payment-button"
              onClick={() =>
                setPagamentoSelecionado(null)
              }
            >
              Confirmar pagamento
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default Pagamento