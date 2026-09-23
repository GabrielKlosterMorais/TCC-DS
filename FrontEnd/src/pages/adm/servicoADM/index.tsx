// Importa o hook useEffect, usado para executar ações quando o componente é carregado,
// e useState, usado para criar e controlar estados.
import { useEffect, useState } from 'react'

// Importa a barra de navegação da área administrativa.
import AdmNavBar from '../../../components/admNavBar'

// Importa o arquivo CSS utilizado pela página de serviços.
import './styles.css'


// Interface que define a estrutura de um serviço.
interface Servico {

  // ID do serviço no MongoDB.
  _id: string

  // Nome do serviço.
  nome: string

  // Descrição do serviço.
  descricao: string

  // Preço do serviço.
  preco: number

  // Duração do serviço em minutos.
  duracao: number

  // URL da imagem.
  // O ? significa que a imagem é opcional.
  img?: string
}


// Componente principal da página administrativa de serviços.
function ServicoAdm() {

  // Estado que armazena a lista de serviços.
  // Começa como um array vazio.
  const [servicos, setServicos] = useState<Servico[]>([])

  // Estado utilizado para controlar o carregamento dos serviços.
  // Começa como true porque os dados ainda serão buscados.
  const [loading, setLoading] = useState(true)

  // Estado responsável por controlar se o modal está aberto.
  // false = fechado.
  // true = aberto.
  const [modal, setModal] = useState(false)

  // Guarda o serviço que está sendo editado.
  // null significa que nenhum serviço está sendo editado.
  const [editando, setEditando] = useState<Servico | null>(null)


  // Estado que armazena o nome digitado no formulário.
  const [nome, setNome] = useState('')

  // Estado que armazena a descrição digitada.
  const [descricao, setDescricao] = useState('')

  // Estado que armazena o preço.
  // É string porque vem diretamente do input.
  const [preco, setPreco] = useState('')

  // Estado que armazena a duração em minutos.
  const [duracao, setDuracao] = useState('')

  // Estado que armazena a URL da imagem.
  const [img, setImg] = useState('')


  // Função responsável por buscar os serviços no backend.
  const carregarServicos = async () => {

    try {

      // Faz uma requisição GET para a rota de serviços.
      const res = await fetch('http://localhost:3001/Servico')

      // Converte a resposta da API para JSON.
      const data = await res.json()

      // Salva os serviços recebidos no estado.
      // Se data.data não existir, utiliza um array vazio.
      setServicos(data.data || [])

    } catch (error) {

      // Mostra no console caso aconteça algum erro.
      console.error('Erro ao carregar serviços:', error)

    } finally {

      // Independentemente de sucesso ou erro,
      // informa que o carregamento terminou.
      setLoading(false)

    }
  }


  // Executa a função carregarServicos quando o componente é carregado.
  useEffect(() => {

    // Busca os serviços da API.
    carregarServicos()

  // O array vazio faz com que isso aconteça somente uma vez.
  }, [])


  // Função que transforma uma duração em minutos
  // para um formato mais fácil de ler.
  const formatarDuracao = (minutos: number) => {

    // Calcula quantas horas completas existem nos minutos.
    const horas = Math.floor(minutos / 60)

    // Calcula quantos minutos sobram depois das horas.
    const resto = minutos % 60


    // Se não houver nenhuma hora completa...
    if (horas === 0) {

      // Retorna somente os minutos.
      return `${minutos} minutos`

    }


    // Se a quantidade de minutos restantes for zero...
    if (resto === 0) {

      // Se for exatamente 1 hora, retorna "1 hora".
      return horas === 1

        ? '1 hora'

        // Caso sejam várias horas, retorna "X horas".
        : `${horas} horas`

    }


    // Caso existam horas e minutos restantes...
    return horas === 1

      // Se for uma hora, usa "1 hora e X minutos".
      ? `1 hora e ${resto} minutos`

      // Caso sejam várias horas, usa "X horas e Y minutos".
      : `${horas} horas e ${resto} minutos`
  }


  // Função executada quando o administrador
  // clica em "Adicionar serviço".
  const abrirAdicionar = () => {

    // Como é um novo serviço, não existe serviço sendo editado.
    setEditando(null)

    // Limpa o campo nome.
    setNome('')

    // Limpa o campo descrição.
    setDescricao('')

    // Limpa o campo preço.
    setPreco('')

    // Limpa o campo duração.
    setDuracao('')

    // Limpa o campo imagem.
    setImg('')

    // Abre o modal.
    setModal(true)
  }


  // Função executada quando o administrador
  // clica em "Editar".
  const abrirEditar = (servico: Servico) => {

    // Guarda o serviço selecionado como o serviço que está sendo editado.
    setEditando(servico)

    // Preenche o formulário com o nome atual.
    setNome(servico.nome)

    // Preenche o formulário com a descrição atual.
    setDescricao(servico.descricao)

    // Converte o preço para string porque o input trabalha com string.
    setPreco(String(servico.preco))

    // Converte a duração para string.
    setDuracao(String(servico.duracao))

    // Preenche a URL da imagem.
    // Se não existir imagem, utiliza uma string vazia.
    setImg(servico.img || '')

    // Abre o modal.
    setModal(true)
  }


  // Função utilizada para fechar o modal.
  const fecharModal = () => {

    // Fecha o modal.
    setModal(false)

    // Remove o serviço que estava sendo editado.
    setEditando(null)

    // Limpa o nome.
    setNome('')

    // Limpa a descrição.
    setDescricao('')

    // Limpa o preço.
    setPreco('')

    // Limpa a duração.
    setDuracao('')

    // Limpa a imagem.
    setImg('')
  }


  // Função responsável por criar ou editar um serviço.
  const salvarServico = async () => {

    // Verifica se algum dos campos obrigatórios está vazio.
    if (!nome || !descricao || !preco || !duracao) {

      // Mostra um alerta para o administrador.
      alert('Preencha todos os campos obrigatórios.')

      // Interrompe a função.
      return
    }


    try {

      // Cria o objeto que será enviado para o backend.
      const dados = {

        // Nome do serviço.
        nome,

        // Descrição do serviço.
        descricao,

        // Converte o preço de string para número.
        preco: Number(preco),

        // Converte a duração de string para número.
        duracao: Number(duracao),

        // URL da imagem.
        img

      }


      // Verifica se existe um serviço sendo editado.
      const url = editando

        // Se existir, utiliza a rota com o ID do serviço.
        ? `http://localhost:3001/Servico/${editando._id}`

        // Se não existir, utiliza a rota para criar um novo serviço.
        : 'http://localhost:3001/Servico'


      // Faz a requisição para o backend.
      const res = await fetch(url, {

        // Se estiver editando, usa PUT.
        // Se estiver adicionando, usa POST.
        method: editando ? 'PUT' : 'POST',

        // Informa que o conteúdo enviado é JSON.
        headers: {
          'Content-Type': 'application/json'
        },

        // Converte o objeto dados para JSON.
        body: JSON.stringify(dados)
      })


      // Converte a resposta do backend para JSON.
      const data = await res.json()


      // Verifica se o backend retornou algum erro.
      if (!res.ok) {

        // Cria um erro utilizando a mensagem enviada pelo backend.
        // Se não existir mensagem, utiliza uma mensagem padrão.
        throw new Error(
          data.message || 'Erro ao salvar serviço'
        )
      }


      // Fecha o modal depois de salvar.
      fecharModal()

      // Busca novamente os serviços para atualizar a lista.
      carregarServicos()


    } catch (error) {

      // Mostra o erro no console.
      console.error(error)


      // Mostra uma mensagem para o administrador.
      alert(

        // Verifica se o erro é realmente uma instância de Error.
        error instanceof Error

          // Se for, mostra a mensagem do erro.
          ? error.message

          // Caso contrário, mostra uma mensagem padrão.
          : 'Não foi possível salvar o serviço.'

      )
    }
  }


  // Função responsável por excluir um serviço.
  const excluirServico = async (id: string) => {

    // Pergunta ao administrador se realmente deseja excluir.
    if (!confirm('Deseja realmente excluir este serviço?')) {

      // Se clicar em cancelar, interrompe a função.
      return
    }


    try {

      // Faz uma requisição para o serviço específico.
      const res = await fetch(

        // Utiliza o ID recebido na função.
        `http://localhost:3001/Servico/${id}`,

        // Define o método HTTP como DELETE.
        {
          method: 'DELETE'
        }
      )


      // Verifica se a resposta do backend indica erro.
      if (!res.ok) {

        // Cria um erro caso a exclusão não tenha funcionado.
        throw new Error('Erro ao excluir serviço')
      }


      // Atualiza a lista depois da exclusão.
      carregarServicos()


    } catch (error) {

      // Mostra o erro no console.
      console.error(error)

      // Informa o administrador sobre o erro.
      alert('Não foi possível excluir o serviço.')
    }
  }


  // Retorna a interface visual da página.
  return (

    // Container principal da página.
    <div className="servicos-adm-page">


      {/* Barra de navegação administrativa. */}
      <AdmNavBar />


      {/* Conteúdo principal da página. */}
      <main className="servicos-adm-container">


        {/* Cabeçalho da página. */}
        <div className="servicos-header">


          {/* Área que contém título e descrição. */}
          <div>

            {/* Identifica a área administrativa. */}
            <span>ÁREA ADMINISTRATIVA</span>

            {/* Título da página. */}
            <h1>Serviços</h1>

            {/* Descrição da página. */}
            <p>
              Gerencie os serviços oferecidos pelo PetCare.
            </p>

          </div>


          {/* Botão responsável por abrir o formulário de novo serviço. */}
          <button
            className="add-service-button"
            onClick={abrirAdicionar}
          >

            {/* Texto do botão. */}
            + Adicionar serviço

          </button>

        </div>


        {/* 
          Verifica se os serviços ainda estão carregando.
          Se loading for true, mostra a mensagem.
        */}
        {loading ? (

          <p className="loading">
            Carregando serviços...
          </p>


        ) : servicos.length === 0 ? (

          // Se terminou de carregar e não existem serviços...
          <div className="empty-services">

            {/* Título do estado vazio. */}
            <h2>Nenhum serviço cadastrado</h2>

            {/* Mensagem explicativa. */}
            <p>
              Adicione um serviço para começar.
            </p>

          </div>


        ) : (

          // Caso existam serviços, mostra a lista.
          <div className="services-list">


            {/* 
              Percorre todos os serviços.
              Para cada serviço, cria um card.
            */}
            {servicos.map(servico => (


              // Card individual do serviço.
              <div
                className="service-card"

                // O key permite que o React identifique cada card.
                key={servico._id}
              >


                {/* ÁREA DA IMAGEM */}
                <div className="service-image">


                  {/* 
                    Verifica se o serviço possui uma imagem.
                  */}
                  {servico.img ? (

                    // Se possuir imagem, mostra a tag img.
                    <img
                      src={servico.img}
                      alt={servico.nome}
                    />

                  ) : (

                    // Caso não tenha imagem, mostra uma mensagem.
                    <div className="no-image">
                      Sem imagem
                    </div>

                  )}

                </div>


                {/* ÁREA DAS INFORMAÇÕES */}
                <div className="service-info">


                  {/* Nome do serviço. */}
                  <h2>
                    {servico.nome}
                  </h2>


                  {/* Descrição do serviço. */}
                  <p>
                    {servico.descricao}
                  </p>


                  {/* Área com preço e duração. */}
                  <div className="service-details">


                    {/* Mostra o preço com duas casas decimais. */}
                    <span>
                      R$ {Number(servico.preco).toFixed(2)}
                    </span>


                    {/* Mostra a duração formatada. */}
                    <span>
                      {formatarDuracao(servico.duracao)}
                    </span>

                  </div>

                </div>


                {/* ÁREA DOS BOTÕES */}
                <div className="service-actions">


                  {/* Botão para editar o serviço. */}
                  <button
                    className="edit-button"

                    // Quando clicado, abre o modal preenchido
                    // com os dados do serviço.
                    onClick={() =>
                      abrirEditar(servico)
                    }
                  >
                    Editar
                  </button>


                  {/* Botão para excluir o serviço. */}
                  <button
                    className="delete-button"

                    // Quando clicado, envia o ID para a função de exclusão.
                    onClick={() =>
                      excluirServico(servico._id)
                    }
                  >
                    Excluir
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>


      {/* 
        O modal só é renderizado quando modal for true.
      */}
      {modal && (


        // Fundo escuro que aparece atrás do modal.
        <div className="service-overlay">


          {/* Caixa principal do formulário. */}
          <div className="service-modal">


            {/* Botão para fechar o modal. */}
            <button
              className="close-modal"
              onClick={fecharModal}
            >
              ×
            </button>


            {/* 
              Texto que muda dependendo se está adicionando
              ou editando um serviço.
            */}
            <span>
              {editando
                ? 'EDITAR SERVIÇO'
                : 'NOVO SERVIÇO'}
            </span>


            {/* 
              Título do formulário.
            */}
            <h2>
              {editando
                ? 'Editar serviço'
                : 'Adicionar serviço'}
            </h2>


            {/* CAMPO NOME */}
            <label>
              Nome
            </label>


            {/* Input do nome do serviço. */}
            <input
              type="text"

              // O valor do input vem do estado nome.
              value={nome}

              // Atualiza o estado conforme o usuário digita.
              onChange={e =>
                setNome(e.target.value)
              }

              // Texto exibido quando o campo está vazio.
              placeholder="Nome do serviço"
            />


            {/* CAMPO DESCRIÇÃO */}
            <label>
              Descrição
            </label>


            {/* Campo de texto maior para a descrição. */}
            <textarea

              // Valor atual da descrição.
              value={descricao}

              // Atualiza a descrição enquanto o usuário digita.
              onChange={e =>
                setDescricao(e.target.value)
              }

              // Texto de exemplo.
              placeholder="Descrição do serviço"
            />


            {/* LINHA COM PREÇO E DURAÇÃO */}
            <div className="form-row">


              {/* Campo do preço. */}
              <div>

                <label>
                  Preço
                </label>


                {/* Input numérico para o preço. */}
                <input
                  type="number"

                  // Valor controlado pelo estado preco.
                  value={preco}

                  // Atualiza o preço digitado.
                  onChange={e =>
                    setPreco(e.target.value)
                  }

                  // Exemplo de preenchimento.
                  placeholder="0.00"

                  // Impede valores menores que zero.
                  min="0"

                  // Permite valores com duas casas decimais.
                  step="0.01"
                />

              </div>


              {/* Campo da duração. */}
              <div>

                <label>
                  Duração
                </label>


                {/* Input numérico para a duração em minutos. */}
                <input
                  type="number"

                  // Valor controlado pelo estado duracao.
                  value={duracao}

                  // Atualiza a duração.
                  onChange={e =>
                    setDuracao(e.target.value)
                  }

                  // Mostra um exemplo.
                  placeholder="Ex: 90"

                  // Impede valores menores que 1.
                  min="1"
                />

              </div>

            </div>


            {/* CAMPO IMAGEM */}
            <label>
              URL da imagem
            </label>


            {/* Input para informar a URL da imagem. */}
            <input
              type="url"

              // Valor controlado pelo estado img.
              value={img}

              // Atualiza a URL conforme o usuário digita.
              onChange={e =>
                setImg(e.target.value)
              }

              // Exemplo de URL.
              placeholder="https://exemplo.com/imagem.jpg"
            />


            {/* PRÉ-VISUALIZAÇÃO DA IMAGEM */}

            {/* 
              O preview só aparece quando img possui algum valor.
            */}
            {img && (

              <div className="image-preview">


                {/* Mostra a imagem informada pelo administrador. */}
                <img
                  src={img}

                  // Texto alternativo da imagem.
                  alt="Prévia do serviço"

                  // Se a imagem não carregar...
                  onError={e => {

                    // Esconde a imagem quebrada.
                    e.currentTarget.style.display = 'none'

                  }}
                />

              </div>

            )}


            {/* BOTÃO SALVAR */}

            <button
              className="save-service-button"

              // Executa a função de salvar.
              onClick={salvarServico}
            >

              {/* 
                O texto muda dependendo da operação.
              */}
              {editando

                // Se estiver editando:
                ? 'Salvar alterações'

                // Se estiver adicionando:
                : 'Adicionar serviço'}

            </button>

          </div>

        </div>

      )}

    </div>
  )
}


// Exporta o componente para que ele possa ser importado
// e utilizado nas rotas da aplicação.
export default ServicoAdm