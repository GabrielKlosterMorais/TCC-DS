import React, { useState } from 'react'
import './styles.css'

// Componente responsável pela tela de login
function Login() {

  // Guarda o e-mail digitado
  const [email, setEmail] = useState<string>('')

  // Guarda a senha digitada
  const [senha, setSenha] = useState<string>('')

  // Guarda mensagens de erro
  const [error, setError] = useState<string | null>(null)

  // Controla o carregamento do botão
  const [loading, setLoading] = useState<boolean>(false)


  // Executada quando o formulário é enviado
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
          email: email.trim(),
          senha,
        }),
      })

      const resposta = await res.json()

      console.log('Resposta do login:', resposta)

      if (!res.ok) {
        setError(
          resposta?.message || 'E-mail ou senha incorretos'
        )
        return
      }

      // O backend retorna o cliente dentro de "data"
      const usuario = resposta?.data

      console.log('Usuário recebido:', usuario)

      // Verifica se o backend realmente retornou um cliente
      if (!usuario) {
        setError('O servidor não retornou os dados do usuário.')
        return
      }

      // O MongoDB utiliza "_id" para identificar o cliente
      if (!usuario._id) {
        setError('O usuário retornado não possui um ID.')
        return
      }

      // Remove possíveis dados antigos
      localStorage.removeItem('user')
      localStorage.removeItem('userId')

      // Salva o cliente completo
      localStorage.setItem(
        'user',
        JSON.stringify(usuario)
      )

      // Salva somente o ID do cliente
      localStorage.setItem(
        'userId',
        usuario._id
      )

      console.log(
        'Usuário salvo no localStorage:',
        JSON.parse(localStorage.getItem('user') || '{}')
      )

      console.log(
        'ID salvo:',
        localStorage.getItem('userId')
      )

      // Redireciona
      if (usuario.tipo === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/loghome'
      }

    } catch (error) {
      console.error('Erro no login:', error)
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

            <h2>
              Bem-vindo de volta.
            </h2>

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