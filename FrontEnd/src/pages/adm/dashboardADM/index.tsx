// Importa os hooks useEffect e useState do React
import { useEffect, useState } from 'react'

// Importa os estilos CSS da página
import './styles.css'

// Importa a barra de navegação da área administrativa
import AdmNavBar from '../../../components/admNavBar'


// Interface que define a estrutura de um Pet
interface Pet {

  // ID único do pet no MongoDB
  _id: string

  // Nome do pet
  nome: string

  // Cliente responsável pelo pet
  clienteId?: {
    _id: string
    nomeCliente: string
  }
}


// Interface que define a estrutura de um serviço
interface Servico {

  // ID único do serviço
  _id: string

  // Nome do serviço
  nome: string

  // Preço do serviço
  preco: number
}


// Interface que define a estrutura de um agendamento
interface Agendamento {

  // ID único do agendamento
  _id: string

  // Pet relacionado ao agendamento
  petId: Pet

  // Serviço relacionado ao agendamento
  servicoId: Servico

  // Data do agendamento
  data: string

  // Horário do agendamento
  hora: string

  // Status atual do agendamento
  status: 'confirmado' | 'cancelado'

  // Observações são opcionais
  observacoes?: string
}


// Interface que define a estrutura de um pagamento
interface Pagamento {

  // ID único do pagamento
  _id: string

  // Status do pagamento
  status: string
}


// Componente principal do Dashboard Administrativo
function DashboardAdmin() {

  // Guarda todos os agendamentos encontrados na API
  const [agendamentos, setAgendamentos] =
    useState<Agendamento[]>([])

  // Guarda todos os pagamentos encontrados na API
  const [pagamentos, setPagamentos] =
    useState<Pagamento[]>([])

  // Guarda todos os pets encontrados na API
  const [pets, setPets] =
    useState<Pet[]>([])

  // Controla o carregamento dos dados
  const [loading, setLoading] =
    useState(true)


  // =========================================================
  // CARREGAR DADOS
  // =========================================================

  // Busca os dados necessários para o dashboard
  const carregarDados = async () => {

    try {

      // Faz as três requisições ao mesmo tempo
      const [
        agendamentosRes,
        pagamentosRes,
        petsRes
      ] = await Promise.all([

        // Busca os agendamentos
        fetch(
          'http://localhost:3001/Agendamento'
        ),

        // Busca os pagamentos
        fetch(
          'http://localhost:3001/Pagamento'
        ),

        // Busca os pets
        fetch(
          'http://localhost:3001/Pet'
        )

      ])


      // Converte os agendamentos para JSON
      const agendamentosData =
        await agendamentosRes.json()

      // Converte os pagamentos para JSON
      const pagamentosData =
        await pagamentosRes.json()

      // Converte os pets para JSON
      const petsData =
        await petsRes.json()


      // Salva os agendamentos
      setAgendamentos(
        agendamentosData.data || []
      )

      // Salva os pagamentos
      setPagamentos(
        pagamentosData.data || []
      )

      // Salva os pets
      setPets(
        petsData.data || []
      )


    } catch (error) {

      // Mostra o erro no console
      console.error(
        'Erro ao carregar dados:',
        error
      )

    } finally {

      // Finaliza o carregamento
      setLoading(false)
    }
  }


  // =========================================================
  // EXECUTAR AO ABRIR A PÁGINA
  // =========================================================

  useEffect(() => {

    // Busca os dados
    carregarDados()

  }, [])


  // =========================================================
  // FILTRAR AGENDAMENTOS
  // =========================================================

  // Como agora todo agendamento criado já é confirmado,
  // não precisamos mais de uma lista de pendentes.

  // Lista somente os agendamentos confirmados
  const confirmados =
    agendamentos.filter(
      agendamento =>
        agendamento.status === 'confirmado'
    )


  // Lista somente os pagamentos pendentes
  const pagamentosPendentes =
    pagamentos.filter(
      pagamento =>
        pagamento.status === 'pendente'
    )


  // =========================================================
  // FORMATAR DATA
  // =========================================================

  // Converte uma data para o formato brasileiro
  const formatarData = (data: string) => {

    return new Date(data)
      .toLocaleDateString('pt-BR')
  }


  // =========================================================
  // RETORNO DA PÁGINA
  // =========================================================

  return (

    <div className="admin-page">

      {/* Barra de navegação administrativa */}
      <AdmNavBar />


      {/* Conteúdo principal */}
      <main className="admin-container">


        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <div className="admin-header">

          {/* Identificação da área */}
          <span>ÁREA ADMINISTRATIVA</span>

          {/* Título */}
          <h2>Dashboard</h2>

          {/* Descrição */}
          <p>
            Gerencie os agendamentos e pagamentos do PetCare.
          </p>

        </div>


        {/* =================================================
            CARREGAMENTO
        ================================================= */}

        {loading ? (

          <p>
            Carregando dados...
          </p>

        ) : (

          <>


            {/* =================================================
                CARDS DE ESTATÍSTICAS
            ================================================= */}

            <div className="stats">


              {/* Agendamentos confirmados */}
              <div className="stat-card">

                <span>
                  Agendamentos confirmados
                </span>

                <strong>
                  {confirmados.length}
                </strong>

              </div>


              {/* Pagamentos pendentes */}
              <div className="stat-card">

                <span>
                  Pagamentos pendentes
                </span>

                <strong>
                  {pagamentosPendentes.length}
                </strong>

              </div>


              {/* Pets cadastrados */}
              <div className="stat-card">

                <span>
                  Pets cadastrados
                </span>

                <strong>
                  {pets.length}
                </strong>

              </div>


            </div>


            {/* =================================================
                AGENDAMENTOS
            ================================================= */}

            <section className="appointments">


              {/* Cabeçalho da seção */}
              <div className="section-header">

                <div>

                  <span>
                    AGENDAMENTOS
                  </span>

                  <h2>
                    Próximos agendamentos
                  </h2>

                </div>


                {/* Link para a página completa */}
                <a href="/admin/agendamentos">
                  Ver todos →
                </a>

              </div>


              {/* Verifica se existem agendamentos */}
              {confirmados.length === 0 ? (

                <p>
                  Nenhum agendamento confirmado.
                </p>

              ) : (

                confirmados.map(
                  (agendamento) => (

                    <div
                      className="appointment"
                      key={agendamento._id}
                    >


                      {/* =================================================
                          PET E CLIENTE
                      ================================================= */}

                      <div>

                        {/* Nome do pet */}
                        <strong>
                          {agendamento.petId?.nome}
                        </strong>

                        {/* Nome do cliente */}
                        <span>
                          {
                            agendamento.petId
                              ?.clienteId
                              ?.nomeCliente ||
                            'Cliente'
                          }
                        </span>

                      </div>


                      {/* =================================================
                          SERVIÇO E DATA
                      ================================================= */}

                      <div>

                        {/* Nome do serviço */}
                        <strong>
                          {agendamento.servicoId?.nome}
                        </strong>

                        {/* Data */}
                        <span>
                          {formatarData(
                            agendamento.data
                          )}
                        </span>

                      </div>


                      {/* =================================================
                          HORÁRIO
                      ================================================= */}

                      <strong>
                        {agendamento.hora}
                      </strong>


                      {/* =================================================
                          STATUS
                      ================================================= */}

                      <span>
                        Confirmado
                      </span>


                    </div>

                  )
                )

              )}

            </section>


          </>

        )}

      </main>

    </div>
  )
}


// Exporta o componente
export default DashboardAdmin