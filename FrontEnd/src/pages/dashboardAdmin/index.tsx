import { useEffect, useState } from 'react'
import './styles.css'
import AdmNavBar from '../../components/admNavBat'

interface Pet {
  _id: string
  nome: string
  clienteId?: {
    nomeCliente: string
  }
}

interface Servico {
  _id: string
  nome: string
}

interface Agendamento {
  _id: string
  petId: Pet
  servicoId: Servico
  data: string
  hora: string
  status: 'pendente' | 'confirmado' | 'cancelado'
  observacoes?: string
}

interface Pagamento {
  _id: string
  status: string
}

function DashboardAdmin() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  const carregarDados = async () => {
    try {
      const [agendamentosRes, pagamentosRes, petsRes] = await Promise.all([
        fetch('http://localhost:3001/Agendamento'),
        fetch('http://localhost:3001/Pagamento'),
        fetch('http://localhost:3001/Pet')
      ])

      const agendamentosData = await agendamentosRes.json()
      const pagamentosData = await pagamentosRes.json()
      const petsData = await petsRes.json()

      setAgendamentos(agendamentosData.data || [])
      setPagamentos(pagamentosData.data || [])
      setPets(petsData.data || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const atualizarStatus = async (
    agendamento: Agendamento,
    status: 'confirmado' | 'cancelado'
  ) => {
    try {
      await fetch(`http://localhost:3001/Agendamento/${agendamento._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          petId: agendamento.petId._id,
          servicoId: agendamento.servicoId._id,
          data: agendamento.data,
          hora: agendamento.hora,
          status,
          observacoes: agendamento.observacoes
        })
      })

      carregarDados()
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
    }
  }

  const pendentes = agendamentos.filter(
    (agendamento) => agendamento.status === 'pendente'
  )

  const confirmados = agendamentos.filter(
    (agendamento) => agendamento.status === 'confirmado'
  )

  const pagamentosPendentes = pagamentos.filter(
    (pagamento) => pagamento.status === 'pendente'
  )

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  return (
    <div className="admin-page">

      <AdmNavBar />

      <main className="admin-container">

        <div className="admin-header">
          <span>ÁREA ADMINISTRATIVA</span>
          <h2>Dashboard</h2>
          <p>Gerencie os agendamentos e pagamentos do PetCare.</p>
        </div>

        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <>
            <div className="stats">

              <div className="stat-card">
                <span>Agendamentos pendentes</span>
                <strong>{pendentes.length}</strong>
              </div>

              <div className="stat-card">
                <span>Agendamentos confirmados</span>
                <strong>{confirmados.length}</strong>
              </div>

              <div className="stat-card">
                <span>Pagamentos pendentes</span>
                <strong>{pagamentosPendentes.length}</strong>
              </div>

              <div className="stat-card">
                <span>Pets cadastrados</span>
                <strong>{pets.length}</strong>
              </div>

            </div>

            <section className="appointments">

              <div className="section-header">
                <div>
                  <span>ATENÇÃO</span>
                  <h2>Agendamentos pendentes</h2>
                </div>

                <a href="/admin/agendamentos">
                  Ver todos →
                </a>
              </div>

              {pendentes.length === 0 ? (
                <p>Nenhum agendamento pendente.</p>
              ) : (
                pendentes.map((agendamento) => (

                  <div className="appointment" key={agendamento._id}>

                    <div>
                      <strong>{agendamento.petId?.nome}</strong>
                      <span>
                        {agendamento.petId?.clienteId?.nomeCliente || 'Cliente'}
                      </span>
                    </div>

                    <div>
                      <strong>{agendamento.servicoId?.nome}</strong>
                      <span>{formatarData(agendamento.data)}</span>
                    </div>

                    <strong>{agendamento.hora}</strong>

                    <div className="actions">

                      <button
                        onClick={() =>
                          atualizarStatus(agendamento, 'confirmado')
                        }
                      >
                        Confirmar
                      </button>

                      <button
                        onClick={() =>
                          atualizarStatus(agendamento, 'cancelado')
                        }
                      >
                        Cancelar
                      </button>

                    </div>

                  </div>

                ))
              )}

            </section>
          </>
        )}

      </main>

    </div>
  )
}

export default DashboardAdmin