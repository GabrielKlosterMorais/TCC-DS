import { useEffect, useState } from 'react'
import './styles.css'
import AdmNavBar from '../../../components/admNavBat'

interface Agendamento {
  _id: string
  petId: {
    _id: string
    nome: string
    clienteId?: {
      nomeCliente: string
    }
  }
  servicoId: {
    nome: string
  }
  data: string
  hora: string
  status: 'pendente' | 'confirmado' | 'cancelado'
  observacoes?: string
}

function AgendamentosAdmin() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [loading, setLoading] = useState(true)

  const carregarAgendamentos = async () => {
    try {
      const res = await fetch('http://localhost:3001/Agendamento')
      const data = await res.json()

      setAgendamentos(data.data || [])
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarAgendamentos()
  }, [])

  const atualizarStatus = async (
    agendamento: Agendamento,
    status: 'confirmado' | 'cancelado'
  ) => {
    try {
      await fetch(
        `http://localhost:3001/Agendamento/${agendamento._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            petId: agendamento.petId._id,
            servicoId: agendamento.servicoId,
            data: agendamento.data,
            hora: agendamento.hora,
            status,
            observacoes: agendamento.observacoes
          })
        }
      )

      carregarAgendamentos()
    } catch (error) {
      console.error('Erro ao atualizar:', error)
    }
  }

  const pendentes = agendamentos.filter(
    (item) => item.status === 'pendente'
  )

  const confirmados = agendamentos.filter(
    (item) => item.status === 'confirmado'
  )

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  const Card = ({ item }: { item: Agendamento }) => (
    <div className="agendamento-card">

      <div>
        <span>Pet</span>
        <strong>{item.petId?.nome}</strong>
      </div>

      <div>
        <span>Cliente</span>
        <strong>
          {item.petId?.clienteId?.nomeCliente || 'Não informado'}
        </strong>
      </div>

      <div>
        <span>Serviço</span>
        <strong>{item.servicoId?.nome}</strong>
      </div>

      <div>
        <span>Data</span>
        <strong>{formatarData(item.data)}</strong>
      </div>

      <div>
        <span>Horário</span>
        <strong>{item.hora}</strong>
      </div>

      <div className="status">
        <span>Status</span>
        <strong className={item.status}>
          {item.status === 'pendente' ? 'Pendente' : 'Confirmado'}
        </strong>
      </div>

      {item.status === 'pendente' && (
        <div className="actions">
          <button
            className="confirmar"
            onClick={() => atualizarStatus(item, 'confirmado')}
          >
            Confirmar
          </button>

          <button
            className="cancelar"
            onClick={() => atualizarStatus(item, 'cancelado')}
          >
            Cancelar
          </button>
        </div>
      )}

    </div>
  )

  return (
    <div className="agendamentos-page">

      <AdmNavBar />

      <main className="agendamentos-container">

        <header className="page-header">
          <span>ÁREA ADMINISTRATIVA</span>
          <h1>Agendamentos</h1>
          <p>
            Visualize e gerencie os agendamentos do PetCare.
          </p>
        </header>

        {loading ? (
          <p>Carregando agendamentos...</p>
        ) : (
          <>
            <section>
              <div className="section-title">
                <h2>Agendamentos pendentes</h2>
                <span>{pendentes.length}</span>
              </div>

              {pendentes.length === 0 ? (
                <p className="empty">
                  Nenhum agendamento pendente.
                </p>
              ) : (
                <div className="lista">
                  {pendentes.map((item) => (
                    <Card key={item._id} item={item} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="section-title">
                <h2>Agendamentos confirmados</h2>
                <span>{confirmados.length}</span>
              </div>

              {confirmados.length === 0 ? (
                <p className="empty">
                  Nenhum agendamento confirmado.
                </p>
              ) : (
                <div className="lista">
                  {confirmados.map((item) => (
                    <Card key={item._id} item={item} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

      </main>

    </div>
  )
}

export default AgendamentosAdmin