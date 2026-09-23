import { Link, useLocation } from 'react-router-dom'
import './styles.css'

/* Componente responsável pela barra de navegação pública do site */
function Navbar() {

  /* Obtém o caminho da página que está sendo acessada */
  const location = useLocation()

  return (
    /* Elemento principal da barra de navegação */
    <nav className="navbar">

      {/* Logo do PetCare que leva para a página inicial */}
      <Link to="/" className="navbar-logo">

        {/* Ícone com a letra P */}
        <div className="logo-icon">P</div>

        {/* Nome da aplicação */}
        <h1>PetCare</h1>

      </Link>

      {/* Área que contém os links principais */}
      <div className="navbar-links">

        {/* Link para a página inicial */}
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Início
        </Link>

        {/* Link para a página de serviços */}
        <Link to="/servicos" className={location.pathname === '/servicos' ? 'active' : ''}>
          Serviços
        </Link>

        {/* Link para a página "Sobre nós" */}
        <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''}>
          Sobre nós
        </Link>

        {/* Link para a página específica do PetCare */}
        <Link
          to="/petcare"
          className={`petcare-link ${location.pathname === '/petcare' ? 'active' : ''}`}
        >
          PetCare
        </Link>

      </div>

      {/* Área dos botões de acesso à conta */}
      <div className="navbar-actions">

        {/* Link para a página de login */}
        <Link to="/login" className="login-button">
          Entrar
        </Link>

        {/* Link para a página de cadastro */}
        <Link to="/registro" className="register-button">
          Criar conta
        </Link>

      </div>

    </nav>
  )
}

/* Permite que o componente seja utilizado em outras páginas */
export default Navbar