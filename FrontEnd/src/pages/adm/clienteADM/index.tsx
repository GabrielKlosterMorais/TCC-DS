import { useEffect, useState } from 'react'
import AdmNavBar from '../../../components/admNavBar'
import './styles.css'

interface Cliente {
  _id: string
  nomeCliente: string
  email: string
  telefone: string
  endereco: string
  tipo: 'cliente' | 'admin'
}

interface Pet {
  _id: string
  nome: string
  especie: string
  raca: string
  idade: number
  sexo: string
  peso: number
  clienteId: string | {
    _id: string
  }
}

function ClientesAdm() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [clientesRes, petsRes] = await Promise.all([
          fetch('http://localhost:3001/Cliente'),
          fetch('http://localhost:3001/Pet')
        ])

        if (!clientesRes.ok || !petsRes.ok) {
          throw new Error('Erro ao buscar dados')
        }

        const clientesData = await clientesRes.json()
        const petsData = await petsRes.json()

        setClientes(
          (clientesData.data || []).filter(
            (cliente: Cliente) => cliente.tipo === 'cliente'
          )
        )

        setPets(petsData.data || [])
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  const petsDoCliente = (clienteId: string) => {
    return pets.filter(pet => {
      const id =
        typeof pet.clienteId === 'string'
          ? pet.clienteId
          : pet.clienteId?._id

      return id === clienteId
    })
  }

  return (
    <div className="clientes-adm-page">

      <AdmNavBar />

      <main className="clientes-adm-container">

        <div className="clientes-adm-header">
          <span>ÁREA ADMINISTRATIVA</span>

          <h1>Clientes</h1>

          <p>
            Consulte os clientes cadastrados e seus respectivos pets.
          </p>
        </div>

        {loading ? (
          <div className="clientes-loading">
            Carregando clientes...
          </div>
        ) : clientes.length === 0 ? (

          <div className="empty-clientes">
            <h2>Nenhum cliente encontrado</h2>
            <p>
              Ainda não existem clientes cadastrados.
            </p>
          </div>

        ) : (

          <div className="clientes-list">

            {clientes.map(cliente => {
              const petsCliente = petsDoCliente(cliente._id)

              return (
                <div
                  className="cliente-card"
                  key={cliente._id}
                >

                  <div className="cliente-top">

                    <div className="cliente-avatar">
                      {cliente.nomeCliente
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="cliente-info">

                      <h2>
                        {cliente.nomeCliente}
                      </h2>

                      <span>
                        Cliente
                      </span>

                    </div>

                  </div>

                  <div className="cliente-details">

                    <div className="detail">
                      <label>E-mail</label>
                      <p>{cliente.email}</p>
                    </div>

                    <div className="detail">
                      <label>Telefone</label>
                      <p>{cliente.telefone}</p>
                    </div>

                    <div className="detail">
                      <label>Endereço</label>
                      <p>{cliente.endereco}</p>
                    </div>

                  </div>

                  <div className="pets-section">

                    <div className="pets-title">
                      <h3>Pets</h3>

                      <span>
                        {petsCliente.length}
                      </span>
                    </div>

                    {petsCliente.length === 0 ? (

                      <p className="no-pets">
                        Este cliente ainda não possui pets cadastrados.
                      </p>

                    ) : (

                      <div className="pets-list">

                        {petsCliente.map(pet => (

                          <div
                            className="pet-card"
                            key={pet._id}
                          >

                            <div className="pet-icon">
                              🐾
                            </div>

                            <div className="pet-info">

                              <strong>
                                {pet.nome}
                              </strong>

                              <span>
                                {pet.especie} • {pet.raca}
                              </span>

                              <span>
                                {pet.idade} anos • {pet.sexo}
                              </span>

                            </div>

                            <strong className="pet-weight">
                              {pet.peso} kg
                            </strong>

                          </div>

                        ))}

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

export default ClientesAdm