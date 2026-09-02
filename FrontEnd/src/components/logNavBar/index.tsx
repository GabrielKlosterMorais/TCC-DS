import { Link, useLocation, useNavigate } from 'react-router-dom'
import './styles.css'

function LogNavbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const userData = localStorage.getItem('user')

  let userName = 'Usuário'

  if (userData) {
    try {
      const user = JSON.parse(userData)

      userName =
        user.nome ||
        user.name ||
        user.usuario?.nome ||
        'Usuário'
    } catch {
      userName = 'Usuário'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="logged-navbar">

      <Link to="/loghome" className="logged-navbar-logo">
        <div className="logged-logo-icon">P</div>
        <h1>PetCare</h1>
      </Link>

      <div className="logged-navbar-links">

        <Link
          to="/loghome"
          className={location.pathname === '/loghome' ? 'active' : ''}
        >
          Início
        </Link>

        <Link
          to="/servicos"
          className={location.pathname === '/servicos' ? 'active' : ''}
        >
          Serviços
        </Link>

        <Link
          to="/sobre"
          className={location.pathname === '/sobre' ? 'active' : ''}
        >
          Sobre nós
        </Link>

        <Link
          to="/petcare"
          className={location.pathname === '/petcare' ? 'active' : ''}
        >
          PetCare
        </Link>

        <Link
          to="/pagamento"
          className={location.pathname === '/pagamento' ? 'active' : ''}
        >
          Pagamentos
        </Link>

      </div>

      <div className="logged-navbar-actions">

        <Link
          to="/pets"
          className="pets-button"
        >
          Meus Pets
        </Link>

        <Link
          to="/agendamentos"
          className="appointments-button"
        >
          Agendamentos
        </Link>

        <div className="user-menu">

          <div className="user-icon">
            {userName.charAt(0).toUpperCase()}
          </div>

          <span className="user-name">
            {userName}
          </span>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Sair
          </button>

        </div>

      </div>

    </nav>
  )
}

export default LogNavbar