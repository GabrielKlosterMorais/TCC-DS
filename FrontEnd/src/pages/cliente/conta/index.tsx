// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";

// Importa o CSS específico da página de conta
import "./styles.css";


// =========================================================
// INTERFACE DO USUÁRIO
// Define quais informações o usuário pode possuir
// =========================================================

interface User {

  // ID do usuário. É opcional porque pode não existir inicialmente.
  id?: string;

  // Nome do cliente
  nome?: string;

  // E-mail do cliente
  email?: string;

  // Telefone do cliente
  telefone?: string;

  // Endereço do cliente
  endereco?: string;

  // Tipo do usuário
  tipo?: string;

  // Imagem do usuário
  img?: string;
}


// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

function Conta() {

  // Guarda os dados do usuário atualmente logado.
  // Começa como um objeto vazio.
  const [user, setUser] = useState<User>({});


  // Guarda qual campo está sendo editado.
  // null significa que nenhum campo está sendo editado.
  const [editingField, setEditingField] =
    useState<string | null>(null);


  // Guarda o novo valor que o usuário está digitando.
  const [editValue, setEditValue] = useState("");


  // Controla se o modal de autenticação está aberto.
  const [authOpen, setAuthOpen] = useState(false);


  // Guarda a senha atual digitada para autenticação.
  const [authPassword, setAuthPassword] = useState("");


  // Guarda mensagens de erro da autenticação.
  const [authError, setAuthError] = useState("");


  // Guarda o campo que o usuário deseja editar
  // depois de confirmar a senha.
  const [fieldToEdit, setFieldToEdit] = useState("");


  // Indica se uma alteração está sendo salva.
  // É utilizado para mostrar "Salvando..."
  // e desabilitar o botão.
  const [saving, setSaving] = useState(false);


  // Guarda mensagens de sucesso ou erro
  // relacionadas à atualização dos dados.
  const [message, setMessage] = useState("");


  // =========================================================
  // CARREGAR USUÁRIO
  // Executado quando o componente é carregado.
  // =========================================================

  useEffect(() => {

    // Procura no localStorage os dados do usuário logado.
    const savedUser = localStorage.getItem("user");


    // Verifica se encontrou algum usuário.
    if (savedUser) {

      try {

        // Converte o texto JSON armazenado
        // novamente para um objeto JavaScript.
        const parsedUser = JSON.parse(savedUser);


        // Coloca os dados encontrados no estado user.
        setUser(parsedUser);

      } catch (error) {

        // Caso o JSON esteja inválido,
        // mostra o erro no console.
        console.error(
          "Erro ao carregar usuário:",
          error
        );
      }
    }

  // [] significa que esse useEffect executa
  // somente uma vez, quando a página é carregada.
  }, []);


  // =========================================================
  // ABRIR EDIÇÃO
  // Decide se precisa pedir senha antes de editar.
  // =========================================================

  const openEdit = (field: string) => {

    // Campos considerados protegidos.
    // Para editar esses campos, o usuário
    // precisa confirmar a senha atual.
    const protectedFields = [
      "email",
      "telefone",
      "endereco",
      "senha",
    ];


    // Limpa qualquer mensagem anterior.
    setMessage("");


    // Verifica se o campo que será editado
    // está na lista de campos protegidos.
    if (protectedFields.includes(field)) {

      // Guarda qual campo será editado
      // depois da autenticação.
      setFieldToEdit(field);


      // Limpa a senha digitada anteriormente.
      setAuthPassword("");


      // Limpa possíveis erros anteriores.
      setAuthError("");


      // Abre o modal de autenticação.
      setAuthOpen(true);

      // Interrompe a função.
      return;
    }


    // Se o campo não estiver protegido,
    // começa a edição diretamente.
    startEditing(field);
  };


  // =========================================================
  // COMEÇAR A EDITAR
  // Abre o modal para alterar um campo.
  // =========================================================

  const startEditing = (field: string) => {

    // Define qual campo está sendo editado.
    setEditingField(field);


    // Se o campo for senha,
    // não mostra a senha atual.
    if (field === "senha") {

      // Começa o campo vazio para o usuário
      // digitar uma nova senha.
      setEditValue("");

      return;
    }


    // Para os outros campos, coloca no formulário
    // o valor que o usuário já possui.
    setEditValue(
      user[field as keyof User] || ""
    );
  };


  // =========================================================
  // AUTENTICAR SENHA
  // Confirma a senha atual antes de permitir
  // alterações nos campos protegidos.
  // =========================================================

  const handleAuthentication = async () => {

    // Limpa mensagens de erro anteriores.
    setAuthError("");


    // Verifica se o usuário digitou uma senha.
    if (!authPassword) {

      setAuthError("Digite sua senha.");

      return;
    }


    // Verifica se existe ID do usuário.
    if (!user.id) {

      setAuthError("Usuário não encontrado.");

      return;
    }


    try {

      // Faz uma requisição POST para o backend
      // verificar se a senha está correta.
      const response = await fetch(
        "http://localhost:3001/Cliente/validar-senha",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Envia o ID do usuário e a senha digitada.
          body: JSON.stringify({
            id: user.id,
            senha: authPassword,
          }),
        }
      );


      // Converte a resposta do backend para JSON.
      const data = await response.json();


      // Verifica se o servidor retornou erro.
      if (!response.ok) {

        // Mostra mensagem de senha incorreta.
        setAuthError("Erro: senha incorreta");

        return;
      }


      // Mostra a resposta do backend no console.
      console.log(data);


      // =====================================================
      // SENHA CORRETA
      // =====================================================

      // Fecha o modal de autenticação.
      setAuthOpen(false);


      // Limpa a senha digitada.
      setAuthPassword("");


      // Limpa mensagens de erro.
      setAuthError("");


      // Agora que a senha foi confirmada,
      // abre o modal para editar o campo escolhido.
      startEditing(fieldToEdit);


    } catch (error) {

      // Mostra o erro no console.
      console.error(
        "Erro na autenticação:",
        error
      );


      // Informa ao usuário que não foi possível
      // conectar ao backend.
      setAuthError(
        "Erro ao conectar com o servidor."
      );
    }
  };


  // =========================================================
  // SALVAR ALTERAÇÃO
  // Envia a alteração para o backend.
  // =========================================================

  const handleSave = async () => {

    // Verifica se:
    // 1. Existe campo sendo editado;
    // 2. Existe ID do usuário;
    // 3. O novo valor não está vazio.
    if (
      !editingField ||
      !user.id ||
      !editValue.trim()
    ) {
      return;
    }


    // Informa que o salvamento começou.
    setSaving(true);


    // Limpa mensagens anteriores.
    setMessage("");


    try {

      // =====================================================
      // MAPA DOS CAMPOS
      // Converte o nome usado no frontend
      // para o nome esperado pelo backend.
      // =====================================================

      const fieldMap: Record<string, string> = {

        // No frontend usamos "nome",
        // mas o backend espera "nomeCliente".
        nome: "nomeCliente",

        email: "email",

        telefone: "telefone",

        endereco: "endereco",

        senha: "senha",
      };


      // Descobre qual nome do campo deve ser
      // enviado para o backend.
      const backendField =
        fieldMap[editingField];


      // =====================================================
      // REQUISIÇÃO PARA O BACKEND
      // =====================================================

      const response = await fetch(
        `http://localhost:3001/Cliente/${user.id}`,
        {
          // Método utilizado para atualizar dados.
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          // Envia somente o campo que está sendo alterado.
          body: JSON.stringify({
            [backendField]: editValue,
          }),
        }
      );


      // Converte a resposta do servidor para JSON.
      const data = await response.json();


      // Verifica se ocorreu algum erro.
      if (!response.ok) {

        // Mostra a mensagem enviada pelo backend.
        setMessage(
          data.message ||
          "Erro ao atualizar os dados."
        );

        return;
      }


      // =====================================================
      // ATUALIZAÇÃO LOCAL
      // =====================================================

      // Cria um novo objeto com os dados antigos
      // e substitui o campo que foi alterado.
      const updatedUser = {
        ...user,
        [editingField]: editValue,
      };


      // Atualiza o estado do usuário.
      setUser(updatedUser);


      // Atualiza também o usuário armazenado
      // no localStorage.
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      // Fecha o modal de edição.
      setEditingField(null);


      // Limpa o valor do campo.
      setEditValue("");


      // Mostra mensagem de sucesso.
      setMessage(
        "Dados atualizados com sucesso!"
      );


    } catch (error) {

      // Mostra o erro no console.
      console.error(
        "Erro ao salvar:",
        error
      );


      // Mostra mensagem para o usuário.
      setMessage(
        "Erro ao conectar com o servidor."
      );


    } finally {

      // Independentemente de sucesso ou erro,
      // informa que o salvamento terminou.
      setSaving(false);
    }
  };


  // =========================================================
  // LABEL DOS CAMPOS
  // Converte o nome interno para um nome amigável.
  // =========================================================

  const getFieldLabel = (field: string) => {

    // Define os nomes que serão exibidos na tela.
    const labels: Record<string, string> = {

      nome: "Nome",

      email: "E-mail",

      telefone: "Telefone",

      endereco: "Endereço",

      senha: "Senha",
    };


    // Retorna o nome correspondente.
    // Caso não encontre, retorna o próprio field.
    return labels[field] || field;
  };


  // =========================================================
  // VALOR DOS CAMPOS
  // Define o que será mostrado na tela.
  // =========================================================

  const getFieldValue = (field: string) => {

    // Por segurança, a senha nunca é exibida.
    if (field === "senha") {

      return "••••••••";
    }


    // Retorna o valor do usuário.
    // Se não existir, mostra "Não informado".
    return (
      user[field as keyof User] ||
      "Não informado"
    );
  };


  // =========================================================
  // HTML / JSX DA PÁGINA
  // =========================================================

  return (

    <main className="conta-container">

      {/* Card principal da conta */}
      <section className="conta-card">


        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <div className="conta-header">

          <h1>
            Minha conta
          </h1>

          <p>
            Gerencie suas informações pessoais.
          </p>

        </div>


        {/* =================================================
            MENSAGEM DE SUCESSO OU ERRO
        ================================================= */}

        {message && (

          <div className="account-message">

            {message}

          </div>

        )}


        {/* =================================================
            CAMPOS DA CONTA
        ================================================= */}

        <div className="conta-fields">


          {/* =================================================
              NOME
          ================================================= */}

          <div className="conta-field">

            <div className="field-info">

              <label>
                Nome
              </label>

              <span>
                {getFieldValue("nome")}
              </span>

            </div>


            {/* Botão para editar o nome */}
            <button
              type="button"
              onClick={() => openEdit("nome")}
            >
              Editar
            </button>

          </div>


          {/* =================================================
              E-MAIL
          ================================================= */}

          <div className="conta-field">

            <div className="field-info">

              <label>
                E-mail
              </label>

              <span>
                {getFieldValue("email")}
              </span>

            </div>


            {/* Botão para editar o e-mail */}
            <button
              type="button"
              onClick={() => openEdit("email")}
            >
              Editar
            </button>

          </div>


          {/* =================================================
              TELEFONE
          ================================================= */}

          <div className="conta-field">

            <div className="field-info">

              <label>
                Telefone
              </label>

              <span>
                {getFieldValue("telefone")}
              </span>

            </div>


            {/* Botão para editar o telefone */}
            <button
              type="button"
              onClick={() => openEdit("telefone")}
            >
              Editar
            </button>

          </div>


          {/* =================================================
              ENDEREÇO
          ================================================= */}

          <div className="conta-field">

            <div className="field-info">

              <label>
                Endereço
              </label>

              <span>
                {getFieldValue("endereco")}
              </span>

            </div>


            {/* Botão para editar o endereço */}
            <button
              type="button"
              onClick={() => openEdit("endereco")}
            >
              Editar
            </button>

          </div>


          {/* =================================================
              SENHA
          ================================================= */}

          <div className="conta-field">

            <div className="field-info">

              <label>
                Senha
              </label>

              <span>
                {getFieldValue("senha")}
              </span>

            </div>


            {/* Botão para editar a senha */}
            <button
              type="button"
              onClick={() => openEdit("senha")}
            >
              Editar
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          MODAL DE AUTENTICAÇÃO
          Aparece antes de editar campos protegidos.
      ===================================================== */}

      {authOpen && (

        <div className="modal-overlay">

          <div className="modal">


            {/* Botão para fechar o modal */}
            <button
              type="button"
              className="modal-close"
              onClick={() => {

                // Fecha o modal.
                setAuthOpen(false);

                // Limpa a senha.
                setAuthPassword("");

                // Limpa o erro.
                setAuthError("");

              }}
            >
              ×
            </button>


            <h2>
              Autenticação
            </h2>


            <p>

              Para editar{" "}

              <strong>
                {getFieldLabel(fieldToEdit)}
              </strong>

              , confirme sua senha.

            </p>


            {/* Campo de senha */}
            <div className="modal-input">

              <label htmlFor="auth-password">
                Senha atual
              </label>


              <input
                id="auth-password"
                type="password"
                value={authPassword}

                // Atualiza a senha conforme o usuário digita.
                onChange={(e) => {

                  setAuthPassword(
                    e.target.value
                  );

                  // Limpa o erro enquanto o usuário digita novamente.
                  setAuthError("");

                }}

                placeholder="Digite sua senha"


                // Permite confirmar apertando Enter.
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    handleAuthentication();

                  }

                }}

              />

            </div>


            {/* Mostra o erro somente se existir */}
            {authError && (

              <div className="auth-error">

                {authError}

              </div>

            )}


            {/* Botão para confirmar a senha */}
            <button
              type="button"
              className="confirm-button"
              onClick={handleAuthentication}
            >
              Confirmar
            </button>

          </div>

        </div>

      )}


      {/* =====================================================
          MODAL DE EDIÇÃO
          Aparece depois que a edição é liberada.
      ===================================================== */}

      {editingField && (

        <div className="modal-overlay">

          <div className="modal">


            {/* Botão para fechar o modal */}
            <button
              type="button"
              className="modal-close"
              onClick={() => {

                // Fecha o modal.
                setEditingField(null);

                // Limpa o valor digitado.
                setEditValue("");

              }}
            >
              ×
            </button>


            {/* Título mostra qual campo está sendo editado */}
            <h2>
              Editar {getFieldLabel(editingField)}
            </h2>


            <div className="modal-input">

              {/* Label do campo */}
              <label htmlFor="edit-value">

                {getFieldLabel(editingField)}

              </label>


              <input
                id="edit-value"

                // Se estiver editando senha,
                // o campo fica do tipo password.
                type={
                  editingField === "senha"
                    ? "password"
                    : "text"
                }

                // Valor atual do campo.
                value={editValue}

                // Atualiza o valor conforme o usuário digita.
                onChange={(e) =>
                  setEditValue(
                    e.target.value
                  )
                }

                // Muda o placeholder dependendo do campo.
                placeholder={
                  editingField === "senha"
                    ? "Digite a nova senha"
                    : `Digite seu ${getFieldLabel(
                        editingField
                      ).toLowerCase()}`
                }

              />

            </div>


            {/* =================================================
                BOTÕES DO MODAL
            ================================================= */}

            <div className="modal-actions">


              {/* Botão cancelar */}
              <button
                type="button"
                className="cancel-button"
                onClick={() => {

                  // Fecha o modal.
                  setEditingField(null);

                  // Limpa o valor digitado.
                  setEditValue("");

                }}
              >
                Cancelar
              </button>


              {/* Botão salvar */}
              <button
                type="button"
                className="confirm-button"
                onClick={handleSave}

                // Desabilita enquanto estiver salvando.
                disabled={saving}
              >

                {/* Enquanto salva mostra "Salvando..." */}
                {saving
                  ? "Salvando..."
                  : "Salvar"}

              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}


// Exporta o componente para poder ser utilizado
// nas rotas da aplicação.
export default Conta;