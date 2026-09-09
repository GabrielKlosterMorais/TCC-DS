import { useEffect, useState } from "react";
import "./styles.css";

interface User {
  id?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  tipo?: string;
  img?: string;
}

function Conta() {
  const [user, setUser] = useState<User>({});

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const [authOpen, setAuthOpen] = useState(false);
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [fieldToEdit, setFieldToEdit] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
  }, []);

  // ==========================================
  // ABRIR EDIÇÃO
  // ==========================================

  const openEdit = (field: string) => {
    const protectedFields = [
      "email",
      "telefone",
      "endereco",
      "senha",
    ];

    setMessage("");

    if (protectedFields.includes(field)) {
      setFieldToEdit(field);
      setAuthPassword("");
      setAuthError("");
      setAuthOpen(true);
      return;
    }

    startEditing(field);
  };

  // ==========================================
  // COMEÇAR A EDITAR
  // ==========================================

  const startEditing = (field: string) => {
    setEditingField(field);

    if (field === "senha") {
      setEditValue("");
      return;
    }

    setEditValue(user[field as keyof User] || "");
  };

  // ==========================================
  // AUTENTICAR SENHA
  // ==========================================

  const handleAuthentication = async () => {
    setAuthError("");

    if (!authPassword) {
      setAuthError("Digite sua senha.");
      return;
    }

    if (!user.id) {
      setAuthError("Usuário não encontrado.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/Cliente/validar-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            senha: authPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setAuthError("Erro: senha incorreta");
        return;
      }

      console.log(data);

      // Senha correta
      setAuthOpen(false);
      setAuthPassword("");
      setAuthError("");

      startEditing(fieldToEdit);

    } catch (error) {
      console.error("Erro na autenticação:", error);

      setAuthError("Erro ao conectar com o servidor.");
    }
  };

  // ==========================================
  // SALVAR ALTERAÇÃO
  // ==========================================

  const handleSave = async () => {
  if (!editingField || !user.id || !editValue.trim()) {
    return;
  }

  setSaving(true);
  setMessage("");

  try {
    const fieldMap: Record<string, string> = {
      nome: "nomeCliente",
      email: "email",
      telefone: "telefone",
      endereco: "endereco",
      senha: "senha",
    };

    const backendField = fieldMap[editingField];

    const response = await fetch(
      `http://localhost:3001/Cliente/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [backendField]: editValue,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(
        data.message || "Erro ao atualizar os dados."
      );
      return;
    }

    const updatedUser = {
      ...user,
      [editingField]: editValue,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setEditingField(null);
    setEditValue("");

    setMessage("Dados atualizados com sucesso!");

  } catch (error) {
    console.error("Erro ao salvar:", error);
    setMessage("Erro ao conectar com o servidor.");

  } finally {
    setSaving(false);
  }
};

  // ==========================================
  // LABEL DOS CAMPOS
  // ==========================================

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      nome: "Nome",
      email: "E-mail",
      telefone: "Telefone",
      endereco: "Endereço",
      senha: "Senha",
    };

    return labels[field] || field;
  };

  // ==========================================
  // VALOR DOS CAMPOS
  // ==========================================

  const getFieldValue = (field: string) => {
    if (field === "senha") {
      return "••••••••";
    }

    return user[field as keyof User] || "Não informado";
  };

  return (
    <main className="conta-container">

      <section className="conta-card">

        {/* HEADER */}

        <div className="conta-header">
          <h1>Minha conta</h1>

          <p>
            Gerencie suas informações pessoais.
          </p>
        </div>

        {/* MENSAGEM */}

        {message && (
          <div className="account-message">
            {message}
          </div>
        )}

        {/* CAMPOS */}

        <div className="conta-fields">

          {/* NOME */}

          <div className="conta-field">

            <div className="field-info">
              <label>Nome</label>

              <span>
                {getFieldValue("nome")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => openEdit("nome")}
            >
              Editar
            </button>

          </div>

          {/* EMAIL */}

          <div className="conta-field">

            <div className="field-info">
              <label>E-mail</label>

              <span>
                {getFieldValue("email")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => openEdit("email")}
            >
              Editar
            </button>

          </div>

          {/* TELEFONE */}

          <div className="conta-field">

            <div className="field-info">
              <label>Telefone</label>

              <span>
                {getFieldValue("telefone")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => openEdit("telefone")}
            >
              Editar
            </button>

          </div>

          {/* ENDEREÇO */}

          <div className="conta-field">

            <div className="field-info">
              <label>Endereço</label>

              <span>
                {getFieldValue("endereco")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => openEdit("endereco")}
            >
              Editar
            </button>

          </div>

          {/* SENHA */}

          <div className="conta-field">

            <div className="field-info">
              <label>Senha</label>

              <span>
                {getFieldValue("senha")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => openEdit("senha")}
            >
              Editar
            </button>

          </div>

        </div>
      </section>

      {/* ==========================================
          MODAL DE AUTENTICAÇÃO
      ========================================== */}

      {authOpen && (

        <div className="modal-overlay">

          <div className="modal">

            <button
              type="button"
              className="modal-close"
              onClick={() => {
                setAuthOpen(false);
                setAuthPassword("");
                setAuthError("");
              }}
            >
              ×
            </button>

            <h2>Autenticação</h2>

            <p>
              Para editar{" "}
              <strong>
                {getFieldLabel(fieldToEdit)}
              </strong>
              , confirme sua senha.
            </p>

            <div className="modal-input">

              <label htmlFor="auth-password">
                Senha atual
              </label>

              <input
                id="auth-password"
                type="password"
                value={authPassword}
                onChange={(e) => {
                  setAuthPassword(e.target.value);
                  setAuthError("");
                }}
                placeholder="Digite sua senha"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAuthentication();
                  }
                }}
              />

            </div>

            {authError && (
              <div className="auth-error">
                {authError}
              </div>
            )}

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

      {/* ==========================================
          MODAL DE EDIÇÃO
      ========================================== */}

      {editingField && (

        <div className="modal-overlay">

          <div className="modal">

            <button
              type="button"
              className="modal-close"
              onClick={() => {
                setEditingField(null);
                setEditValue("");
              }}
            >
              ×
            </button>

            <h2>
              Editar {getFieldLabel(editingField)}
            </h2>

            <div className="modal-input">

              <label htmlFor="edit-value">
                {getFieldLabel(editingField)}
              </label>

              <input
                id="edit-value"
                type={
                  editingField === "senha"
                    ? "password"
                    : "text"
                }
                value={editValue}
                onChange={(e) =>
                  setEditValue(e.target.value)
                }
                placeholder={
                  editingField === "senha"
                    ? "Digite a nova senha"
                    : `Digite seu ${getFieldLabel(
                        editingField
                      ).toLowerCase()}`
                }
              />

            </div>

            <div className="modal-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setEditingField(null);
                  setEditValue("");
                }}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="confirm-button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Conta;