import React, { useState } from 'react'
import './styles.css'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('http://localhost:3001/Cliente/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => null)

        setError(
          err && err.message
            ? err.message
            : 'Erro ao efetuar login'
        )

        return
      }

      const data = await res.json()

      localStorage.setItem('user', JSON.stringify(data))

      if (data.tipo === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/loghome'
      }

    } catch {
      setError('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">

      <section className="login-page-banner">

        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
          alt="Cachorro"
          className="login-page-image"
        />

        <div className="login-page-overlay">

          <div className="login-page-logo">
            <h1>PetCare</h1>
          </div>

          <div className="login-page-message">
            <h2>Bem-vindo de volta.</h2>

            <p>
              Faça login para acessar seus agendamentos e pets.
            </p>
          </div>

        </div>

      </section>

      <section className="login-page-form-area">

        <div className="login-page-form">

          <div className="login-page-mobile-logo">
            <h1>PetCare</h1>
          </div>

          <div className="login-page-header">

            <h2>Entrar</h2>

            <p>
              Use seu e-mail e senha para entrar.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="login-page-field">

              <label htmlFor="login-email">
                E-mail
              </label>

              <div className="login-page-input-box">

                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Digite seu e-mail"
                  required
                />

              </div>

            </div>

            <div className="login-page-field">

              <label htmlFor="login-password">
                Senha
              </label>

              <div className="login-page-input-box">

                <input
                  type="password"
                  id="login-password"
                  value={senha}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSenha(e.target.value)
                  }
                  placeholder="Digite sua senha"
                  required
                />

              </div>

            </div>

            <div className="login-page-recovery">
              <a href="/esqueci-senha">
                Esqueci minha senha?
              </a>
            </div>

            {error && (
              <div className="login-page-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-page-button"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

          </form>

          <div className="login-page-register">

            <p>
              Não possui uma conta?
            </p>

            <a href="/registro">
              Criar conta
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Login