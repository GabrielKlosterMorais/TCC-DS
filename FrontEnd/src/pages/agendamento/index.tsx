import React, { useEffect, useState } from 'react'
import './styles.css'
import NavbarLogada from '../../components/logNavBar'

interface Pet {
  _id: string
  nome: string
  especie: string
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
  ativo: boolean
}

function Agendamento() {
  const [pets, setPets] = useState<Pet[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  const [petId, setPetId] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [hora, setHora] = useState('')
  const [observacoes, setObservacoes] = useState('')

  const [mesAtual, setMesAtual] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const [petsResponse, servicosResponse, agendamentosResponse] =
        await Promise.all([
          fetch('http://localhost:3001/Pet'),
          fetch('http://localhost:3001/Servico'),
          fetch('http://localhost:3001/Agendamento')
        ])

      const petsData = await petsResponse.json()
      const servicosData = await servicosResponse.json()
      const agendamentosData = await agendamentosResponse.json()

      setPets(petsData.data || [])
      setServicos(servicosData.data || [])
      setAgendamentos(agendamentosData.data || [])
    } catch (error) {
      setErro('Não foi possível carregar os dados.')
    }
  }

  const formatarData = (data: Date) => {
    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const dia = String(data.getDate()).padStart(2, '0')

    return `${ano}-${mes}-${dia}`
  }

  const diasDoMes = () => {
    const ano = mesAtual.getFullYear()
    const mes = mesAtual.getMonth()

    const primeiroDia = new Date(ano, mes, 1)
    const ultimoDia = new Date(ano, mes + 1, 0)

    const dias: (Date | null)[] = []

    const diaSemana = primeiroDia.getDay()

    for (let i = 0; i < diaSemana; i++) {
      dias.push(null)
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      dias.push(new Date(ano, mes, dia))
    }

    return dias
  }

  const temAgendamento = (data: Date) => {
    const dataFormatada = formatarData(data)

    return agendamentos.some((agendamento) => {
      if (!agendamento.ativo) return false
      if (agendamento.status === 'cancelado') return false

      const dataAgendamento = new Date(agendamento.data)

      return formatarData(dataAgendamento) === dataFormatada
    })
  }

  const selecionarData = (data: Date) => {
    setDataSelecionada(formatarData(data))
    setMensagem('')
    setErro('')
  }

  const mesAnterior = () => {
    setMesAtual(
      new Date(
        mesAtual.getFullYear(),
        mesAtual.getMonth() - 1,
        1
      )
    )
  }

  const proximoMes = () => {
    setMesAtual(
      new Date(
        mesAtual.getFullYear(),
        mesAtual.getMonth() + 1,
        1
      )
    )
  }

  const nomeMes = mesAtual.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })

  const criarAgendamento = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setLoading(true)
    setMensagem('')
    setErro('')

    if (!petId || !servicoId || !dataSelecionada || !hora) {
      setErro('Preencha todos os campos obrigatórios.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        'http://localhost:3001/Agendamento',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            petId,
            servicoId,
            data: dataSelecionada,
            hora,
            status: 'pendente',
            observacoes
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setErro(data.message || 'Erro ao criar agendamento.')
        setLoading(false)
        return
      }

      setMensagem('Agendamento criado com sucesso!')

      setPetId('')
      setServicoId('')
      setHora('')
      setObservacoes('')

      await carregarDados()
    } catch (error) {
      setErro('Erro de conexão com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="agendamento-page">

      <NavbarLogada />

      <main className="agendamento-container">

        <section className="agendamento-header">
          <span>AGENDAMENTO</span>

          <h1>
            Agende um cuidado
            <strong> para seu pet.</strong>
          </h1>

          <p>
            Escolha seu pet, o serviço, a data e o horário
            que deseja realizar o atendimento.
          </p>
        </section>

        <section className="agendamento-content">

          <div className="calendar-card">

            <div className="calendar-header">

              <button
                type="button"
                onClick={mesAnterior}
              >
                ‹
              </button>

              <h2>
                {nomeMes.charAt(0).toUpperCase() +
                  nomeMes.slice(1)}
              </h2>

              <button
                type="button"
                onClick={proximoMes}
              >
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

              {diasDoMes().map((dia, index) => {

                if (!dia) {
                  return (
                    <div
                      className="calendar-empty"
                      key={`empty-${index}`}
                    />
                  )
                }

                const data = formatarData(dia)
                const selecionado =
                  data === dataSelecionada

                const possuiAgendamento =
                  temAgendamento(dia)

                return (
                  <button
                    type="button"
                    key={data}
                    className={`calendar-day ${
                      selecionado ? 'selected' : ''
                    }`}
                    onClick={() => selecionarData(dia)}
                  >

                    <span>
                      {dia.getDate()}
                    </span>

                    {possuiAgendamento && (
                      <small className="appointment-dot" />
                    )}

                  </button>
                )
              })}

            </div>

            <div className="calendar-legend">
              <span className="legend-dot" />
              <span>Dia com agendamento</span>
            </div>

          </div>

          <div className="form-card">

            <h2>
              Novo agendamento
            </h2>

            <p className="form-description">
              Preencha os dados do atendimento.
            </p>

            <form onSubmit={criarAgendamento}>

              <div className="input-group">

                <label htmlFor="pet">
                  Seu pet
                </label>

                <select
                  id="pet"
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
                      {pet.nome} - {pet.especie}
                    </option>
                  ))}
                </select>

              </div>

              <div className="input-group">

                <label htmlFor="servico">
                  Serviço
                </label>

                <select
                  id="servico"
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
                      {servico.nome} - R$ {servico.preco.toFixed(2)}
                    </option>
                  ))}
                </select>

              </div>

              <div className="input-group">

                <label>
                  Data escolhida
                </label>

                <input
                  type="date"
                  value={dataSelecionada}
                  onChange={(e) =>
                    setDataSelecionada(e.target.value)
                  }
                  required
                />

              </div>

              <div className="input-group">

                <label htmlFor="hora">
                  Horário
                </label>

                <input
                  id="hora"
                  type="time"
                  value={hora}
                  onChange={(e) =>
                    setHora(e.target.value)
                  }
                  required
                />

              </div>

              <div className="input-group">

                <label htmlFor="observacoes">
                  Observações
                </label>

                <textarea
                  id="observacoes"
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
                disabled={loading}
              >
                {loading
                  ? 'Agendando...'
                  : 'Confirmar agendamento →'}
              </button>

            </form>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Agendamento