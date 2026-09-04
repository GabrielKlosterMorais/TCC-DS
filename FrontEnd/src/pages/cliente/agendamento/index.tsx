import { useEffect, useState } from 'react'
import LogNavbar from '../../../components/logNavBar'
import './styles.css'

interface Pet {
  _id: string
  nome: string
  especie: string
  raca: string
  clienteId: string | { _id: string }
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
  petId: Pet | string
  servicoId: Servico | string
  data: string
  hora: string
  status: 'pendente' | 'confirmado' | 'cancelado'
  observacoes?: string
}

function Agendamento() {
  const [pets, setPets] = useState<Pet[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  const [petId, setPetId] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [observacoes, setObservacoes] = useState('')

  const [mesAtual, setMesAtual] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const userData = localStorage.getItem('user')

        if (!userData) {
          window.location.href = '/login'
          return
        }

        const usuario = JSON.parse(userData)

        const [petsRes, servicosRes, agendamentosRes] =
          await Promise.all([
            fetch('http://localhost:3001/Pet'),
            fetch('http://localhost:3001/Servico'),
            fetch('http://localhost:3001/Agendamento')
          ])

        const petsData = await petsRes.json()
        const servicosData = await servicosRes.json()
        const agendamentosData = await agendamentosRes.json()

        const meusPets = (petsData.data || []).filter(
          (pet: Pet) => {
            const id =
              typeof pet.clienteId === 'string'
                ? pet.clienteId
                : pet.clienteId?._id

            return id === usuario.id
          }
        )

        setPets(meusPets)
        setServicos(servicosData.data || [])
        setAgendamentos(agendamentosData.data || [])

      } catch (error) {
        console.error(error)
        setErro('Erro ao carregar os dados.')
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  const servicoSelecionado = servicos.find(
    servico => servico._id === servicoId
  )

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const formatarDuracao = (minutos: number) => {
    if (minutos < 60) {
      return `${minutos} min`
    }

    const horas = Math.floor(minutos / 60)
    const minutosRestantes = minutos % 60

    if (minutosRestantes === 0) {
      return `${horas}h`
    }

    return `${horas}h ${minutosRestantes}min`
  }

  const primeiroDia = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth(),
    1
  ).getDay()

  const quantidadeDias = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth() + 1,
    0
  ).getDate()

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const nomesMeses = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ]

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

  const formatarData = (ano: number, mes: number, dia: number) => {
    const mesFormatado = String(mes + 1).padStart(2, '0')
    const diaFormatado = String(dia).padStart(2, '0')

    return `${ano}-${mesFormatado}-${diaFormatado}`
  }

  const agendamentosDoDia = (dataSelecionada: string) => {
    return agendamentos.filter(agendamento => {
      const dataAgendamento =
        new Date(agendamento.data)
          .toISOString()
          .split('T')[0]

      return dataAgendamento === dataSelecionada
    })
  }

  const selecionarDia = (dia: number) => {
    const novaData = formatarData(
      mesAtual.getFullYear(),
      mesAtual.getMonth(),
      dia
    )

    const dataSelecionada = new Date(
      mesAtual.getFullYear(),
      mesAtual.getMonth(),
      dia
    )

    if (dataSelecionada < hoje) {
      return
    }

    setData(novaData)
    setErro('')
  }

  const classeDia = (dia: number) => {
    const dataDia = formatarData(
      mesAtual.getFullYear(),
      mesAtual.getMonth(),
      dia
    )

    const agendamentosDia = agendamentosDoDia(dataDia)

    if (agendamentosDia.some(a => a.status === 'confirmado')) {
      return 'confirmado'
    }

    if (agendamentosDia.some(a => a.status === 'pendente')) {
      return 'pendente'
    }

    if (agendamentosDia.some(a => a.status === 'cancelado')) {
      return 'cancelado'
    }

    return ''
  }

  const agendar = async () => {
    setErro('')
    setMensagem('')

    if (!petId || !servicoId || !data || !hora) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

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
            data,
            hora,
            status: 'pendente',
            observacoes
          })
        }
      )

      const result = await res.json()

      if (!res.ok) {
        throw new Error(
          result.message ||
          'Erro ao realizar agendamento.'
        )
      }

      setMensagem(
        'Agendamento realizado com sucesso! Aguarde a confirmação.'
      )

      setAgendamentos(prev => [
        ...prev,
        result.data
      ])

      setPetId('')
      setServicoId('')
      setData('')
      setHora('')
      setObservacoes('')

    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao realizar agendamento.'
      )
    }
  }

  if (loading) {
    return (
      <div className="agendamento-page">
        <LogNavbar />

        <main className="agendamento-container">
          <p>Carregando...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="agendamento-page">

      <LogNavbar />

      <main className="agendamento-container">

        <div className="agendamento-header">
          <span>AGENDAMENTO</span>

          <h1>
            Agende um serviço
          </h1>

          <p>
            Escolha seu pet, serviço, data e horário.
          </p>
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

        {pets.length === 0 ? (
          <div className="empty-agendamento">
            <h2>
              Você ainda não possui pets
            </h2>

            <p>
              Cadastre um pet antes de realizar um agendamento.
            </p>
          </div>
        ) : (

          <div className="agendamento-content">

            <div className="calendar-card">

              <div className="calendar-header">

                <button onClick={voltarMes}>
                  ‹
                </button>

                <h2>
                  {nomesMeses[mesAtual.getMonth()]}{' '}
                  {mesAtual.getFullYear()}
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

                {Array.from({
                  length: primeiroDia
                }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="calendar-empty"
                  />
                ))}

                {Array.from({
                  length: quantidadeDias
                }).map((_, index) => {

                  const dia = index + 1

                  const dataDia = formatarData(
                    mesAtual.getFullYear(),
                    mesAtual.getMonth(),
                    dia
                  )

                  const dataComparacao = new Date(
                    mesAtual.getFullYear(),
                    mesAtual.getMonth(),
                    dia
                  )

                  const anterior =
                    dataComparacao < hoje

                  const selecionado =
                    data === dataDia

                  return (
                    <button
                      key={dia}
                      className={`calendar-day ${classeDia(dia)} ${
                        selecionado ? 'selected' : ''
                      } ${
                        anterior ? 'dia-anterior' : ''
                      }`}
                      onClick={() =>
                        selecionarDia(dia)
                      }
                      disabled={anterior}
                    >
                      {dia}

                      {agendamentosDoDia(dataDia).length > 0 && (
                        <div className="appointment-dots">

                          {agendamentosDoDia(
                            dataDia
                          ).map(agendamento => (
                            <span
                              key={agendamento._id}
                              className={`dot ${agendamento.status}-dot`}
                            />
                          ))}

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

              {data && (
                <div className="day-appointments">

                  <h3>
                    Agendamentos do dia
                  </h3>

                  {agendamentosDoDia(data).length === 0 ? (

                    <p>
                      Nenhum agendamento neste dia.
                    </p>

                  ) : (

                    agendamentosDoDia(data).map(
                      agendamento => {

                        const pet =
                          typeof agendamento.petId === 'object'
                            ? agendamento.petId
                            : null

                        const servico =
                          typeof agendamento.servicoId === 'object'
                            ? agendamento.servicoId
                            : null

                        return (
                          <div
                            key={agendamento._id}
                            className={`day-appointment ${agendamento.status}`}
                          >

                            <div>
                              <strong>
                                {agendamento.hora}
                              </strong>

                              <span>
                                {pet?.nome || 'Pet'}
                              </span>

                              <span>
                                {servico?.nome || 'Serviço'}
                              </span>
                            </div>

                            <span>
                              {agendamento.status}
                            </span>

                          </div>
                        )
                      }
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
                Preencha os dados para solicitar seu atendimento.
              </p>

              <div className="input-group">

                <label>
                  Pet
                </label>

                <select
                  value={petId}
                  onChange={e =>
                    setPetId(e.target.value)
                  }
                >
                  <option value="">
                    Selecione seu pet
                  </option>

                  {pets.map(pet => (
                    <option
                      key={pet._id}
                      value={pet._id}
                    >
                      {pet.nome} — {pet.especie}
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
                  onChange={e =>
                    setServicoId(e.target.value)
                  }
                >
                  <option value="">
                    Selecione um serviço
                  </option>

                  {servicos.map(servico => (
                    <option
                      key={servico._id}
                      value={servico._id}
                    >
                      {servico.nome} —{' '}
                      {formatarPreco(servico.preco)}
                    </option>
                  ))}

                </select>

              </div>

              {servicoSelecionado && (

                <div className="servico-resumo">

                  <div>
                    <span>
                      Serviço
                    </span>

                    <strong>
                      {servicoSelecionado.nome}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Descrição
                    </span>

                    <strong>
                      {servicoSelecionado.descricao}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Duração
                    </span>

                    <strong>
                      {formatarDuracao(
                        servicoSelecionado.duracao
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Valor
                    </span>

                    <strong className="servico-preco">
                      {formatarPreco(
                        servicoSelecionado.preco
                      )}
                    </strong>
                  </div>

                </div>

              )}

              <div className="form-row">

                <div className="input-group">

                  <label>
                    Data
                  </label>

                  <input
                    type="date"
                    value={data}
                    min={
                      new Date()
                        .toISOString()
                        .split('T')[0]
                    }
                    onChange={e =>
                      setData(e.target.value)
                    }
                  />

                </div>

                <div className="input-group">

                  <label>
                    Horário
                  </label>

                  <input
                    type="time"
                    value={hora}
                    onChange={e =>
                      setHora(e.target.value)
                    }
                  />

                </div>

              </div>

              <div className="input-group">

                <label>
                  Observações
                </label>

                <textarea
                  value={observacoes}
                  onChange={e =>
                    setObservacoes(e.target.value)
                  }
                  placeholder="Alguma observação sobre o atendimento?"
                  rows={4}
                />

              </div>

              {servicoSelecionado && (

                <div className="agendamento-total">

                  <span>
                    Total do agendamento
                  </span>

                  <strong>
                    {formatarPreco(
                      servicoSelecionado.preco
                    )}
                  </strong>

                </div>

              )}

              <button
                className="submit-button"
                onClick={agendar}
              >
                Confirmar agendamento
              </button>

            </div>

          </div>

        )}

      </main>

    </div>
  )
}

export default Agendamento