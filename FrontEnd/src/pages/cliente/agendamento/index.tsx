import { useEffect, useState } from 'react'
import './styles.css'
import Navbar from '../../../components/navBar'

interface Pet {
  _id: string
  nome: string
  clienteId: string
}

interface Servico {
  _id: string
  nome: string
  descricao: string
  preco: number
  duracao: number
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

function Agendamento() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])

  const [mesAtual, setMesAtual] = useState(new Date())
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null)

  const [petId, setPetId] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [hora, setHora] = useState('')
  const [observacoes, setObservacoes] = useState('')

  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const usuario = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const [petsRes, servicosRes, agendamentosRes] = await Promise.all([
        fetch('http://localhost:3001/Pet'),
        fetch('http://localhost:3001/Servico'),
        fetch('http://localhost:3001/Agendamento')
      ])

      const petsData = await petsRes.json()
      const servicosData = await servicosRes.json()
      const agendamentosData = await agendamentosRes.json()

      const meusPets = (petsData.data || []).filter(
        (pet: Pet) =>
          String(pet.clienteId) === String(usuario.id)
      )

      const meusPetsIds = meusPets.map((pet: Pet) => String(pet._id))

      const meusAgendamentos = (agendamentosData.data || []).filter(
        (agendamento: Agendamento) =>
          meusPetsIds.includes(String(agendamento.petId?._id))
      )

      setPets(meusPets)
      setServicos(servicosData.data || [])
      setAgendamentos(meusAgendamentos)

    } catch {
      setErro('Erro ao carregar os dados.')
    }
  }

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const primeiroDia = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth(),
    1
  )

  const ultimoDia = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth() + 1,
    0
  )

  const diasNoMes = ultimoDia.getDate()

  const inicioSemana = primeiroDia.getDay()

  const dias = []

  for (let i = 0; i < inicioSemana; i++) {
    dias.push(null)
  }

  for (let i = 1; i <= diasNoMes; i++) {
    dias.push(
      new Date(
        mesAtual.getFullYear(),
        mesAtual.getMonth(),
        i
      )
    )
  }

  const voltarMes = () => {
    setMesAtual(
      new Date(
        mesAtual.getFullYear(),
        mesAtual.getMonth() - 1,
        1
      )
    )
  }

  const avancarMes = () => {
    setMesAtual(
      new Date(
        mesAtual.getFullYear(),
        mesAtual.getMonth() + 1,
        1
      )
    )
  }

  const mesmoDia = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    )
  }

  const agendamentosDoDia = (dia: Date) => {
    return agendamentos.filter((agendamento) => {
      const data = new Date(agendamento.data)
      return mesmoDia(data, dia)
    })
  }

  const selecionarDia = (dia: Date) => {
    if (dia < hoje) return

    setDiaSelecionado(dia)
    setMensagem('')
    setErro('')
  }

  const criarAgendamento = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!diaSelecionado) {
      setErro('Selecione um dia.')
      return
    }

    if (!petId || !servicoId || !hora) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    const conflito = agendamentos.some((agendamento) => {
      return (
        mesmoDia(new Date(agendamento.data), diaSelecionado) &&
        agendamento.hora === hora &&
        agendamento.status === 'pendente'
      )
    })

    if (conflito) {
      setErro('Já existe um agendamento pendente neste horário.')
      return
    }

    setLoading(true)
    setErro('')
    setMensagem('')

    try {
      const res = await fetch(
        'http://localhost:3001/Agendamento',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            petId,
            servicoId,
            data: diaSelecionado.toISOString(),
            hora,
            status: 'pendente',
            observacoes
          })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setErro(data.message || 'Erro ao criar agendamento.')
        return
      }

      setMensagem('Agendamento criado com sucesso.')

      setPetId('')
      setServicoId('')
      setHora('')
      setObservacoes('')

      carregarDados()

    } catch {
      setErro('Erro de conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  const nomeMes = mesAtual.toLocaleDateString(
    'pt-BR',
    {
      month: 'long',
      year: 'numeric'
    }
  )

  return (
    <div className="agendamento-page">

      <Navbar />

      <main className="agendamento-container">

        <header className="agendamento-header">
          <span>AGENDAMENTO</span>

          <h1>
            Cuide do seu pet
            <strong> com facilidade.</strong>
          </h1>

          <p>
            Escolha um dia disponível e agende um serviço
            para o seu pet.
          </p>
        </header>

        <section className="agendamento-content">

          <div className="calendar-card">

            <div className="calendar-header">

              <button onClick={voltarMes}>
                ‹
              </button>

              <h2>
                {nomeMes}
              </h2>

              <button onClick={avancarMes}>
                ›
              </button>

            </div>

            <div className="calendar-weekdays">
              <span>Dom</span>
              <span>Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
            </div>

            <div className="calendar-grid">

              {dias.map((dia, index) => {

                if (!dia) {
                  return (
                    <div
                      key={index}
                      className="calendar-empty"
                    />
                  )
                }

                const anteriores = dia < hoje

                const compromissos =
                  agendamentosDoDia(dia)

                const pendente =
                  compromissos.some(
                    (a) => a.status === 'pendente'
                  )

                const confirmado =
                  compromissos.some(
                    (a) => a.status === 'confirmado'
                  )

                const cancelado =
                  compromissos.some(
                    (a) => a.status === 'cancelado'
                  )

                const selecionado =
                  diaSelecionado &&
                  mesmoDia(diaSelecionado, dia)

                return (
                  <button
                    key={index}
                    className={`
                      calendar-day
                      ${anteriores ? 'dia-anterior' : ''}
                      ${selecionado ? 'selected' : ''}
                      ${pendente ? 'pendente' : ''}
                      ${confirmado ? 'confirmado' : ''}
                      ${cancelado ? 'cancelado' : ''}
                    `}
                    disabled={anteriores}
                    onClick={() => selecionarDia(dia)}
                  >

                    <span>
                      {dia.getDate()}
                    </span>

                    {compromissos.length > 0 && (
                      <div className="appointment-dots">

                        {pendente && (
                          <span className="dot pendente-dot" />
                        )}

                        {confirmado && (
                          <span className="dot confirmado-dot" />
                        )}

                        {cancelado && (
                          <span className="dot cancelado-dot" />
                        )}

                      </div>
                    )}

                  </button>
                )
              })}

            </div>

            <div className="calendar-legend">

              <span>
                <i className="legend-dot pendente-dot" />
                Pendente
              </span>

              <span>
                <i className="legend-dot confirmado-dot" />
                Confirmado
              </span>

              <span>
                <i className="legend-dot cancelado-dot" />
                Cancelado
              </span>

            </div>

            {diaSelecionado && (
              <div className="day-appointments">

                <h3>
                  Compromissos do dia
                </h3>

                {agendamentosDoDia(diaSelecionado).length === 0 ? (

                  <p>
                    Nenhum compromisso neste dia.
                  </p>

                ) : (

                  agendamentosDoDia(diaSelecionado).map(
                    (agendamento) => (

                      <div
                        className={`day-appointment ${agendamento.status}`}
                        key={agendamento._id}
                      >

                        <div>
                          <strong>
                            {agendamento.hora}
                          </strong>

                          <span>
                            {agendamento.petId?.nome}
                          </span>
                        </div>

                        <span>
                          {agendamento.servicoId?.nome}
                        </span>

                      </div>

                    )
                  )
                )}

              </div>
            )}

          </div>

          <div className="form-card">

            <h2>
              Novo agendamento
            </h2>

            <p className="form-description">
              {diaSelecionado
                ? `Dia selecionado: ${diaSelecionado.toLocaleDateString('pt-BR')}`
                : 'Selecione um dia no calendário.'}
            </p>

            <form onSubmit={criarAgendamento}>

              <div className="input-group">

                <label>
                  Pet
                </label>

                <select
                  value={petId}
                  onChange={(e) =>
                    setPetId(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Selecione seu pet
                  </option>

                  {pets.map((pet) => (
                    <option
                      key={pet._id}
                      value={pet._id}
                    >
                      {pet.nome}
                    </option>
                  ))}

                </select>

              </div>

              <div className="input-group">

                <label>
                  Serviço
                </label>

                <select
                  value={servicoId}
                  onChange={(e) =>
                    setServicoId(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Selecione um serviço
                  </option>

                  {servicos.map((servico) => (
                    <option
                      key={servico._id}
                      value={servico._id}
                    >
                      {servico.nome}
                    </option>
                  ))}

                </select>

              </div>

              <div className="input-group">

                <label>
                  Horário
                </label>

                <input
                  type="time"
                  value={hora}
                  onChange={(e) =>
                    setHora(e.target.value)
                  }
                  required
                />

              </div>

              <div className="input-group">

                <label>
                  Observações
                </label>

                <textarea
                  value={observacoes}
                  onChange={(e) =>
                    setObservacoes(e.target.value)
                  }
                  placeholder="Alguma observação?"
                  rows={4}
                />

              </div>

              {erro && (
                <div className="form-error">
                  {erro}
                </div>
              )}

              {mensagem && (
                <div className="form-success">
                  {mensagem}
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={loading || !diaSelecionado}
              >
                {loading
                  ? 'Agendando...'
                  : 'Confirmar agendamento'}
              </button>

            </form>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Agendamento