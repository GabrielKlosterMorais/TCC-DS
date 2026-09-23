// Importa os hooks do React
import { useEffect, useState } from 'react'

// Importa a barra de navegação da área administrativa
import AdmNavBar from '../../../components/admNavBar'

// Importa o arquivo de estilos CSS desta página
import './styles.css'


// Interface que define a estrutura de um cliente
interface Cliente {

  // ID único do cliente no MongoDB
  _id: string

  // Nome do cliente
  nomeCliente: string

  // E-mail do cliente
  email: string

  // Telefone do cliente
  telefone: string

  // Endereço do cliente
  endereco: string

  // Define se o usuário é cliente ou administrador
  tipo: 'cliente' | 'admin'
}


// Interface que define a estrutura de um pet
interface Pet {

  // ID único do pet
  _id: string

  // Nome do pet
  nome: string

  // Espécie do pet
  especie: string

  // Raça do pet
  raca: string

  // Idade do pet
  idade: number

  // Sexo do pet
  sexo: string

  // Peso do pet
  peso: number

  // Imagem do pet
  img?: string

  // ID do cliente responsável pelo pet
  // Pode vir como uma string ou como um objeto
  clienteId: string | {
    _id: string
  }
}


// Componente principal da página
function ClientesAdm() {

  // Guarda a lista de clientes
  const [clientes, setClientes] = useState<Cliente[]>([])

  // Guarda a lista de pets
  const [pets, setPets] = useState<Pet[]>([])

  // Controla o carregamento dos dados
  const [loading, setLoading] = useState(true)


  // Executa quando a página é carregada
  useEffect(() => {

    // Função responsável por carregar os dados
    const carregarDados = async () => {

      try {

        // Faz as duas requisições ao mesmo tempo
        const [clientesRes, petsRes] = await Promise.all([

          // Busca os clientes
          fetch('http://localhost:3001/Cliente'),

          // Busca os pets
          fetch('http://localhost:3001/Pet')

        ])


        // Verifica se alguma requisição deu erro
        if (!clientesRes.ok || !petsRes.ok) {

          throw new Error('Erro ao buscar dados')

        }


        // Converte a resposta dos clientes para JSON
        const clientesData = await clientesRes.json()

        // Converte a resposta dos pets para JSON
        const petsData = await petsRes.json()


        // Salva somente os usuários que são clientes
        setClientes(

          (clientesData.data || []).filter(
            (cliente: Cliente) => cliente.tipo === 'cliente'
          )

        )


        // Salva os pets recebidos da API
        setPets(petsData.data || [])


      } catch (error) {

        // Mostra o erro no console
        console.error('Erro ao carregar dados:', error)


      } finally {

        // Finaliza o carregamento
        setLoading(false)

      }

    }


    // Executa a função
    carregarDados()

  }, [])


  // Função que encontra os pets de determinado cliente
  const petsDoCliente = (clienteId: string) => {

    // Filtra todos os pets
    return pets.filter(pet => {

      // Verifica se clienteId veio como string ou objeto
      const id =
        typeof pet.clienteId === 'string'
          ? pet.clienteId
          : pet.clienteId?._id


      // Retorna somente os pets desse cliente
      return id === clienteId

    })

  }


  // Função responsável por pegar a imagem do pet
  const getImagemPet = (pet: Pet) => {

    // Verifica se o pet possui uma imagem
    if (pet.img) {
      return pet.img
    }

    // Caso não tenha imagem
    return null

  }


  // Função responsável por excluir/desativar um cliente
  const excluirCliente = async (clienteId: string) => {

    // Confirma a exclusão antes de realizar a requisição
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este cliente? Todos os pets deste cliente também serão excluídos.'
    )

    // Caso o administrador cancele
    if (!confirmar) {
      return
    }


    try {

      // Envia uma requisição DELETE para o backend
      const response = await fetch(
        `http://localhost:3001/Cliente/${clienteId}`,
        {
          method: 'DELETE'
        }
      )


      // Converte a resposta para JSON
      const data = await response.json()


      // Verifica se o backend retornou erro
      if (!response.ok) {

        throw new Error(
          data.message || 'Erro ao excluir cliente'
        )

      }


      // Remove o cliente da lista da tela
      setClientes(prev =>
        prev.filter(cliente => cliente._id !== clienteId)
      )


      // Remove da tela todos os pets pertencentes ao cliente
      setPets(prev =>
        prev.filter(pet => {

          // Descobre o ID do cliente do pet
          const id =
            typeof pet.clienteId === 'string'
              ? pet.clienteId
              : pet.clienteId?._id

          // Mantém somente pets de outros clientes
          return id !== clienteId

        })
      )


      // Mostra a mensagem de sucesso
      alert(data.message || 'Cliente excluído com sucesso')

    } catch (error) {

      // Mostra o erro no console
      console.error('Erro ao excluir cliente:', error)

      // Mostra uma mensagem para o administrador
      alert('Erro ao excluir cliente')

    }

  }


  // Função responsável por excluir/desativar somente um pet
  const excluirPet = async (petId: string) => {

    // Confirma a exclusão antes de realizar a requisição
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este pet?'
    )

    // Caso o administrador cancele
    if (!confirmar) {
      return
    }


    try {

      // Envia uma requisição DELETE para o backend
      const response = await fetch(
        `http://localhost:3001/Pet/${petId}`,
        {
          method: 'DELETE'
        }
      )


      // Converte a resposta para JSON
      const data = await response.json()


      // Verifica se o backend retornou erro
      if (!response.ok) {

        throw new Error(
          data.message || 'Erro ao excluir pet'
        )

      }


      // Remove somente esse pet da lista exibida
      setPets(prev =>
        prev.filter(pet => pet._id !== petId)
      )


      // Mostra a mensagem de sucesso
      alert(data.message || 'Pet excluído com sucesso')

    } catch (error) {

      // Mostra o erro no console
      console.error('Erro ao excluir pet:', error)

      // Mostra uma mensagem para o administrador
      alert('Erro ao excluir pet')

    }

  }


  // Retorna a página
  return (

    <div className="clientes-adm-page">

      {/* Barra de navegação administrativa */}
      <AdmNavBar />


      {/* Conteúdo principal */}
      <main className="clientes-adm-container">


        {/* Cabeçalho */}
        <div className="clientes-adm-header">

          {/* Identificação da área */}
          <span>ÁREA ADMINISTRATIVA</span>


          {/* Título */}
          <h1>Clientes</h1>


          {/* Descrição */}
          <p>
            Consulte os clientes cadastrados e seus respectivos pets.
          </p>

        </div>


        {/* Verifica se os dados ainda estão carregando */}
        {loading ? (

          <div className="clientes-loading">
            Carregando clientes...
          </div>

        ) : clientes.length === 0 ? (

          /* Caso não existam clientes */
          <div className="empty-clientes">

            <h2>Nenhum cliente encontrado</h2>

            <p>
              Ainda não existem clientes cadastrados.
            </p>

          </div>

        ) : (

          /* Lista de clientes */
          <div className="clientes-list">

            {/* Percorre todos os clientes */}
            {clientes.map(cliente => {

              // Busca os pets desse cliente
              const petsCliente = petsDoCliente(cliente._id)


              // Retorna o card do cliente
              return (

                <div
                  className="cliente-card"
                  key={cliente._id}
                >


                  {/* Parte superior do cliente */}
                  <div className="cliente-top">


                    {/* Avatar do cliente */}
                    <div className="cliente-avatar">

                      {/* Primeira letra do nome do cliente */}
                      {cliente.nomeCliente
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    {/* Informações do cliente */}
                    <div className="cliente-info">

                      {/* Nome */}
                      <h2>
                        {cliente.nomeCliente}
                      </h2>


                      {/* Tipo */}
                      <span>
                        Cliente
                      </span>

                    </div>


                    {/* Botão para excluir o cliente */}
                    <button
                      type="button"
                      className="btn-excluir-cliente"
                      onClick={() => excluirCliente(cliente._id)}
                    >
                      Excluir cliente
                    </button>


                  </div>


                  {/* Dados do cliente */}
                  <div className="cliente-details">


                    {/* E-mail */}
                    <div className="detail">

                      <label>E-mail</label>

                      <p>
                        {cliente.email}
                      </p>

                    </div>


                    {/* Telefone */}
                    <div className="detail">

                      <label>Telefone</label>

                      <p>
                        {cliente.telefone}
                      </p>

                    </div>


                    {/* Endereço */}
                    <div className="detail">

                      <label>Endereço</label>

                      <p>
                        {cliente.endereco}
                      </p>

                    </div>

                  </div>


                  {/* Área dos pets */}
                  <div className="pets-section">


                    {/* Título da área dos pets */}
                    <div className="pets-title">

                      <h3>
                        Pets
                      </h3>


                      {/* Quantidade de pets */}
                      <span>
                        {petsCliente.length}
                      </span>

                    </div>


                    {/* Verifica se o cliente possui pets */}
                    {petsCliente.length === 0 ? (

                      <p className="no-pets">
                        Este cliente ainda não possui pets cadastrados.
                      </p>

                    ) : (

                      /* Lista dos pets */
                      <div className="pets-list">


                        {/* Percorre os pets do cliente */}
                        {petsCliente.map(pet => {

                          // Busca a imagem do pet
                          const imagemPet = getImagemPet(pet)


                          return (

                            <div
                              className="pet-card"
                              key={pet._id}
                            >


                              {/* Área da imagem do pet */}
                              <div className="pet-icon">

                                {imagemPet ? (

                                  /* Se tiver imagem, mostra a imagem */
                                  <img
                                    src={imagemPet}
                                    alt={`Foto de ${pet.nome}`}
                                  />

                                ) : (

                                  /* Se não tiver imagem, mostra a primeira letra */
                                  <span>
                                    {pet.nome
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>

                                )}

                              </div>


                              {/* Informações do pet */}
                              <div className="pet-info">


                                {/* Nome */}
                                <strong>
                                  {pet.nome}
                                </strong>


                                {/* Espécie e raça */}
                                <span>
                                  {pet.especie} • {pet.raca}
                                </span>


                                {/* Idade e sexo */}
                                <span>
                                  {pet.idade} anos • {pet.sexo}
                                </span>

                              </div>


                              {/* Peso */}
                              <strong className="pet-weight">
                                {pet.peso} kg
                              </strong>


                              {/* Botão para excluir somente o pet */}
                              <button
                                type="button"
                                className="btn-excluir-pet"
                                onClick={() => excluirPet(pet._id)}
                              >
                                Excluir pet
                              </button>


                            </div>

                          )

                        })}


                      </div>

                    )}

                  </div>


                </div>

              )

            })}

          </div>

        )}


      </main>

    </div>

  )

}


// Exporta o componente
export default ClientesAdm