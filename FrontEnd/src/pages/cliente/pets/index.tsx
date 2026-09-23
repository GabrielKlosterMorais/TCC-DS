// Importa o hook useEffect, usado para executar ações quando o componente
// é carregado ou quando alguma dependência é alterada.
import { useEffect, useState } from 'react';

// Importa o arquivo CSS responsável pela aparência da página de pets.
import './styles.css';

// Importa a barra de navegação usada nas páginas que exigem login.
import LogNavbar from '../../../components/logNavBar';


// Cria uma interface para definir o formato de um Pet.
// Isso ajuda o TypeScript a saber quais propriedades cada pet possui.
interface Pet {

  // ID único do pet criado pelo MongoDB.
  _id: string;

  // Nome do pet.
  nome: string;

  // Espécie do pet, por exemplo Cachorro ou Gato.
  especie: string;

  // Raça do pet.
  raca: string;

  // Idade do pet em anos.
  idade: number;

  // Sexo do pet.
  sexo: string;

  // Peso do pet em quilogramas.
  peso: number;

  // Observações são opcionais.
  // O ? significa que essa propriedade pode não existir.
  observacoes?: string;

  // ID do cliente dono do pet.
  // Pode vir diretamente como uma string ou como um objeto
  // contendo o _id do cliente.
  clienteId: string | { _id: string };

  // URL da imagem do pet.
  // Também é opcional.
  img?: string;
}


// Cria um objeto com os valores iniciais do formulário.
// Esses valores são usados quando o usuário vai cadastrar um novo pet.
const formInicial = {

  // Nome começa vazio.
  nome: '',

  // Espécie começa vazia.
  especie: '',

  // Raça começa vazia.
  raca: '',

  // Idade começa vazia.
  idade: '',

  // Sexo começa vazio.
  sexo: '',

  // Peso começa vazio.
  peso: '',

  // Observações começam vazias.
  observacoes: '',

  // URL da imagem começa vazia.
  img: ''
};


