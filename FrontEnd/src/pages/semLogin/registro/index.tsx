import React, { useState, FormEvent } from "react";
import "./styles.css";

interface RegisterForm {
  nomeCliente: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  dataNascimento?: string;
  senha: string;
  confirmarSenha?: string;
}

const Registro: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    nomeCliente: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
    dataNascimento: undefined,
    senha: "",
    confirmarSenha: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Controla a abertura dos termos
  const [termsOpen, setTermsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nomeCliente: form.nomeCliente,
        cpf: form.cpf,
        telefone: form.telefone,
        email: form.email,
        endereco: form.endereco,
        senha: form.senha,
      };

      const res = await fetch("http://localhost:3001/Cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);

        setError((body && body.message) || "Erro ao criar usuário");

        setLoading(false);
        return;
      }

      window.location.href = "/login";
    } catch {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-container">
      {/* ==================== BANNER ==================== */}

      <section className="register-banner">
        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
          alt="Cachorro"
          className="banner-image"
        />

        <div className="banner-content">
          <div className="logo">
            <h1 className="logo-text">PetCare</h1>
          </div>

          <div className="banner-text">
            <h2>Crie sua conta e cuide ainda melhor do seu pet.</h2>

            <p>
              Tenha acesso aos serviços, agendamentos e informações dos seus
              pets.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FORMULÁRIO ==================== */}

      <section className="register-form-container">
        <div className="register-form">
          <div className="mobile-logo">
            <h1>PetCare</h1>
          </div>

          <div className="form-header">
            <h2>Crie sua conta</h2>

            <p>Preencha seus dados para começar.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* NOME + TELEFONE */}

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="nomeCliente">Nome</label>

                <div className="input-wrapper">
                  <input
                    type="text"
                    id="nomeCliente"
                    value={form.nomeCliente}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="telefone">Telefone</label>

                <div className="input-wrapper">
                  <input
                    type="tel"
                    id="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* E-MAIL */}

            <div className="input-group">
              <label htmlFor="email">E-mail</label>

              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>
            </div>

            {/* DATA */}

            <div className="input-group">
              <label htmlFor="dataNascimento">Data de nascimento</label>

              <div className="input-wrapper">
                <input
                  type="date"
                  id="dataNascimento"
                  value={form.dataNascimento || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ENDEREÇO */}

            <div className="input-group">
              <label htmlFor="endereco">Endereço</label>

              <div className="input-wrapper">
                <input
                  type="text"
                  id="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  placeholder="Digite seu endereço"
                  required
                />
              </div>
            </div>

            {/* SENHA + CONFIRMAÇÃO */}

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="senha">Senha</label>

                <div className="input-wrapper">
                  <input
                    type="password"
                    id="senha"
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="confirmarSenha">Confirmar senha</label>

                <div className="input-wrapper">
                  <input
                    type="password"
                    id="confirmarSenha"
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Repita sua senha"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ==================== TERMOS ==================== */}

            <label className="terms">
              <input type="checkbox" required />

              <span>
                Li e aceito os{" "}
                <button
                  type="button"
                  className="terms-link"
                  onClick={() => setTermsOpen(true)}
                >
                  termos de uso
                </button>
              </span>
            </label>

            {/* ERRO */}

            {error && <div className="form-error">{error}</div>}

            {/* BOTÃO */}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Criar conta"}
            </button>
          </form>

          {/* LOGIN */}

          <div className="login">
            <p>Já possui uma conta?</p>

            <a href="/login">Entrar</a>
          </div>
        </div>
      </section>

      {/* ==================== MODAL DOS TERMOS ==================== */}

      {termsOpen && (
        <div className="terms-overlay" onClick={() => setTermsOpen(false)}>
          <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="terms-close"
              onClick={() => setTermsOpen(false)}
            >
              ×
            </button>

            <h2>Termos de Uso</h2>

            <p>
              Bem-vindo ao PetCare! Ao criar sua conta, você concorda com os
              termos apresentados abaixo.
            </p>

            <h3>1. Uso da plataforma</h3>

            <p>
              O PetCare permite que você cadastre seus pets, consulte serviços
              disponíveis e realize agendamentos para atendimento.
            </p>

            <h3>2. Informações do usuário</h3>

            <p>
              As informações fornecidas durante o cadastro devem ser verdadeiras
              e atualizadas.
            </p>

            <h3>3. Agendamentos</h3>

            <p>
              O usuário é responsável por conferir os dados do agendamento,
              incluindo serviço, data e horário escolhidos.
            </p>

            <h3>4. Responsabilidade</h3>

            <p>
              O usuário deve manter seus dados de acesso protegidos e não
              compartilhar sua senha com outras pessoas.
            </p>

            <h3>5. Aceitação</h3>

            <p>
              Ao marcar a opção "Li e aceito os termos de uso", você confirma
              que leu e concorda com estas condições.
            </p>

            <button
              type="button"
              className="terms-ok"
              onClick={() => setTermsOpen(false)}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Registro;
