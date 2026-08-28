import React, { useEffect, useState } from 'react';
import './styles.css';
import NavbarLogado from '../../components/logNavBar';

interface Pet {
  _id: string;
  nome: string;
  especie: string;
}

interface Servico {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
}

interface Agendamento {
  _id: string;
  petId: Pet | string;
  servicoId: Servico | string;
  data: string;
  hora: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
  observacoes?: string;
}

function AgendamentoPage() {
  const hoje = new Date();

  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());

  const [pets, setPets] = useState<Pet[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const [petSelecionado, setPetSelecionado] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [agendamentosDoDia, setAgendamentosDoDia] = useState<Agendamento[]>([]);
  const [mostrarCompromissos, setMostrarCompromissos] = useState(false);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const userString = localStorage.getItem('user');

  let clienteId = '';

  if (userString) {
    try {
      const user = JSON.parse(userString);
      clienteId = user.id;
    } catch {
      clienteId = '';
    }
  }

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    try {
      const [petsResponse, servicosResponse, agendamentosResponse] =
        await Promise.all([
          fetch('http://localhost:3001/Pet'),
          fetch('http://localhost:3001/Servico'),
          fetch('http://localhost:3001/Agendamento'),
        ]);

      if (!petsResponse.ok) {
        throw new Error('Erro ao buscar pets');
      }

      if (!servicosResponse.ok) {
        throw new Error('Erro ao buscar serviços');
      }

      if (!agendamentosResponse.ok) {
        throw new Error('Erro ao buscar agendamentos');
      }

      const petsData = await petsResponse.json();
      const servicosData = await servicosResponse.json();
      const agendamentosData = await agendamentosResponse.json();

      const listaPets = petsData.data || [];
      const listaServicos = servicosData.data || [];
      const listaAgendamentos = agendamentosData.data || [];

      const meusPets = clienteId
        ? listaPets.filter(
            (pet: Pet & { clienteId?: string | { _id: string } }) => {
              if (typeof pet.clienteId === 'string') {
                return pet.clienteId === clienteId;
              }

              if (pet.clienteId && typeof pet.clienteId === 'object') {
                return pet.clienteId._id === clienteId;
              }

              return false;
            }
          )
        : [];

      setPets(meusPets);
      setServicos(listaServicos);
      setAgendamentos(listaAgendamentos);
    } catch (error) {
      console.error(error);
      setErro('Não foi possível carregar os dados.');
    }
  };

  const diasNoMes = new Date(
    anoAtual,
    mesAtual + 1,
    0
  ).getDate();

  const primeiroDia = new Date(
    anoAtual,
    mesAtual,
    1
  ).getDay();

  const nomesMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const diasSemana = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
  ];

  const formatarData = (
    ano: number,
    mes: number,
    dia: number
  ) => {
    const mesFormatado = String(mes + 1).padStart(2, '0');
    const diaFormatado = String(dia).padStart(2, '0');

    return `${ano}-${mesFormatado}-${diaFormatado}`;
  };

  const dataHoje = formatarData(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );

  const dataDoCalendario = (dia: number) => {
    return formatarData(anoAtual, mesAtual, dia);
  };

  const ehDiaAnterior = (dia: number) => {
    return dataDoCalendario(dia) < dataHoje;
  };

  const agendamentosDoDiaSelecionado = (dia: number) => {
    const data = dataDoCalendario(dia);

    return agendamentos.filter((agendamento) => {
      const dataAgendamento = new Date(agendamento.data);

      const dataFormatada = formatarData(
        dataAgendamento.getFullYear(),
        dataAgendamento.getMonth(),
        dataAgendamento.getDate()
      );

      return (
        dataFormatada === data &&
        agendamento.status !== 'cancelado'
      );
    });
  };

  const possuiAgendamento = (dia: number) => {
    return agendamentosDoDiaSelecionado(dia).length > 0;
  };

  const selecionarDia = (dia: number) => {
    if (ehDiaAnterior(dia)) {
      return;
    }

    const data = dataDoCalendario(dia);
    const compromissos = agendamentosDoDiaSelecionado(dia);

    setDataSelecionada(data);
    setAgendamentosDoDia(compromissos);

    if (compromissos.length > 0) {
      setMostrarCompromissos(true);
    } else {
      setMostrarCompromissos(false);
    }

    setErro('');
    setSucesso('');
  };

  const voltarParaHoje = () => {
    setMesAtual(hoje.getMonth());
    setAnoAtual(hoje.getFullYear());

    const data = formatarData(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );

    const compromissos = agendamentos.filter((agendamento) => {
      const dataAgendamento = new Date(agendamento.data);

      const dataFormatada = formatarData(
        dataAgendamento.getFullYear(),
        dataAgendamento.getMonth(),
        dataAgendamento.getDate()
      );

      return (
        dataFormatada === data &&
        agendamento.status !== 'cancelado'
      );
    });

    setDataSelecionada(data);
    setAgendamentosDoDia(compromissos);
    setMostrarCompromissos(compromissos.length > 0);
  };

  const mudarMes = (direcao: number) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;

    if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    }

    if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    }

    setMesAtual(novoMes);
    setAnoAtual(novoAno);
    setDataSelecionada(null);
    setAgendamentosDoDia([]);
    setMostrarCompromissos(false);
  };

  const obterId = (
    item: Pet | Servico | string
  ): string => {
    if (typeof item === 'string') {
      return item;
    }

    return item._id;
  };

  const obterNomePet = (
    petId: Pet | string
  ): string => {
    if (typeof petId === 'object') {
      return petId.nome;
    }

    const pet = pets.find((item) => item._id === petId);

    return pet ? pet.nome : 'Pet';
  };

  const obterNomeServico = (
    servicoId: Servico | string
  ): string => {
    if (typeof servicoId === 'object') {
      return servicoId.nome;
    }

    const servico = servicos.find(
      (item) => item._id === servicoId
    );

    return servico ? servico.nome : 'Serviço';
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErro('');
    setSucesso('');

    if (!clienteId) {
      setErro('Usuário não identificado. Faça login novamente.');
      return;
    }

    if (!dataSelecionada) {
      setErro('Selecione uma data.');
      return;
    }

    if (!petSelecionado) {
      setErro('Selecione um pet.');
      return;
    }

    if (!servicoSelecionado) {
      setErro('Selecione um serviço.');
      return;
    }

    if (!horaSelecionada) {
      setErro('Selecione um horário.');
      return;
    }

    const conflito = agendamentos.some((agendamento) => {
      if (agendamento.status !== 'pendente') {
        return false;
      }

      const dataAgendamento = new Date(agendamento.data);

      const dataFormatada = formatarData(
        dataAgendamento.getFullYear(),
        dataAgendamento.getMonth(),
        dataAgendamento.getDate()
      );

      return (
        dataFormatada === dataSelecionada &&
        agendamento.hora === horaSelecionada
      );
    });

    if (conflito) {
      setErro(
        'Já existe um agendamento pendente para este dia e horário. Escolha outro horário.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3001/Agendamento',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            petId: petSelecionado,
            servicoId: servicoSelecionado,
            data: dataSelecionada,
            hora: horaSelecionada,
            status: 'pendente',
            observacoes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Erro ao criar agendamento.'
        );
      }

      setSucesso('Agendamento criado com sucesso!');

      setHoraSelecionada('');
      setObservacoes('');

      await buscarDados();

      const novosAgendamentos = agendamentosDoDiaSelecionado(
        Number(dataSelecionada.split('-')[2])
      );

      setAgendamentosDoDia(novosAgendamentos);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro('Erro ao criar agendamento.');
      }
    } finally {
      setLoading(false);
    }
  };

  const diasCalendario = [];

  for (let i = 0; i < primeiroDia; i++) {
    diasCalendario.push(
      <div
        key={`empty-${i}`}
        className="calendar-empty"
      />
    );
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const anterior = ehDiaAnterior(dia);
    const selecionado =
      dataSelecionada === dataDoCalendario(dia);

    const temAgendamento = possuiAgendamento(dia);

    diasCalendario.push(
      <button
        key={dia}
        type="button"
        className={`calendar-day ${
          anterior ? 'dia-anterior' : ''
        } ${selecionado ? 'selected' : ''} ${
          temAgendamento ? 'tem-agendamento' : ''
        }`}
        disabled={anterior}
        onClick={() => selecionarDia(dia)}
      >
        <span>{dia}</span>

        {temAgendamento && (
          <span className="appointment-dot" />
        )}
      </button>
    );
  }

  return (
    <div className="agendamento-page">

      <NavbarLogado />

      <main className="agendamento-container">

        <header className="agendamento-header">
          <span>AGENDAMENTO</span>

          <h1>
            Agende um cuidado para seu
            <strong> pet.</strong>
          </h1>

          <p>
            Escolha seu pet, o serviço, a data e o horário.
          </p>
        </header>

        {erro && (
          <div className="form-error">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="form-success">
            {sucesso}
          </div>
        )}

        <div className="agendamento-content">

          <section className="calendar-card">

            <div className="calendar-header">

              <button
                type="button"
                onClick={() => mudarMes(-1)}
                aria-label="Mês anterior"
              >
                ‹
              </button>

              <h2>
                {nomesMeses[mesAtual]} de {anoAtual}
              </h2>

              <button
                type="button"
                onClick={() => mudarMes(1)}
                aria-label="Próximo mês"
              >
                ›
              </button>

            </div>

            <button
              type="button"
              className="today-button"
              onClick={voltarParaHoje}
            >
              Voltar para hoje
            </button>

            <div className="calendar-weekdays">
              {diasSemana.map((dia) => (
                <span key={dia}>
                  {dia}
                </span>
              ))}
            </div>

            <div className="calendar-grid">
              {diasCalendario}
            </div>

            <div className="calendar-legend">

              <div className="legend-item">
                <span className="legend-dot" />
                Dia com agendamento
              </div>

              <div className="legend-item">
                <span className="legend-disabled" />
                Dia indisponível
              </div>

            </div>

            {dataSelecionada && (
              <div className="selected-date">

                <span>DATA SELECIONADA</span>

                <strong>
                  {dataSelecionada.split('-').reverse().join('/')}
                </strong>

              </div>
            )}

            {mostrarCompromissos &&
              agendamentosDoDia.length > 0 && (
                <div className="appointments-day">

                  <div className="appointments-header">
                    <h3>
                      Compromissos do dia
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarCompromissos(false)
                      }
                    >
                      Fechar
                    </button>
                  </div>

                  <div className="appointments-list">

                    {agendamentosDoDia.map(
                      (agendamento) => (
                        <div
                          className="appointment-item"
                          key={agendamento._id}
                        >

                          <div className="appointment-time">
                            {agendamento.hora}
                          </div>

                          <div className="appointment-info">

                            <strong>
                              {obterNomePet(
                                agendamento.petId
                              )}
                            </strong>

                            <span>
                              {obterNomeServico(
                                agendamento.servicoId
                              )}
                            </span>

                            <small>
                              Status:{' '}
                              {agendamento.status}
                            </small>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

          </section>

          <section className="form-card">

            <div className="form-header">

              <span>SEU AGENDAMENTO</span>

              <h2>
                Escolha os detalhes
              </h2>

              <p className="form-description">
                Selecione seu pet, o serviço e o horário
                desejado.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <label htmlFor="pet">
                  Pet
                </label>

                <select
                  id="pet"
                  value={petSelecionado}
                  onChange={(e) =>
                    setPetSelecionado(e.target.value)
                  }
                >
                  <option value="">
                    Selecione seu pet
                  </option>

                  {pets.map((pet) => (
                    <option
                      key={pet._id}
                      value={pet._id}
                    >
                      {pet.nome} — {pet.especie}
                    </option>
                  ))}

                </select>

                {pets.length === 0 && (
                  <small className="field-message">
                    Você ainda não possui pets cadastrados.
                  </small>
                )}

              </div>

              <div className="input-group">

                <label htmlFor="servico">
                  Serviço
                </label>

                <select
                  id="servico"
                  value={servicoSelecionado}
                  onChange={(e) =>
                    setServicoSelecionado(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Selecione um serviço
                  </option>

                  {servicos.map((servico) => (
                    <option
                      key={servico._id}
                      value={servico._id}
                    >
                      {servico.nome} — R${' '}
                      {servico.preco.toFixed(2)}
                    </option>
                  ))}

                </select>

              </div>

              <div className="input-group">

                <label htmlFor="data">
                  Data
                </label>

                <input
                  id="data"
                  type="text"
                  value={
                    dataSelecionada
                      ? dataSelecionada
                          .split('-')
                          .reverse()
                          .join('/')
                      : ''
                  }
                  placeholder="Selecione uma data no calendário"
                  readOnly
                />

              </div>

              <div className="input-group">

                <label htmlFor="hora">
                  Horário
                </label>

                <select
                  id="hora"
                  value={horaSelecionada}
                  onChange={(e) =>
                    setHoraSelecionada(
                      e.target.value
                    )
                  }
                  disabled={!dataSelecionada}
                >
                  <option value="">
                    Selecione um horário
                  </option>

                  {[
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                  ].map((hora) => {

                    const ocupado =
                      dataSelecionada &&
                      agendamentos.some(
                        (agendamento) => {

                          if (
                            agendamento.status !==
                            'pendente'
                          ) {
                            return false;
                          }

                          const dataAgendamento =
                            new Date(
                              agendamento.data
                            );

                          const dataFormatada =
                            formatarData(
                              dataAgendamento.getFullYear(),
                              dataAgendamento.getMonth(),
                              dataAgendamento.getDate()
                            );

                          return (
                            dataFormatada ===
                              dataSelecionada &&
                            agendamento.hora ===
                              hora
                          );
                        }
                      );

                    return (
                      <option
                        key={hora}
                        value={hora}
                        disabled={Boolean(ocupado)}
                      >
                        {hora}
                        {ocupado
                          ? ' — Indisponível'
                          : ''}
                      </option>
                    );
                  })}

                </select>

              </div>

              <div className="input-group">

                <label htmlFor="observacoes">
                  Observações
                </label>

                <textarea
                  id="observacoes"
                  value={observacoes}
                  onChange={(e) =>
                    setObservacoes(
                      e.target.value
                    )
                  }
                  placeholder="Alguma observação sobre o atendimento?"
                  rows={4}
                />

              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={
                  loading ||
                  !dataSelecionada ||
                  pets.length === 0 ||
                  servicos.length === 0
                }
              >
                {loading
                  ? 'Agendando...'
                  : 'Confirmar agendamento'}
              </button>

            </form>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AgendamentoPage;