import { useEffect, useState } from 'react'
import AdmNavBar from '../../../components/admNavBar'
import './styles.css'

interface Servico {
  _id: string
  nome: string
  descricao: string
  preco: number
  duracao: number
}

function ServicoAdm() {
  const [servicos, setServicos] = useState<Servico[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState<Servico | null>(null)

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [duracao, setDuracao] = useState('')

  const carregarServicos = async () => {
    try {
      const res = await fetch('http://localhost:3001/Servico')
      const data = await res.json()

      setServicos(data.data || [])
    } catch (error) {
      console.error('Erro ao carregar serviços:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarServicos()
  }, [])

  const formatarDuracao = (minutos: number) => {
    const horas = Math.floor(minutos / 60)
    const resto = minutos % 60

    if (horas === 0) {
      return `${minutos} minutos`
    }

    if (resto === 0) {
      return horas === 1
        ? '1 hora'
        : `${horas} horas`
    }

    return horas === 1
      ? `1 hora e ${resto} minutos`
      : `${horas} horas e ${resto} minutos`
  }

  const abrirAdicionar = () => {
    setEditando(null)
    setNome('')
    setDescricao('')
    setPreco('')
    setDuracao('')
    setModal(true)
  }

  const abrirEditar = (servico: Servico) => {
    setEditando(servico)
    setNome(servico.nome)
    setDescricao(servico.descricao)
    setPreco(String(servico.preco))
    setDuracao(String(servico.duracao))
    setModal(true)
  }

  const salvarServico = async () => {
    try {
      const dados = {
        nome,
        descricao,
        preco: Number(preco),
        duracao: Number(duracao)
      }

      const url = editando
        ? `http://localhost:3001/Servico/${editando._id}`
        : 'http://localhost:3001/Servico'

      const res = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })

      if (!res.ok) {
        throw new Error('Erro ao salvar serviço')
      }

      setModal(false)
      carregarServicos()
    } catch (error) {
      console.error(error)
      alert('Não foi possível salvar o serviço.')
    }
  }

  const excluirServico = async (id: string) => {
    if (!confirm('Deseja realmente excluir este serviço?')) {
      return
    }

    try {
      const res = await fetch(
        `http://localhost:3001/Servico/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (!res.ok) {
        throw new Error('Erro ao excluir serviço')
      }

      carregarServicos()
    } catch (error) {
      console.error(error)
      alert('Não foi possível excluir o serviço.')
    }
  }

  return (
    <div className="servicos-adm-page">

      <AdmNavBar />

      <main className="servicos-adm-container">

        <div className="servicos-header">

          <div>
            <span>ÁREA ADMINISTRATIVA</span>

            <h1>Serviços</h1>

            <p>
              Gerencie os serviços oferecidos pelo PetCare.
            </p>
          </div>

          <button
            className="add-service-button"
            onClick={abrirAdicionar}
          >
            + Adicionar serviço
          </button>

        </div>

        {loading ? (
          <p className="loading">
            Carregando serviços...
          </p>
        ) : servicos.length === 0 ? (

          <div className="empty-services">

            <h2>Nenhum serviço cadastrado</h2>

            <p>
              Adicione um serviço para começar.
            </p>

          </div>

        ) : (

          <div className="services-list">

            {servicos.map(servico => (

              <div
                className="service-card"
                key={servico._id}
              >

                <div className="service-info">

                  <h2>{servico.nome}</h2>

                  <p>
                    {servico.descricao}
                  </p>

                  <div className="service-details">

                    <span>
                      R$ {Number(servico.preco).toFixed(2)}
                    </span>

                    <span>
                      {formatarDuracao(servico.duracao)}
                    </span>

                  </div>

                </div>

                <div className="service-actions">

                  <button
                    className="edit-button"
                    onClick={() =>
                      abrirEditar(servico)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="delete-button"
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

      {modal && (

        <div className="service-overlay">

          <div className="service-modal">

            <button
              className="close-modal"
              onClick={() => setModal(false)}
            >
              ×
            </button>

            <span>
              {editando
                ? 'EDITAR SERVIÇO'
                : 'NOVO SERVIÇO'}
            </span>

            <h2>
              {editando
                ? 'Editar serviço'
                : 'Adicionar serviço'}
            </h2>

            <label>Nome</label>

            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome do serviço"
            />

            <label>Descrição</label>

            <textarea
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Descrição do serviço"
            />

            <div className="form-row">

              <div>
                <label>Preço</label>

                <input
                  type="number"
                  value={preco}
                  onChange={e => setPreco(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label>Duração</label>

                <input
                  type="number"
                  value={duracao}
                  onChange={e => setDuracao(e.target.value)}
                  placeholder="Ex: 90"
                />
              </div>

            </div>

            <button
              className="save-service-button"
              onClick={salvarServico}
            >
              {editando
                ? 'Salvar alterações'
                : 'Adicionar serviço'}
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default ServicoAdm