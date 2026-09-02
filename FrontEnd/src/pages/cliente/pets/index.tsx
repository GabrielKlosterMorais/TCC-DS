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
  clienteId: string;
}

function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [peso, setPeso] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getClienteId = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }

    try {
      const usuario = JSON.parse(user);
      return usuario.id || null;
    } catch {
      return null;
    }
  };

  const carregarPets = async () => {
    const clienteId = getClienteId();

    if (!clienteId) {
      setError('Usuário não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/Pet');

      if (!response.ok) {
        throw new Error('Erro ao buscar pets');
      }

      const result = await response.json();

      const petsDoCliente = result.data.filter(
        (pet: Pet) => pet.clienteId === clienteId
      );

      setPets(petsDoCliente);
    } catch (error) {
      console.error(error);
      setError('Não foi possível carregar seus pets.');
    }
  };

  useEffect(() => {
    carregarPets();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    const clienteId = getClienteId();

    if (!clienteId) {
      setError('Usuário não encontrado. Faça login novamente.');
      setLoading(false);
      return;
    }

    const petData = {
      nome,
      especie,
      raca,
      idade: Number(idade),
      sexo,
      peso: Number(peso),
      observacoes,
      clienteId,
    };

    try {
      const response = await fetch(
        'http://localhost:3001/Pet',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(petData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Erro ao cadastrar pet'
        );
      }

      setSuccess('Pet cadastrado com sucesso!');

      setNome('');
      setEspecie('');
      setRaca('');
      setIdade('');
      setSexo('');
      setPeso('');
      setObservacoes('');

      setShowForm(false);

      await carregarPets();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro ao cadastrar pet.');
      }
    } finally {
      setLoading(false);
    }
  };

  const removerPet = async (id: string) => {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este pet?'
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/Pet/${id}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Erro ao excluir pet'
        );
      }

      setPets(
        pets.filter((pet) => pet._id !== id)
      );

      setSuccess('Pet excluído com sucesso!');
      setError('');
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro ao excluir pet.');
      }
    }
  };

  return (
    <div className="pets-page">

      <LogNavbar />

      <main className="pets-container">

        <section className="pets-header">

          <div>
            <span className="section-label">
              MEUS PETS
            </span>

            <h1>
              Seus melhores amigos.
            </h1>

            <p>
              Cadastre seus pets para acompanhar os cuidados,
              serviços e agendamentos de cada um.
            </p>
          </div>

          <button
            className="add-pet-button"
            onClick={() => {
              setShowForm(true);
              setError('');
              setSuccess('');
            }}
          >
            <span>+</span>
            Adicionar pet
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

            <div className="empty-icon">
              +
            </div>

            <h2>
              Você ainda não possui pets cadastrados.
            </h2>

            <p>
              Cadastre seu primeiro pet para começar a organizar
              os cuidados dele.
            </p>

            <button
              className="empty-button"
              onClick={() => setShowForm(true)}
            >
              Cadastrar meu primeiro pet
            </button>

          </section>

        )}

        {pets.length > 0 && (

          <section className="pets-list">

            {pets.map((pet) => (

              <article
                className="pet-card"
                key={pet._id}
              >

                <div className="pet-image">
                  <span>🐾</span>
                </div>

                <div className="pet-info">

                  <div className="pet-card-header">

                    <div>

                      <span className="pet-species">
                        {pet.especie}
                      </span>

                      <h2>
                        {pet.nome}
                      </h2>

                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        removerPet(pet._id)
                      }
                    >
                      Excluir
                    </button>

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
                      <strong>
                        {pet.idade} anos
                      </strong>
                    </div>

                    <div>
                      <span>Sexo</span>
                      <strong>
                        {pet.sexo}
                      </strong>
                    </div>

                    <div>
                      <span>Peso</span>
                      <strong>
                        {pet.peso} kg
                      </strong>
                    </div>

                  </div>

                  {pet.observacoes && (

                    <div className="pet-observations">

                      <span>
                        Observações
                      </span>

                      <p>
                        {pet.observacoes}
                      </p>

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
                    NOVO PET
                  </span>

                  <h2>
                    Cadastre seu pet
                  </h2>

                  <p>
                    Preencha as informações abaixo.
                  </p>

                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  ×
                </button>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-row">

                  <div className="input-group">

                    <label htmlFor="nome">
                      Nome
                    </label>

                    <input
                      type="text"
                      id="nome"
                      value={nome}
                      onChange={(e) =>
                        setNome(e.target.value)
                      }
                      placeholder="Nome do pet"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label htmlFor="especie">
                      Espécie
                    </label>

                    <select
                      id="especie"
                      value={especie}
                      onChange={(e) =>
                        setEspecie(e.target.value)
                      }
                      required
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option value="Cachorro">
                        Cachorro
                      </option>

                      <option value="Gato">
                        Gato
                      </option>

                      <option value="Ave">
                        Ave
                      </option>

                      <option value="Outro">
                        Outro
                      </option>

                    </select>

                  </div>

                </div>

                <div className="form-row">

                  <div className="input-group">

                    <label htmlFor="raca">
                      Raça
                    </label>

                    <input
                      type="text"
                      id="raca"
                      value={raca}
                      onChange={(e) =>
                        setRaca(e.target.value)
                      }
                      placeholder="Ex: Labrador"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label htmlFor="idade">
                      Idade
                    </label>

                    <input
                      type="number"
                      id="idade"
                      value={idade}
                      onChange={(e) =>
                        setIdade(e.target.value)
                      }
                      placeholder="Idade em anos"
                      min="0"
                      required
                    />

                  </div>

                </div>

                <div className="form-row">

                  <div className="input-group">

                    <label htmlFor="sexo">
                      Sexo
                    </label>

                    <select
                      id="sexo"
                      value={sexo}
                      onChange={(e) =>
                        setSexo(e.target.value)
                      }
                      required
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option value="Macho">
                        Macho
                      </option>

                      <option value="Fêmea">
                        Fêmea
                      </option>

                    </select>

                  </div>

                  <div className="input-group">

                    <label htmlFor="peso">
                      Peso
                    </label>

                    <input
                      type="number"
                      id="peso"
                      value={peso}
                      onChange={(e) =>
                        setPeso(e.target.value)
                      }
                      placeholder="Peso em kg"
                      min="0"
                      step="0.1"
                      required
                    />

                  </div>

                </div>

                <div className="input-group">

                  <label htmlFor="observacoes">
                    Observações
                  </label>

                  <textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) =>
                      setObservacoes(e.target.value)
                    }
                    placeholder="Alguma informação importante sobre seu pet?"
                    rows={4}
                  />

                </div>

                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() =>
                      setShowForm(false)
                    }
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="save-button"
                    disabled={loading}
                  >
                    {loading
                      ? 'Cadastrando...'
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