// Cria o componente principal chamado Pets.
function Pets() {

  // Estado que armazena a lista de pets do usuário.
  // Começa como um array vazio.
  const [pets, setPets] = useState<Pet[]>([]);

  // Estado que controla se o formulário está aberto.
  // false = formulário fechado.
  // true = formulário aberto.
  const [showForm, setShowForm] = useState(false);

  // Guarda o ID do pet que está sendo editado.
  // null significa que nenhum pet está sendo editado.
  const [editando, setEditando] = useState<string | null>(null);

  // Estado que armazena os dados preenchidos no formulário.
  // Começa com os valores definidos em formInicial.
  const [form, setForm] = useState(formInicial);


  // Controla o estado de carregamento durante o cadastro ou edição.
  const [loading, setLoading] = useState(false);

  // Guarda mensagens de erro para mostrar na tela.
  const [error, setError] = useState('');

  // Guarda mensagens de sucesso para mostrar na tela.
  const [success, setSuccess] = useState('');


  // Função responsável por pegar o ID do cliente atualmente logado.
  const getClienteId = () => {

    // try tenta executar o código normalmente.
    try {

      // Pega o usuário salvo no localStorage.
      // Caso não exista, usa '{}' como valor padrão.
      // JSON.parse transforma o texto JSON em objeto JavaScript.
      const user = JSON.parse(
        localStorage.getItem('user') || '{}'
      );

      // Retorna o ID do cliente.
      // O MongoDB utiliza "_id" como identificador.
      // Também usa "userId" como alternativa caso exista.
      return user._id || localStorage.getItem('userId') || null;

    // Se ocorrer algum erro ao interpretar o JSON,
    // entra no catch.
    } catch {

      // Retorna null caso não consiga encontrar o usuário.
      return null;
    }
  };


  // Função responsável por buscar os pets no backend.
  const carregarPets = async () => {

    // Pega o ID do cliente que está logado.
    const id = getClienteId();


    // Verifica se não encontrou o ID do cliente.
    if (!id) {

      // Mostra uma mensagem de erro.
      setError(
        'Usuário não encontrado. Faça login novamente.'
      );

      // Para a execução da função.
      return;
    }


    // Tenta executar a requisição para o backend.
    try {

      // Faz uma requisição GET para buscar os pets.
      const res = await fetch(
        'http://localhost:3001/Pet'
      );

      // Converte a resposta do servidor para JSON.
      const result = await res.json();


      // Pega os dados retornados pelo backend.
      // Caso data não exista, utiliza um array vazio.
      const meusPets = (result.data || []).filter(
        (pet: Pet) => {

          // Verifica como o clienteId veio do backend.
          const cliente =
            typeof pet.clienteId === 'string'

              // Se clienteId for uma string, utiliza diretamente.
              ? pet.clienteId

              // Caso seja um objeto, pega somente o _id.
              : pet.clienteId?._id;


          // Compara o cliente dono do pet com o cliente logado.
          // String() garante que os dois valores sejam comparados como texto.
          return String(cliente) === String(id);
        }
      );


      // Atualiza o estado com somente os pets do usuário logado.
      setPets(meusPets);

    // Caso a requisição dê erro.
    } catch {

      // Mostra mensagem informando que os pets não puderam ser carregados.
      setError(
        'Não foi possível carregar seus pets.'
      );
    }
  };


  // useEffect executa uma função quando o componente é carregado.
  useEffect(() => {

    // Chama a função responsável por buscar os pets.
    carregarPets();

  // Array vazio significa que esse efeito será executado
  // somente uma vez, quando o componente for montado.
  }, []);


  // Função responsável por atualizar os valores do formulário.
  const alterar = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    // Atualiza o estado do formulário.
    setForm({

      // Mantém todos os valores que já estavam preenchidos.
      ...form,

      // Atualiza somente o campo que foi alterado.
      // e.target.name identifica o campo.
      // e.target.value pega o novo valor.
      [e.target.name]: e.target.value
    });
  };


  // Função chamada quando o usuário clica em "Adicionar pet".
  const abrirCadastro = () => {

    // Limpa o formulário.
    setForm(formInicial);

    // Garante que não estamos editando nenhum pet.
    setEditando(null);

    // Limpa mensagens de erro anteriores.
    setError('');

    // Limpa mensagens de sucesso anteriores.
    setSuccess('');

    // Abre o formulário.
    setShowForm(true);
  };


  // Função responsável por preparar um pet para edição.
  const editarPet = (pet: Pet) => {

    // Preenche o formulário com os dados do pet selecionado.
    setForm({

      // Coloca o nome do pet no formulário.
      nome: pet.nome,

      // Coloca a espécie do pet no formulário.
      especie: pet.especie,

      // Coloca a raça do pet no formulário.
      raca: pet.raca,

      // Converte a idade de número para string.
      // Isso é necessário porque o estado do formulário usa strings.
      idade: String(pet.idade),

      // Coloca o sexo do pet.
      sexo: pet.sexo,

      // Converte o peso para string.
      peso: String(pet.peso),

      // Coloca as observações.
      // Caso não existam, utiliza uma string vazia.
      observacoes: pet.observacoes || '',

      // Coloca a URL da imagem.
      // Caso não exista, utiliza uma string vazia.
      img: pet.img || ''
    });


    // Guarda o ID do pet que está sendo editado.
    setEditando(pet._id);

    // Limpa mensagens anteriores.
    setError('');
    setSuccess('');

    // Abre o formulário.
    setShowForm(true);
  };


  // Função responsável por cadastrar ou atualizar um pet.
  const salvarPet = async (e: React.FormEvent) => {

    // Impede que o formulário recarregue a página.
    e.preventDefault();


    // Pega o ID do cliente logado.
    const clienteId = getClienteId();


    // Verifica se encontrou o cliente.
    if (!clienteId) {

      // Mostra mensagem de erro.
      setError(
        'Usuário não encontrado. Faça login novamente.'
      );

      // Para a execução.
      return;
    }


    // Ativa o estado de carregamento.
    setLoading(true);

    // Limpa erro anterior.
    setError('');

    // Limpa mensagem de sucesso anterior.
    setSuccess('');


    // Cria o objeto que será enviado para o backend.
    const dados = {

      // Copia todos os dados atuais do formulário.
      ...form,

      // Converte a idade de string para número.
      idade: Number(form.idade),

      // Converte o peso de string para número.
      peso: Number(form.peso),

      // Adiciona o ID do cliente logado.
      clienteId
    };


    // Tenta enviar os dados para o backend.
    try {

      // Decide qual URL será utilizada.
      const url = editando

        // Se editando tiver um ID, significa que é uma edição.
        // Nesse caso, utiliza o ID do pet na URL.
        ? `http://localhost:3001/Pet/${editando}`

        // Caso contrário, é um novo cadastro.
        : 'http://localhost:3001/Pet';


      // Faz a requisição para o backend.
      const res = await fetch(url, {

        // Se estiver editando, usa PUT.
        // Se estiver cadastrando, usa POST.
        method: editando ? 'PUT' : 'POST',

        // Informa que o conteúdo enviado será JSON.
        headers: {
          'Content-Type': 'application/json'
        },

        // Converte o objeto dados para JSON.
        body: JSON.stringify(dados)
      });


      // Converte a resposta do backend para JSON.
      const result = await res.json();


      // Verifica se a requisição retornou algum erro HTTP.
      if (!res.ok) {

        // Cria um erro usando a mensagem enviada pelo backend.
        // Caso não exista, usa uma mensagem padrão.
        throw new Error(
          result.message || 'Erro ao salvar pet.'
        );
      }


      // Mostra mensagem diferente dependendo da operação.
      setSuccess(
        editando
          ? 'Pet atualizado com sucesso!'
          : 'Pet cadastrado com sucesso!'
      );


      // Fecha o formulário.
      setShowForm(false);

      // Limpa o ID de edição.
      setEditando(null);

      // Limpa os campos do formulário.
      setForm(formInicial);


      // Busca novamente os pets para atualizar a lista na tela.
      await carregarPets();


    // Se acontecer algum erro durante o processo.
    } catch (err) {

      // Verifica se o erro é uma instância de Error.
      setError(
        err instanceof Error

          // Se for, mostra a mensagem do erro.
          ? err.message

          // Caso contrário, mostra uma mensagem padrão.
          : 'Erro ao salvar pet.'
      );


    // finally sempre será executado,
    // independentemente de ter dado certo ou errado.
    } finally {

      // Desativa o estado de carregamento.
      setLoading(false);
    }
  };


  // Função responsável por excluir um pet.
  // Recebe o ID do pet que será removido.
  const removerPet = async (id: string) => {

    // Abre uma caixa de confirmação do navegador.
    if (
      !window.confirm(
        'Tem certeza que deseja excluir este pet?'
      )
    ) {

      // Se o usuário clicar em "Cancelar", não faz nada.
      return;
    }


    // Tenta excluir o pet.
    try {

      // Faz uma requisição DELETE para o ID específico.
      const res = await fetch(
        `http://localhost:3001/Pet/${id}`,
        {
          method: 'DELETE'
        }
      );


      // Converte a resposta para JSON.
      const result = await res.json();


      // Verifica se o backend retornou erro.
      if (!res.ok) {

        // Cria um erro com a mensagem recebida.
        throw new Error(
          result.message || 'Erro ao excluir pet.'
        );
      }


      // Remove o pet excluído da lista atual.
      // filter cria um novo array contendo somente
      // os pets cujo ID é diferente do ID excluído.
      setPets(
        pets.filter(pet => pet._id !== id)
      );


      // Mostra mensagem de sucesso.
      setSuccess('Pet excluído com sucesso!');

      // Limpa qualquer mensagem de erro.
      setError('');


    // Caso ocorra algum erro.
    } catch (err) {

      // Mostra a mensagem do erro.
      setError(
        err instanceof Error

          // Se for um Error, utiliza a mensagem dele.
          ? err.message

          // Caso contrário, mostra uma mensagem padrão.
          : 'Erro ao excluir pet.'
      );
    }
  };


  // Retorna o HTML/JSX que será exibido na tela.
  return (

    // Container principal da página.
    <div className="pets-page">

      {/* Barra de navegação da área logada. */}
      <LogNavbar />


      {/* Conteúdo principal da página. */}
      <main className="pets-container">


        {/* Cabeçalho da página de pets. */}
        <section className="pets-header">

          {/* Área contendo título e descrição. */}
          <div>

            {/* Pequeno título da seção. */}
            <span className="section-label">
              MEUS PETS
            </span>


            {/* Título principal. */}
            <h1>
              Seus melhores amigos.
            </h1>


            {/* Texto explicativo. */}
            <p>
              Cadastre seus pets para acompanhar os cuidados,
              serviços e agendamentos de cada um.
            </p>

          </div>


          {/* Botão para abrir o formulário de cadastro. */}
          <button
            className="add-pet-button"
            onClick={abrirCadastro}
          >
            + Adicionar pet
          </button>

        </section>


        {/* 
          O operador && significa:
          se error possuir algum texto, mostra a div.
        */}
        {error && (

          // Caixa visual para mostrar o erro.
          <div className="form-error">

            {/* Exibe a mensagem armazenada em error. */}
            {error}

          </div>
        )}


        {/* 
          Se success possuir algum texto,
          mostra a mensagem de sucesso.
        */}
        {success && (

          // Caixa visual da mensagem de sucesso.
          <div className="form-success">

            {/* Exibe a mensagem armazenada em success. */}
            {success}

          </div>
        )}


        {/* 
          Mostra o estado vazio somente quando:
          - não existem pets;
          - o formulário não está aberto.
        */}
        {pets.length === 0 && !showForm && (

          // Área exibida quando o usuário ainda não possui pets.
          <section className="empty-state">

            {/* Ícone representado pelo símbolo +. */}
            <div className="empty-icon">
              +
            </div>


            {/* Mensagem principal do estado vazio. */}
            <h2>
              Você ainda não possui pets cadastrados.
            </h2>


            {/* Explicação para o usuário. */}
            <p>
              Cadastre seu primeiro pet para começar a
              organizar os cuidados dele.
            </p>


            {/* Botão para iniciar o cadastro. */}
            <button
              className="empty-button"
              onClick={abrirCadastro}
            >
              Cadastrar meu primeiro pet
            </button>

          </section>
        )}


        {/* 
          Se existir pelo menos um pet,
          mostra a lista de pets.
        */}
        {pets.length > 0 && (

          // Seção que contém todos os cards.
          <section className="pets-list">


            {/* 
              map percorre todos os pets do array
              e cria um card para cada pet.
            */}
            {pets.map(pet => (

              // Card individual de um pet.
              <article
                className="pet-card"
                key={pet._id}
              >


                {/* Área da imagem do pet. */}
                <div className="pet-image">

                  {/* 
                    Verifica se o pet possui uma imagem.
                    Se possuir, mostra a imagem.
                  */}
                  {pet.img ? (

                    <img
                      src={pet.img}

                      // Texto alternativo da imagem.
                      alt={`Foto de ${pet.nome}`}
                    />

                  ) : (

                    // Caso não exista imagem,
                    // mostra uma pata como alternativa.
                    <span>
                      🐾
                    </span>
                  )}

                </div>


                {/* Área com as informações do pet. */}
                <div className="pet-info">


                  {/* Cabeçalho do card do pet. */}
                  <div className="pet-card-header">

                    {/* Informações básicas do pet. */}
                    <div>

                      {/* Mostra a espécie. */}
                      <span className="pet-species">
                        {pet.especie}
                      </span>


                      {/* Mostra o nome do pet. */}
                      <h2>
                        {pet.nome}
                      </h2>

                    </div>


                    {/* Área dos botões de ação. */}
                    <div className="pet-actions">


                      {/* Botão para editar o pet. */}
                      <button
                        className="edit-button"
                        onClick={() => editarPet(pet)}
                      >
                        Editar
                      </button>


                      {/* Botão para excluir o pet. */}
                      <button
                        className="delete-button"
                        onClick={() => removerPet(pet._id)}
                      >
                        Excluir
                      </button>

                    </div>

                  </div>


                  {/* Área com os detalhes do pet. */}
                  <div className="pet-details">


                    {/* Informação sobre a raça. */}
                    <div>

                      <span>
                        Raça
                      </span>

                      <strong>
                        {pet.raca || 'Não informado'}
                      </strong>

                    </div>


                    {/* Informação sobre a idade. */}
                    <div>

                      <span>
                        Idade
                      </span>

                      <strong>
                        {pet.idade} anos
                      </strong>

                    </div>


                    {/* Informação sobre o sexo. */}
                    <div>

                      <span>
                        Sexo
                      </span>

                      <strong>
                        {pet.sexo}
                      </strong>

                    </div>


                    {/* Informação sobre o peso. */}
                    <div>

                      <span>
                        Peso
                      </span>

                      <strong>
                        {pet.peso} kg
                      </strong>

                    </div>

                  </div>


                  {/* 
                    Só mostra as observações se o pet
                    realmente possuir alguma.
                  */}
                  {pet.observacoes && (

                    // Área das observações.
                    <div className="pet-observations">

                      {/* Título da informação. */}
                      <span>
                        Observações
                      </span>

                      {/* Texto das observações. */}
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


        {/* 
          O formulário só aparece quando showForm é true.
        */}
        {showForm && (

          // Fundo escuro que fica atrás do formulário.
          <div className="form-overlay">


            {/* Card onde fica o formulário. */}
            <section className="pet-form-card">


              {/* Cabeçalho do formulário. */}
              <div className="form-header">

                {/* Área com título e descrição. */}
                <div>


                  {/* 
                    Se estiver editando, mostra "EDITAR PET".
                    Caso contrário, mostra "NOVO PET".
                  */}
                  <span className="section-label">
                    {editando
                      ? 'EDITAR PET'
                      : 'NOVO PET'}
                  </span>


                  {/* 
                    Título também muda dependendo da operação.
                  */}
                  <h2>
                    {editando
                      ? 'Editar informações'
                      : 'Cadastre seu pet'}
                  </h2>


                  {/* Descrição do formulário. */}
                  <p>
                    Preencha as informações abaixo.
                  </p>

                </div>


                {/* Botão para fechar o formulário. */}
                <button
                  className="close-button"
                  onClick={() => {

                    // Fecha o formulário.
                    setShowForm(false);

                    // Remove o ID de edição.
                    setEditando(null);
                  }}
                >
                  ×
                </button>

              </div>


              {/* 
                Formulário.
                Quando enviado, chama salvarPet.
              */}
              <form onSubmit={salvarPet}>


                {/* Primeira linha do formulário. */}
                <div className="form-row">


                  {/* Campo Nome. */}
                  <div className="input-group">

                    <label>
                      Nome
                    </label>


                    <input
                      name="nome"

                      // Valor atual do campo.
                      value={form.nome}

                      // Executa alterar quando o usuário digita.
                      onChange={alterar}

                      // Texto exibido quando o campo está vazio.
                      placeholder="Nome do pet"

                      // Torna o campo obrigatório.
                      required
                    />

                  </div>


                  {/* Campo Espécie. */}
                  <div className="input-group">

                    <label>
                      Espécie
                    </label>


                    <select
                      name="especie"

                      // Valor selecionado atualmente.
                      value={form.especie}

                      // Atualiza o estado quando muda.
                      onChange={alterar}

                      // Campo obrigatório.
                      required
                    >

                      {/* Opção inicial. */}
                      <option value="">
                        Selecione
                      </option>

                      {/* Opção Cachorro. */}
                      <option value="Cachorro">
                        Cachorro
                      </option>

                      {/* Opção Gato. */}
                      <option value="Gato">
                        Gato
                      </option>

                      {/* Opção Ave. */}
                      <option value="Ave">
                        Ave
                      </option>

                      {/* Opção Outro. */}
                      <option value="Outro">
                        Outro
                      </option>

                    </select>

                  </div>

                </div>


                {/* Segunda linha do formulário. */}
                <div className="form-row">


                  {/* Campo Raça. */}
                  <div className="input-group">

                    <label>
                      Raça
                    </label>


                    <input
                      name="raca"
                      value={form.raca}
                      onChange={alterar}
                      placeholder="Ex: Labrador"
                      required
                    />

                  </div>


                  {/* Campo Idade. */}
                  <div className="input-group">

                    <label>
                      Idade
                    </label>


                    <input
                      name="idade"

                      // Define o campo como numérico.
                      type="number"

                      // Valor atual.
                      value={form.idade}

                      // Atualiza o formulário.
                      onChange={alterar}

                      // Impede valores menores que zero.
                      min="0"

                      // Texto de orientação.
                      placeholder="Idade em anos"

                      // Campo obrigatório.
                      required
                    />

                  </div>

                </div>


                {/* Terceira linha do formulário. */}
                <div className="form-row">


                  {/* Campo Sexo. */}
                  <div className="input-group">

                    <label>
                      Sexo
                    </label>


                    <select
                      name="sexo"
                      value={form.sexo}
                      onChange={alterar}
                      required
                    >

                      {/* Opção inicial. */}
                      <option value="">
                        Selecione
                      </option>

                      {/* Opção Macho. */}
                      <option value="Macho">
                        Macho
                      </option>

                      {/* Opção Fêmea. */}
                      <option value="Fêmea">
                        Fêmea
                      </option>

                    </select>

                  </div>


                  {/* Campo Peso. */}
                  <div className="input-group">

                    <label>
                      Peso
                    </label>


                    <input
                      name="peso"

                      // Campo numérico.
                      type="number"

                      // Valor atual.
                      value={form.peso}

                      // Atualiza o estado.
                      onChange={alterar}

                      // Não permite peso negativo.
                      min="0"

                      // Permite números decimais com uma casa.
                      step="0.1"

                      // Texto de orientação.
                      placeholder="Peso em kg"

                      // Campo obrigatório.
                      required
                    />

                  </div>

                </div>


                {/* Campo para colocar a URL da imagem. */}
                <div className="input-group">

                  <label>
                    URL da imagem
                  </label>


                  <input
                    name="img"

                    // Define que o campo deve receber uma URL.
                    type="url"

                    // Valor atual.
                    value={form.img}

                    // Atualiza o estado.
                    onChange={alterar}

                    // Exemplo para ajudar o usuário.
                    placeholder="https://exemplo.com/cachorro.jpg"
                  />

                </div>


                {/* 
                  Se form.img tiver algum valor,
                  mostra uma prévia da imagem.
                */}
                {form.img && (

                  // Área da prévia.
                  <div className="image-preview">

                    <img
                      src={form.img}
                      alt="Prévia do pet"
                    />

                  </div>
                )}


                {/* Campo de observações. */}
                <div className="input-group">

                  <label>
                    Observações
                  </label>


                  <textarea
                    name="observacoes"

                    // Valor atual das observações.
                    value={form.observacoes}

                    // Atualiza o estado.
                    onChange={alterar}

                    // Texto de orientação.
                    placeholder="Alguma informação importante sobre seu pet?"

                    // Define a altura inicial do textarea.
                    rows={4}
                  />

                </div>


                {/* Área dos botões do formulário. */}
                <div className="form-actions">


                  {/* 
                    Botão Cancelar.
                    type="button" impede que ele envie o formulário.
                  */}
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {

                      // Fecha o formulário.
                      setShowForm(false);

                      // Limpa o modo de edição.
                      setEditando(null);
                    }}
                  >
                    Cancelar
                  </button>


                  {/* Botão responsável por salvar. */}
                  <button
                    type="submit"
                    className="save-button"

                    // Desabilita o botão enquanto está salvando.
                    disabled={loading}
                  >

                    {/* 
                      Se estiver carregando:
                      "Salvando..."
                      
                      Caso contrário:
                      se estiver editando -> "Salvar alterações"
                      se for cadastro -> "Cadastrar pet"
                    */}
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


// Exporta o componente Pets.
// Assim ele pode ser importado e utilizado nas rotas da aplicação.
export default Pets;