// Importa o hook useEffect, usado para executar código quando o componente é carregado,
// e o useState, usado para criar e controlar estados dentro do componente.
import { useEffect, useState } from 'react'

// Importa a barra de navegação utilizada na área administrativa.
import AdmNavBar from '../../../components/admNavBar'

// Importa o arquivo CSS específico desta página.
import './styles.css'


// Cria a interface que define o formato de um pagamento.
interface Pagamento {

  // ID único do pagamento no MongoDB.
  _id: string

  // Informações do cliente relacionadas ao pagamento.
  // O ? significa que esse objeto pode não existir.
  clienteId?: {

    // Nome do cliente.
    nomeCliente: string

  }

  // Informações do agendamento relacionado ao pagamento.
  // Também é opcional.
  agendamentoId?: {

    // Informações do pet.
    petId?: {

      // Nome do pet.
      nome: string

    }

    // Informações do serviço.
    servicoId?: {

      // Nome do serviço.
      nome: string

    }

    // Data em que o agendamento foi realizado.
    data: string

    // Horário do agendamento.
    hora: string

  }

  // Forma utilizada para realizar o pagamento.
  // Pode ser, por exemplo, pix, cartão ou dinheiro.
  formaPagamento: string

  // Define os possíveis estados de um pagamento.
  status: 'pendente' | 'pago' | 'cancelado'

  // Valor do pagamento.
  valor: number
}


