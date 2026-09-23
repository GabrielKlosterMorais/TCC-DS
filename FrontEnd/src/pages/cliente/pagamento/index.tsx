import { useEffect, useState } from 'react'
import LogNavbar from '../../../components/logNavBar'
import './styles.css'


interface Pagamento {

  _id: string

  clienteId:
    | string
    | {
        _id: string
        nomeCliente: string
      }

  agendamentoId: {

    _id: string

    petId?: {
      _id?: string
      nome: string
    }

    servicoId?: {
      _id?: string
      nome: string
      preco?: number
    }

    data: string
    hora: string
  }

  formaPagamento: string

  status:
    | 'pendente'
    | 'pago'
    | 'cancelado'

  valor: number
}


function Pagamento() {

  const [pagamentos, setPagamentos] =
    useState<Pagamento[]>([])

  const [selecionado, setSelecionado] =
    useState<Pagamento | null>(null)

  const [formaPagamento, setFormaPagamento] =
    useState('pix')

  const [loading, setLoading] =
    useState(true)


  // =========================================================
  // CARREGAR PAGAMENTOS
  // =========================================================

  const carregarPagamentos = async () => {

    try {

      setLoading(true)

      const user = localStorage.getItem('user')

      if (!user) {

        window.location.href = '/login'

        return
      }


      const usuario = JSON.parse(user)


      // Aceita tanto "id" quanto "_id".
      const usuarioId =
        usuario.id || usuario._id


      if (!usuarioId) {

        console.error(
          'Usuário não possui id ou _id:',
          usuario
        )

        return
      }


      const res = await fetch(
        'http://localhost:3001/Pagamento'
      )


      const data = await res.json()


      if (!res.ok) {

        throw new Error(
          data?.message ||
          'Erro ao carregar pagamentos.'
        )
      }


      const todosPagamentos =
        Array.isArray(data.data)
          ? data.data
          : []


      // =====================================================
      // FILTRA OS PAGAMENTOS DO CLIENTE LOGADO
      // =====================================================

      const meusPagamentos =
        todosPagamentos.filter(
          (pagamento: Pagamento) => {

            const clienteId =
              typeof pagamento.clienteId === 'string'
                ? pagamento.clienteId
                : pagamento.clienteId?._id


            return String(clienteId) === String(usuarioId)
          }
        )


      console.log(
        'ID do usuário logado:',
        usuarioId
      )

      console.log(
        'Pagamentos recebidos:',
        todosPagamentos
      )

      console.log(
        'Meus pagamentos:',
        meusPagamentos
      )


      setPagamentos(meusPagamentos)


    } catch (error) {

      console.error(
        'Erro ao carregar pagamentos:',
        error
      )

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    carregarPagamentos()

  }, [])


  // =========================================================
  // FORMATAR PREÇO
  // =========================================================

  const formatarPreco = (valor: number) => {

    return valor.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    )
  }


  // =========================================================
  // FORMATAR DATA
  // =========================================================

  const formatarData = (data: string) => {

    if (!data) {
      return 'Data não informada'
    }

    return new Date(data)
      .toLocaleDateString('pt-BR')
  }


  // =========================================================
  // CONFIRMAR PAGAMENTO
  // =========================================================

  const confirmarPagamento = async () => {

    if (!selecionado) {
      return
    }


    try {

      const clienteId =
        typeof selecionado.clienteId === 'string'
          ? selecionado.clienteId
          : selecionado.clienteId._id


      const res = await fetch(

        `http://localhost:3001/Pagamento/${selecionado._id}`,

        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            clienteId,

            agendamentoId:
              selecionado.agendamentoId._id,

            formaPagamento,

            status: 'pago',

            valor: selecionado.valor

          })
        }
      )


      const data = await res.json()


      if (!res.ok) {

        throw new Error(
          data?.message ||
          'Erro ao confirmar pagamento.'
        )
      }


      setSelecionado(null)


      await carregarPagamentos()


    } catch (error) {

      console.error(
        'Erro ao confirmar pagamento:',
        error
      )

      alert(
        error instanceof Error
          ? error.message
          : 'Não foi possível confirmar o pagamento.'
      )
    }
  }


  // =========================================================
  // INTERFACE
  // =========================================================

  return (

    <div className="pagamento-page">

      <LogNavbar />


      <main className="pagamento-container">


        <div className="pagamento-header">

          <span>
            PAGAMENTOS
          </span>

          <h1>
            Seus pagamentos
          </h1>

          <p>
            Consulte seus pagamentos e quite os pagamentos
            pendentes dos seus agendamentos.
          </p>

        </div>


        {loading && (

          <p>
            Carregando pagamentos...
          </p>

        )}


        {!loading &&
          pagamentos.length === 0 && (

          <div className="empty-payment">

            <h2>
              Nenhum pagamento encontrado
            </h2>

            <p>
              Quando um agendamento for confirmado,
              o pagamento aparecerá aqui.
            </p>

          </div>

        )}


        <div className="payments-list">

          {pagamentos.map(pagamento => (

            <div
              className={`payment-card ${pagamento.status}`}
              key={pagamento._id}
            >


              <div className="payment-info">

                <span className="payment-status">

                  {pagamento.status === 'pendente'

                    ? 'PAGAMENTO PENDENTE'

                    : pagamento.status === 'pago'

                    ? 'PAGAMENTO FINALIZADO'

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

                  {formatarData(
                    pagamento.agendamentoId?.data
                  )}

                  {' às '}

                  {pagamento.agendamentoId?.hora ||
                    '--:--'}

                </p>

              </div>


              <div className="payment-value">

                <span>
                  Valor
                </span>


                <strong>
                  {formatarPreco(
                    pagamento.valor
                  )}
                </strong>


                {pagamento.status === 'pendente' && (

                  <button
                    onClick={() => {

                      setFormaPagamento(
                        pagamento.formaPagamento ||
                        'pix'
                      )

                      setSelecionado(pagamento)

                    }}
                  >
                    Pagar agora
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </main>


      {/* =====================================================
          MODAL
      ===================================================== */}

      {selecionado && (

        <div className="payment-overlay">

          <div className="payment-modal">


            <button
              className="close-payment"
              onClick={() =>
                setSelecionado(null)
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

                <span>
                  Serviço
                </span>

                <strong>
                  {selecionado
                    .agendamentoId
                    ?.servicoId
                    ?.nome ||
                    'Serviço'}
                </strong>

              </div>


              <div>

                <span>
                  Pet
                </span>

                <strong>
                  {selecionado
                    .agendamentoId
                    ?.petId
                    ?.nome ||
                    'Pet'}
                </strong>

              </div>


              <div>

                <span>
                  Data
                </span>

                <strong>
                  {formatarData(
                    selecionado
                      .agendamentoId
                      .data
                  )}
                </strong>

              </div>


              <div>

                <span>
                  Horário
                </span>

                <strong>
                  {selecionado
                    .agendamentoId
                    .hora}
                </strong>

              </div>

            </div>


            <div className="modal-total">

              <span>
                Total
              </span>

              <strong>
                {formatarPreco(
                  selecionado.valor
                )}
              </strong>

            </div>


            <div className="payment-method">

              <label>
                Forma de pagamento
              </label>


              <select
                value={formaPagamento}
                onChange={e =>
                  setFormaPagamento(
                    e.target.value
                  )
                }
              >

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
              onClick={confirmarPagamento}
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