import { Link, useLocation } from 'react-router-dom'
import './styles.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <div className="logo-icon">P</div>
        <h1>PetCare</h1>
      </Link>

      <div className="navbar-links">

        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
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

      </div>

      <div className="navbar-actions">

        <Link to="/login" className="login-button">
          Entrar
        </Link>

        <Link to="/registro" className="register-button">
          Criar conta
        </Link>

      </div>

    </nav>
  )
}

export default Navbar