// Componente principal da página administrativa de pagamentos.
function PagamentoAdm() {

  // Cria o estado que armazenará todos os pagamentos recebidos da API.
  // O estado começa como um array vazio.
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])

  // Cria o estado responsável por controlar o carregamento da página.
  // Começa como true porque os pagamentos ainda estão sendo buscados.
  const [loading, setLoading] = useState(true)


  // useEffect executa o código quando o componente é carregado.
  useEffect(() => {

    // Faz uma requisição GET para buscar os pagamentos no backend.
    fetch('http://localhost:3001/Pagamento')

      // Converte a resposta da API para JSON.
      .then(res => res.json())

      // Recebe os dados retornados pelo backend.
      .then(data =>

        // Salva os pagamentos no estado.
        // Caso data.data não exista, utiliza um array vazio.
        setPagamentos(data.data || [])
      )

      // Caso aconteça algum erro na requisição,
      // mostra o erro no console do navegador.
      .catch(error => console.error(error))

      // Executa depois que a requisição terminar,
      // independentemente de ter dado certo ou errado.
      .finally(() => setLoading(false))

  // O array vazio significa que esse useEffect será executado
  // somente uma vez, quando o componente for carregado.
  }, [])


  // Função responsável por transformar um número
  // em formato de moeda brasileira.
  const formatarPreco = (valor: number) =>

    // toLocaleString formata o número de acordo com uma localidade.
    valor.toLocaleString('pt-BR', {

      // Define que o valor será tratado como moeda.
      style: 'currency',

      // Define a moeda como Real brasileiro.
      currency: 'BRL'

    })


  // Função responsável por formatar uma data.
  const formatarData = (data: string) =>

    // Converte a string recebida para um objeto Date
    // e transforma para o formato brasileiro.
    new Date(data).toLocaleDateString('pt-BR')


  // Retorna a interface visual do componente.
  return (

    // Container principal da página.
    <div className="pagamento-adm-page">

      {/* Barra de navegação administrativa. */}
      <AdmNavBar />


      {/* Container que limita e organiza o conteúdo principal. */}
      <main className="pagamento-adm-container">


        {/* Cabeçalho da página. */}
        <div className="pagamento-adm-header">

          {/* Pequeno texto indicando que é uma área administrativa. */}
          <span>ÁREA ADMINISTRATIVA</span>

          {/* Título principal da página. */}
          <h1>Pagamentos</h1>

          {/* Descrição da página. */}
          <p>Consulte os pagamentos dos clientes.</p>

        </div>


        {/* 
          Verifica se os pagamentos ainda estão sendo carregados.
          Se loading for true, mostra a mensagem de carregamento.
        */}
        {loading ? (

          // Mensagem exibida enquanto a API está sendo consultada.
          <p>Carregando pagamentos...</p>

        ) : (

          // Caso loading seja false, mostra a lista de pagamentos.
          <div className="pagamentos-adm-list">


            {/* 
              Percorre todos os pagamentos armazenados no estado.
              Para cada pagamento, cria um card.
            */}
            {pagamentos.map(pagamento => (


              // Card individual do pagamento.
              <div

                // Monta duas classes CSS:
                // "pagamento-adm-card" e o status do pagamento.
                //
                // Exemplo:
                // pagamento-adm-card pendente
                // pagamento-adm-card pago
                // pagamento-adm-card cancelado
                className={`pagamento-adm-card ${pagamento.status}`}

                // O key identifica cada elemento de forma única para o React.
                key={pagamento._id}
              >


                {/* Área que contém as informações do pagamento. */}
                <div className="pagamento-adm-info">


                  {/* Mostra o status do pagamento. */}
                  <span className="status">

                    {/* 
                      Verifica qual é o status atual.
                      Se for pendente, mostra PAGAMENTO PENDENTE.
                    */}
                    {pagamento.status === 'pendente'

                      ? 'PAGAMENTO PENDENTE'

                      // Se não for pendente, verifica se está pago.
                      : pagamento.status === 'pago'

                      ? 'PAGAMENTO FINALIZADO'

                      // Caso não seja pendente nem pago,
                      // considera como cancelado.
                      : 'PAGAMENTO CANCELADO'}

                  </span>


                  {/* 
                    Mostra o nome do serviço.
                    O ?. evita erro caso agendamentoId ou servicoId
                    não exista.
                  */}
                  <h2>
                    {pagamento.agendamentoId?.servicoId?.nome || 'Serviço'}
                  </h2>


                  {/* Mostra o nome do cliente. */}
                  <p>

                    Cliente:{' '}

                    {/* 
                      Se existir o nome do cliente,
                      mostra o nome.
                      Caso contrário, mostra "Cliente".
                    */}
                    {pagamento.clienteId?.nomeCliente || 'Cliente'}

                  </p>


                  {/* Mostra o nome do pet. */}
                  <p>

                    Pet:{' '}

                    {/* 
                      Acessa o nome do pet dentro do agendamento.
                      Se não existir, mostra "Pet".
                    */}
                    {pagamento.agendamentoId?.petId?.nome || 'Pet'}

                  </p>


                  {/* Mostra a data e o horário do agendamento. */}
                  <p>

                    Data:{' '}

                    {/* 
                      Verifica primeiro se existe uma data.
                    */}
                    {pagamento.agendamentoId?.data

                      // Se existir, chama a função formatarData.
                      ? formatarData(pagamento.agendamentoId.data)

                      // Caso não exista, mostra um hífen.
                      : '-'}

                    {/* Adiciona o texto "às" entre a data e o horário. */}
                    {' às '}

                    {/* 
                      Mostra o horário.
                      Caso não exista, mostra um hífen.
                    */}
                    {pagamento.agendamentoId?.hora || '-'}

                  </p>

                </div>


                {/* Área responsável por mostrar o valor e a forma de pagamento. */}
                <div className="pagamento-adm-valor">


                  {/* Texto indicando o valor. */}
                  <span>Valor</span>


                  {/* Mostra o valor formatado em Real brasileiro. */}
                  <strong>
                    {formatarPreco(pagamento.valor)}
                  </strong>


                  {/* Mostra a forma de pagamento utilizada. */}
                  <small>
                    {pagamento.formaPagamento}
                  </small>

                </div>


              </div>

            ))}


            {/* 
              Verifica se não existe nenhum pagamento.
              Se o array estiver vazio, mostra a mensagem.
            */}
            {pagamentos.length === 0 && (

              <p>Nenhum pagamento encontrado.</p>

            )}

          </div>

        )}

      </main>

    </div>
  )
}


// Exporta o componente para que ele possa ser utilizado
// em outras partes da aplicação.
export default PagamentoAdm