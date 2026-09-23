import { useEffect, useState } from 'react'

import './styles.css'

import AdmNavBar from '../../../components/admNavBar'


interface Agendamento {

  _id: string

  petId: {

    _id: string

    nome: string

    clienteId?: {

      _id?: string

      nomeCliente: string
    }
  }

  servicoId: {

    _id: string

    nome: string
  }

  data: string

  hora: string

  status:  'confirmado' | 'cancelado'

  observacoes?: string

  motivoCancelamento?: string
}


function AgendamentosAdmin() {

  const [agendamentos, setAgendamentos] =
    useState<Agendamento[]>([])

  const [loading, setLoading] =
    useState(true)

  const [cancelando, setCancelando] =
    useState<Agendamento | null>(null)

  const [motivoCancelamento, setMotivoCancelamento] =
    useState('')


  // =========================================================
  // BUSCAR AGENDAMENTOS
  // =========================================================

  const carregarAgendamentos = async () => {

    try {

      setLoading(true)

      const res = await fetch(
        'http://localhost:3001/Agendamento'
      )

      const data = await res.json()

      if (!res.ok) {

        throw new Error(
          data?.message ||
          'Erro ao carregar agendamentos.'
        )
      }

      setAgendamentos(
        Array.isArray(data.data)
          ? data.data
          : []
      )

    } catch (error) {

      console.error(
        'Erro ao carregar agendamentos:',
        error
      )

      alert(
        error instanceof Error
          ? error.message
          : 'Erro ao carregar agendamentos.'
      )

    } finally {

      setLoading(false)
    }
  }


  // =========================================================
  // CARREGAR AO ABRIR A PÁGINA
  // =========================================================

  useEffect(() => {

    carregarAgendamentos()

  }, [])


  // =========================================================
  // ABRIR MODAL DE CANCELAMENTO
  // =========================================================

  const abrirCancelamento = (
    agendamento: Agendamento
  ) => {

    setCancelando(agendamento)

    setMotivoCancelamento('')
  }


  // =========================================================
  // FECHAR MODAL
  // =========================================================

  const fecharCancelamento = () => {

    setCancelando(null)

    setMotivoCancelamento('')
  }


  // =========================================================
  // CANCELAR AGENDAMENTO COMO ADMINISTRADOR
  // =========================================================

  const confirmarCancelamento = async () => {

    if (!cancelando) {
      return
    }

    const motivo =
      motivoCancelamento.trim()


    if (!motivo) {

      alert(
        'Informe o motivo do cancelamento.'
      )

      return
    }


    try {

      const res = await fetch(
        `http://localhost:3001/Agendamento/${cancelando._id}/cancelar/admin`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            motivoCancelamento:
              motivo

          })
        }
      )


      const data =
        await res.json().catch(() => null)


      if (!res.ok) {

        alert(
          data?.message ||
          'Erro ao cancelar agendamento.'
        )

        return
      }


      alert(
        data?.message ||
        'Agendamento cancelado com sucesso.'
      )


      fecharCancelamento()

      await carregarAgendamentos()


    } catch (error) {

      console.error(
        'Erro ao cancelar agendamento:',
        error
      )

      alert(
        'Erro de conexão com o servidor.'
      )
    }
  }


  // =========================================================
  // FORMATAR DATA
  // =========================================================

  const formatarData = (
    data: string
  ) => {

    if (!data) {
      return 'Não informado'
    }

    return new Date(data).toLocaleDateString(
      'pt-BR'
    )
  }


  // =========================================================
  // AGENDAMENTOS CONFIRMADOS
  // =========================================================

  const confirmados =
    agendamentos.filter(
      (item) =>
        item.status === 'confirmado'
    )


  // =========================================================
  // AGENDAMENTOS CANCELADOS
  // =========================================================

  const cancelados =
    agendamentos.filter(
      (item) =>
        item.status === 'cancelado'
    )


  // =========================================================
  // CARD DO AGENDAMENTO
  // =========================================================

  const Card = ({
    item
  }: {
    item: Agendamento
  }) => (

    <div className="agendamento-card">

      {/* PET */}

      <div>

        <span>
          Pet
        </span>

        <strong>
          {item.petId?.nome ||
            'Não informado'}
        </strong>

      </div>


      {/* CLIENTE */}

      <div>

        <span>
          Cliente
        </span>

        <strong>

          {
            item.petId?.clienteId?.nomeCliente ||
            'Não informado'
          }

        </strong>

      </div>


      {/* SERVIÇO */}

      <div>

        <span>
          Serviço
        </span>

        <strong>

          {item.servicoId?.nome ||
            'Não informado'}

        </strong>

      </div>


      {/* DATA */}

      <div>

        <span>
          Data
        </span>

        <strong>

          {formatarData(
            item.data
          )}

        </strong>

      </div>


      {/* HORÁRIO */}

      <div>

        <span>
          Horário
        </span>

        <strong>

          {item.hora ||
            'Não informado'}

        </strong>

      </div>


      {/* STATUS */}

      <div className="status">

        <span>
          Status
        </span>

        <strong
          className={item.status}
        >

          {
            item.status === 'confirmado'
              ? 'Confirmado'
              : 'Cancelado'
          }

        </strong>

      </div>


      {/* =====================================================
          BOTÃO DE CANCELAMENTO
      ===================================================== */}

      {item.status === 'confirmado' && (

        <div className="actions">

          <button
            type="button"
            className="cancelar"
            onClick={() =>
              abrirCancelamento(item)
            }
          >
            Cancelar agendamento
          </button>

        </div>
      )}


      {/* =====================================================
          MOTIVO DO CANCELAMENTO
      ===================================================== */}

      {item.status === 'cancelado' &&
        item.motivoCancelamento && (

          <div className="cancelamento-motivo">

            <span>
              Motivo do cancelamento
            </span>

            <strong>
              {item.motivoCancelamento}
            </strong>

          </div>
        )}

    </div>
  )


  // =========================================================
  // INTERFACE
  // =========================================================

  return (

    <div className="agendamentos-page">

      <AdmNavBar />


      <main className="agendamentos-container">


        {/* CABEÇALHO */}

        <header className="page-header">

          <span>
            ÁREA ADMINISTRATIVA
          </span>

          <h1>
            Agendamentos
          </h1>

          <p>
            Visualize e gerencie os agendamentos do PetCare.
          </p>

        </header>


        {/* ===================================================
            CARREGANDO
        =================================================== */}

        {loading ? (

          <p>
            Carregando agendamentos...
          </p>

        ) : (

          <>


            {/* =================================================
                AGENDAMENTOS CONFIRMADOS
            ================================================= */}

            <section>

              <div className="section-title">

                <h2>
                  Agendamentos confirmados
                </h2>

                <span>
                  {confirmados.length}
                </span>

              </div>


              {confirmados.length === 0 ? (

                <p className="empty">
                  Nenhum agendamento confirmado.
                </p>

              ) : (

                <div className="lista">

                  {confirmados.map(
                    (item) => (

                      <Card
                        key={item._id}
                        item={item}
                      />

                    )
                  )}

                </div>
              )}

            </section>


            {/* =================================================
                AGENDAMENTOS CANCELADOS
            ================================================= */}

            <section>

              <div className="section-title">

                <h2>
                  Agendamentos cancelados
                </h2>

                <span>
                  {cancelados.length}
                </span>

              </div>


              {cancelados.length === 0 ? (

                <p className="empty">
                  Nenhum agendamento cancelado.
                </p>

              ) : (

                <div className="lista">

                  {cancelados.map(
                    (item) => (

                      <Card
                        key={item._id}
                        item={item}
                      />

                    )
                  )}

                </div>
              )}

            </section>

          </>
        )}

      </main>


      {/* =====================================================
          MODAL DE CANCELAMENTO
      ===================================================== */}

      {cancelando && (

        <div
          className="cancelamento-overlay"
          onClick={fecharCancelamento}
        >

          <div
            className="cancelamento-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* FECHAR */}

            <button
              type="button"
              className="cancelamento-close"
              onClick={fecharCancelamento}
            >
              ×
            </button>


            {/* TÍTULO */}

            <h2>
              Cancelar agendamento
            </h2>


            <p>
              Informe o motivo do cancelamento.
            </p>


            {/* INFORMAÇÕES */}

            <div className="cancelamento-info">

              <strong>

                {cancelando.petId?.nome ||
                  'Pet não informado'}

              </strong>


              <span>

                {cancelando.servicoId?.nome ||
                  'Serviço não informado'}

              </span>


              <span>

                {formatarData(
                  cancelando.data
                )}

                {' '}

                às {cancelando.hora}

              </span>

            </div>


            {/* MOTIVO */}

            <label
              htmlFor="motivoCancelamento"
            >
              Motivo do cancelamento
            </label>


            <textarea
              id="motivoCancelamento"
              value={motivoCancelamento}
              onChange={(e) =>
                setMotivoCancelamento(
                  e.target.value
                )
              }
              placeholder="Digite o motivo do cancelamento..."
            />


            {/* AVISO */}

            <div className="cancelamento-aviso">

              <strong>
                Atenção
              </strong>

              <p>
                O cliente será informado sobre
                o cancelamento do agendamento.
              </p>

            </div>


            {/* BOTÕES */}

            <div className="cancelamento-actions">

              <button
                type="button"
                onClick={fecharCancelamento}
              >
                Voltar
              </button>


              <button
                type="button"
                className="confirmar-cancelamento"
                disabled={
                  !motivoCancelamento.trim()
                }
                onClick={
                  confirmarCancelamento
                }
              >
                Confirmar cancelamento
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}


export default AgendamentosAdmin