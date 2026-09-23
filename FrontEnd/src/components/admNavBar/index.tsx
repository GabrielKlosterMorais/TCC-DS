import './styles.css'
// Importa o arquivo CSS responsável pela aparência
// da barra de navegação administrativa.


function AdmNavBar() {
  // Cria o componente React chamado AdmNavBar.
  // Esse componente representa a barra de navegação
  // utilizada na área administrativa.

  return (
    // Retorna a estrutura HTML que será exibida na tela.
    <nav className="admin-navbar">

      {/* Nome do sistema que aparece na barra. */}
      <h1>PetCare</h1>


      {/* Div que agrupa todos os links de navegação
          da área administrativa. */}
      <div className="admin-nav-links">

        {/* Link para o Dashboard administrativo. */}
        <a href="/admin">Dashboard</a>


        {/* Link para a página de gerenciamento
            dos agendamentos. */}
        <a href="/admin/agendamentos">Agendamentos</a>


        {/* Link para a página de gerenciamento
            dos pagamentos. */}
        <a href="/admin/pagamentos">Pagamentos</a>


        {/* Link para a página onde o administrador
            gerencia clientes e pets. */}
        <a href="/admin/clientes">Clientes e Pets</a>


        {/* Link para a página de gerenciamento
            dos serviços oferecidos pelo PetCare. */}
        <a href="/admin/servicos">Serviços</a>


        {/* Link para sair da área administrativa
            e voltar para a página inicial. */}
        <a href="/">Sair</a>

      </div>

    </nav>
  )
}


// Exporta o componente para que ele possa
// ser utilizado em outras páginas do frontend.
export default AdmNavBar