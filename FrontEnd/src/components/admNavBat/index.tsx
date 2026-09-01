import './styles.css'

function AdmNavBar() {
  return (
    <nav className="admin-navbar">
      <h1>PetCare</h1>

      <div className="admin-nav-links">
        <a href="/admin">Dashboard</a>
        <a href="/admin/agendamentos">Agendamentos</a>
        <a href="/admin/pagamentos">Pagamentos</a>
        <a href="/admin/clientes">Clientes e Pets</a>
        <a href="/">Sair</a>
      </div>
    </nav>
  )
}

export default AdmNavBar