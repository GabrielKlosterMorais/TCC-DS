import { useEffect, useState } from 'react';
import './styles.css';
import LogNavbar from '../../../components/logNavBar';

interface Pet {
  _id: string;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  sexo: string;
  peso: number;
  observacoes?: string;
  clienteId: string | { _id: string };
  img?: string;
}

const formInicial = {
  nome: '',
  especie: '',
  raca: '',
  idade: '',
  sexo: '',
  peso: '',
  observacoes: '',
  img: ''
};

function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const [form, setForm] = useState(formInicial);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getClienteId = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.id || null;
    } catch {
      return null;
    }
  };

  const carregarPets = async () => {
    const id = getClienteId();

    if (!id) {
      setError('Usuário não encontrado. Faça login novamente.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/Pet');
      const result = await res.json();

      const meusPets = (result.data || []).filter((pet: Pet) => {
        const cliente =
          typeof pet.clienteId === 'string'
            ? pet.clienteId
            : pet.clienteId?._id;

        return String(cliente) === String(id);
      });

      setPets(meusPets);
    } catch {
      setError('Não foi possível carregar seus pets.');
    }
  };

  useEffect(() => {
    carregarPets();
  }, []);

  const alterar = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const abrirCadastro = () => {
    setForm(formInicial);
    setEditando(null);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const editarPet = (pet: Pet) => {
    setForm({
      nome: pet.nome,
      especie: pet.especie,
      raca: pet.raca,
      idade: String(pet.idade),
      sexo: pet.sexo,
      peso: String(pet.peso),
      observacoes: pet.observacoes || '',
      img: pet.img || ''
    });

    setEditando(pet._id);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const salvarPet = async (e: React.FormEvent) => {
    e.preventDefault();

    const clienteId = getClienteId();

    if (!clienteId) {
      setError('Usuário não encontrado. Faça login novamente.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const dados = {
      ...form,
      idade: Number(form.idade),
      peso: Number(form.peso),
      clienteId
    };

    try {
      const url = editando
        ? `http://localhost:3001/Pet/${editando}`
        : 'http://localhost:3001/Pet';

      const res = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || 'Erro ao salvar pet.'
        );
      }

      setSuccess(
        editando
          ? 'Pet atualizado com sucesso!'
          : 'Pet cadastrado com sucesso!'
      );

      setShowForm(false);
      setEditando(null);
      setForm(formInicial);

      await carregarPets();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao salvar pet.'
      );
    } finally {
      setLoading(false);
    }
  };

  const removerPet = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este pet?')) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/Pet/${id}`,
        { method: 'DELETE' }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || 'Erro ao excluir pet.'
        );
      }

      setPets(pets.filter(pet => pet._id !== id));
      setSuccess('Pet excluído com sucesso!');
      setError('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao excluir pet.'
      );
    }
  };

  return (
    <div className="pets-page">
      <LogNavbar />

      <main className="pets-container">

        <section className="pets-header">
          <div>
            <span className="section-label">MEUS PETS</span>

            <h1>Seus melhores amigos.</h1>

            <p>
              Cadastre seus pets para acompanhar os cuidados,
              serviços e agendamentos de cada um.
            </p>
          </div>

          <button
            className="add-pet-button"
            onClick={abrirCadastro}
          >
            + Adicionar pet
          </button>
        </section>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}

        {pets.length === 0 && !showForm && (
          <section className="empty-state">
            <div className="empty-icon">+</div>

            <h2>
              Você ainda não possui pets cadastrados.
            </h2>

            <p>
              Cadastre seu primeiro pet para começar a
              organizar os cuidados dele.
            </p>

            <button
              className="empty-button"
              onClick={abrirCadastro}
            >
              Cadastrar meu primeiro pet
            </button>
          </section>
        )}

        {pets.length > 0 && (
          <section className="pets-list">

            {pets.map(pet => (
              <article
                className="pet-card"
                key={pet._id}
              >

                <div className="pet-image">
                  {pet.img ? (
                    <img
                      src={pet.img}
                      alt={`Foto de ${pet.nome}`}
                    />
                  ) : (
                    <span>🐾</span>
                  )}
                </div>

                <div className="pet-info">

                  <div className="pet-card-header">
                    <div>
                      <span className="pet-species">
                        {pet.especie}
                      </span>

                      <h2>{pet.nome}</h2>
                    </div>

                    <div className="pet-actions">

                      <button
                        className="edit-button"
                        onClick={() => editarPet(pet)}
                      >
                        Editar
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => removerPet(pet._id)}
                      >
                        Excluir
                      </button>

                    </div>
                  </div>

                  <div className="pet-details">

                    <div>
                      <span>Raça</span>
                      <strong>
                        {pet.raca || 'Não informado'}
                      </strong>
                    </div>

                    <div>
                      <span>Idade</span>
                      <strong>{pet.idade} anos</strong>
                    </div>

                    <div>
                      <span>Sexo</span>
                      <strong>{pet.sexo}</strong>
                    </div>

                    <div>
                      <span>Peso</span>
                      <strong>{pet.peso} kg</strong>
                    </div>

                  </div>

                  {pet.observacoes && (
                    <div className="pet-observations">
                      <span>Observações</span>
                      <p>{pet.observacoes}</p>
                    </div>
                  )}

                </div>

              </article>
            ))}

          </section>
        )}

        {showForm && (
          <div className="form-overlay">

            <section className="pet-form-card">

              <div className="form-header">
                <div>

                  <span className="section-label">
                    {editando ? 'EDITAR PET' : 'NOVO PET'}
                  </span>

                  <h2>
                    {editando
                      ? 'Editar informações'
                      : 'Cadastre seu pet'}
                  </h2>

                  <p>
                    Preencha as informações abaixo.
                  </p>

                </div>

                <button
                  className="close-button"
                  onClick={() => {
                    setShowForm(false);
                    setEditando(null);
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={salvarPet}>

                <div className="form-row">

                  <div className="input-group">
                    <label>Nome</label>

                    <input
                      name="nome"
                      value={form.nome}
                      onChange={alterar}
                      placeholder="Nome do pet"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Espécie</label>

                    <select
                      name="especie"
                      value={form.especie}
                      onChange={alterar}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Cachorro">Cachorro</option>
                      <option value="Gato">Gato</option>
                      <option value="Ave">Ave</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                </div>

                <div className="form-row">

                  <div className="input-group">
                    <label>Raça</label>

                    <input
                      name="raca"
                      value={form.raca}
                      onChange={alterar}
                      placeholder="Ex: Labrador"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Idade</label>

                    <input
                      name="idade"
                      type="number"
                      value={form.idade}
                      onChange={alterar}
                      min="0"
                      placeholder="Idade em anos"
                      required
                    />
                  </div>

                </div>

                <div className="form-row">

                  <div className="input-group">
                    <label>Sexo</label>

                    <select
                      name="sexo"
                      value={form.sexo}
                      onChange={alterar}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Macho">Macho</option>
                      <option value="Fêmea">Fêmea</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Peso</label>

                    <input
                      name="peso"
                      type="number"
                      value={form.peso}
                      onChange={alterar}
                      min="0"
                      step="0.1"
                      placeholder="Peso em kg"
                      required
                    />
                  </div>

                </div>

                <div className="input-group">
                  <label>URL da imagem</label>

                  <input
                    name="img"
                    type="url"
                    value={form.img}
                    onChange={alterar}
                    placeholder="https://exemplo.com/cachorro.jpg"
                  />
                </div>

                {form.img && (
                  <div className="image-preview">
                    <img
                      src={form.img}
                      alt="Prévia do pet"
                    />
                  </div>
                )}

                <div className="input-group">
                  <label>Observações</label>

                  <textarea
                    name="observacoes"
                    value={form.observacoes}
                    onChange={alterar}
                    placeholder="Alguma informação importante sobre seu pet?"
                    rows={4}
                  />
                </div>

                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditando(null);
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="save-button"
                    disabled={loading}
                  >
                    {loading
                      ? 'Salvando...'
                      : editando
                        ? 'Salvar alterações'
                        : 'Cadastrar pet'}
                  </button>

                </div>

              </form>

            </section>

          </div>
        )}

      </main>
    </div>
  );
}

export default Pets;