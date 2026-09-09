import React, { useState } from 'react'
import './styles.css'

function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setMessage(null)
    setError(null)

    if (!email) {
      setError('Digite seu e-mail.')
      return
    }

    setMessage(
      'Se o e-mail estiver cadastrado, você receberá as instruções para recuperar sua senha.'
    )
  }

  return (
    <div className="recovery-page">

      <section className="recovery-left">

        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
          alt="Cachorro"
          className="recovery-dog-image"
        />

        <div className="recovery-dark-layer"></div>

        <div className="recovery-logo">
          PetCare
        </div>

        <div className="recovery-message">
          <h1>Recupere sua senha.</h1>

          <p>
            Informe seu e-mail para recuperar o acesso à sua conta.
          </p>
        </div>

      </section>

      <section className="recovery-right">

        <div className="recovery-box">

          <div className="recovery-title">
            <h2>Esqueci minha senha</h2>

            <p>
              Digite o e-mail cadastrado na sua conta.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="recovery-input-area">

              <label htmlFor="recovery-email">
                E-mail
              </label>

              <input
                type="email"
                id="recovery-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
              />

            </div>

            {error && (
              <div className="recovery-error">
                {error}
              </div>
            )}

            {message && (
              <div className="recovery-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="recovery-submit"
            >
              Recuperar senha
            </button>

          </form>

          <div className="recovery-login-link">
            <a href="/login">
              ← Voltar para o login
            </a>
          </div>

        </div>

      </section>

    </div>
  )
}

export default EsqueciSenha