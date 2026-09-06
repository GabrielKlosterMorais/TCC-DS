import { useEffect, useState } from 'react'
import AdmNavBar from '../../../components/admNavBar'
import './styles.css'

interface Servico {
  _id: string
  nome: string
  descricao: string
  preco: number
  duracao: number
  img?: string
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
  const [img, setImg] = useState('')

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
    setImg('')
    setModal(true)
  }

  const abrirEditar = (servico: Servico) => {
    setEditando(servico)

    setNome(servico.nome)
    setDescricao(servico.descricao)
    setPreco(String(servico.preco))
    setDuracao(String(servico.duracao))
    setImg(servico.img || '')

    setModal(true)
  }

  const fecharModal = () => {
    setModal(false)
    setEditando(null)
    setNome('')
    setDescricao('')
    setPreco('')
    setDuracao('')
    setImg('')
  }

  const salvarServico = async () => {
    if (!nome || !descricao || !preco || !duracao) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    try {
      const dados = {
        nome,
        descricao,
        preco: Number(preco),
        duracao: Number(duracao),
        img
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

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.message || 'Erro ao salvar serviço'
        )
      }

      fecharModal()
      carregarServicos()

    } catch (error) {
      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar o serviço.'
      )
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

                {/* IMAGEM */}
                <div className="service-image">

                  {servico.img ? (
                    <img
                      src={servico.img}
                      alt={servico.nome}
                    />
                  ) : (
                    <div className="no-image">
                      Sem imagem
                    </div>
                  )}

                </div>

                {/* INFORMAÇÕES */}
                <div className="service-info">

                  <h2>
                    {servico.nome}
                  </h2>

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

                {/* AÇÕES */}
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
              onClick={fecharModal}
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

            {/* NOME */}
            <label>
              Nome
            </label>

            <input
              type="text"
              value={nome}
              onChange={e =>
                setNome(e.target.value)
              }
              placeholder="Nome do serviço"
            />

            {/* DESCRIÇÃO */}
            <label>
              Descrição
            </label>

            <textarea
              value={descricao}
              onChange={e =>
                setDescricao(e.target.value)
              }
              placeholder="Descrição do serviço"
            />

            {/* PREÇO E DURAÇÃO */}
            <div className="form-row">

              <div>

                <label>
                  Preço
                </label>

                <input
                  type="number"
                  value={preco}
                  onChange={e =>
                    setPreco(e.target.value)
                  }
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />

              </div>

              <div>

                <label>
                  Duração
                </label>

                <input
                  type="number"
                  value={duracao}
                  onChange={e =>
                    setDuracao(e.target.value)
                  }
                  placeholder="Ex: 90"
                  min="1"
                />

              </div>

            </div>

            {/* IMAGEM */}
            <label>
              URL da imagem
            </label>

            <input
              type="url"
              value={img}
              onChange={e =>
                setImg(e.target.value)
              }
              placeholder="https://exemplo.com/imagem.jpg"
            />

            {/* PREVIEW */}
            {img && (
              <div className="image-preview">

                <img
                  src={img}
                  alt="Prévia do serviço"
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />

              </div>
            )}

            {/* SALVAR */}
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