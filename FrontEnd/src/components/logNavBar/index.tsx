import { Link, useLocation, useNavigate } from 'react-router-dom'
import './styles.css'

/* Componente responsável pela barra de navegação do usuário logado */
function LogNavbar() {

  /* Obtém a página atual para identificar qual link está ativo */
  const location = useLocation()

  /* Permite realizar navegação através do código */
  const navigate = useNavigate()

  /* Busca os dados do usuário armazenados no navegador */
  const userData = localStorage.getItem('user')

  /* Nome padrão caso os dados do usuário não sejam encontrados */
  let userName = 'Usuário'

  /* Verifica se existem dados armazenados */
  if (userData) {
    try {

      /* Converte os dados armazenados em JSON para um objeto */
      const user = JSON.parse(userData)

      /* Pega o nome do cliente */
      userName =
        user.nomeCliente ||
        user.nome ||
        user.name ||
        user.usuario?.nome ||
        'Usuário'

    } catch {

      /* Caso os dados não possam ser convertidos, usa o nome padrão */
      userName = 'Usuário'
    }
  }

  /* Função responsável por realizar o logout */
  const handleLogout = () => {

    /* Remove os dados do usuário */
    localStorage.removeItem('user')

    /* Remove o ID do usuário */
    localStorage.removeItem('userId')

    /* Redireciona para a tela de login */
    navigate('/login')
  }

  return (
    /* Barra principal de navegação */
    <nav className="logged-navbar">

      {/* Logo que também funciona como link para a página inicial */}
      <Link to="/loghome" className="logged-navbar-logo">

        {/* Ícone com a letra P */}
        <div className="logged-logo-icon">P</div>

        {/* Nome da aplicação */}
        <h1>PetCare</h1>

      </Link>

      {/* Área dos links principais */}
      <div className="logged-navbar-links">

        {/* Link para a página inicial */}
        <Link
          to="/loghome"
          className={location.pathname === '/loghome' ? 'active' : ''}
        >
          Início
        </Link>

        {/* Link para a página de serviços */}
        <Link
          to="/cliente/servicos"
          className={location.pathname === '/servicos' ? 'active' : ''}
        >
          Serviços
        </Link>

        {/* Link para a página de pagamentos */}
        <Link
          to="/pagamento"
          className={location.pathname === '/pagamento' ? 'active' : ''}
        >
          Pagamentos
        </Link>

      </div>

      {/* Área das ações do usuário */}
      <div className="logged-navbar-actions">

        {/* Link para os pets cadastrados */}
        <Link
          to="/pets"
          className="pets-button"
        >
          Meus Pets
        </Link>

        {/* Link para os agendamentos */}
        <Link
          to="/agendamentos"
          className="appointments-button"
        >
          Agendamentos
        </Link>

        {/* Link para a página da conta do usuário */}
        <Link to="/cliente/conta" className="user-menu">

          {/* Mostra a primeira letra do nome do usuário */}
          <div className="user-icon">
            {userName.charAt(0).toUpperCase()}
          </div>

          {/* Mostra o nome do usuário */}
          <span className="user-name">
            {userName}
          </span>

        </Link>

        {/* Botão responsável por sair da conta */}
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Sair
        </button>

      </div>

    </nav>
  )
}

/* Permite que o componente seja utilizado em outras páginas */
export default LogNavbar