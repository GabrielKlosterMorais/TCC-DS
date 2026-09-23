// Importa a página de registro de novos usuários.
import Registro from './pages/semLogin/registro'

// Importa a página de login.
import Login from './pages/semLogin/login'

// Importa a página inicial do sistema.
import Home from './pages/semLogin/home'

// Importa a página de serviços para usuários que ainda não estão logados.
import Servico from './pages/semLogin/servicos'

// Importa a página "Sobre Nós".
import SobreNos from './pages/semLogin/sobre'

// Importa a página inicial do cliente depois que ele faz login.
import LogHome from './pages/cliente/logHome'

// Importa a página PetCare.
import PetCare from './pages/semlogin/petcare'

// Importa a página de gerenciamento dos pets do cliente.
import Pets from './pages/cliente/pets'

// Importa a página de agendamento de serviços.
import Agendamento from './pages/cliente/agendamento'

// Importa o dashboard principal do administrador.
import DashboardAdmin from './pages/adm/dashboardADM'

// Importa a página de gerenciamento dos agendamentos pelo administrador.
import AgendamentosAdmin from './pages/adm/agendamentoADM'

// Importa a página de pagamentos do cliente.
import Pagamento from './pages/cliente/pagamento'

// Importa a página de gerenciamento de pagamentos pelo administrador.
import PagamentoADM from './pages/adm/pagamentoADM'

// Importa a página de gerenciamento dos clientes pelo administrador.
import ClientesADM from './pages/adm/clienteADM'

// Importa a página de gerenciamento dos serviços pelo administrador.
import ServicoADM from './pages/adm/servicoADM'

// Importa a página de conta/perfil do cliente.
import Conta from './pages/cliente/conta'

// Importa a página de serviços visualizada pelo cliente logado.
import LogServico from './pages/cliente/logservicos'

// Importa os componentes necessários para criar as rotas da aplicação.
// BrowserRouter controla a navegação.
// Route representa uma rota individual.
// Routes agrupa todas as rotas.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Importa o arquivo de estilos gerais da aplicação.
import './App.css'

// Função principal do componente App.
// É o componente que organiza as páginas e rotas do sistema.
function App() {
  // Retorna a estrutura visual da aplicação.
  return (
    // Router permite que o React controle a navegação entre as páginas
    // sem precisar recarregar a página inteira.
    <Router>

      {/* // Routes contém todas as rotas disponíveis no sistema. */}
      <Routes>

        {/* // Quando o usuário acessar "/", será exibida a página Home. */}
        <Route path="/" element={<Home />} />

        {/* // Quando acessar "/login", será exibida a página de Login. */}
        <Route path="/login" element={<Login />} />

        {/* // Quando acessar "/registro", será exibida a página de Registro. */}
        <Route path="/registro" element={<Registro />} />

        {/* // Quando acessar "/servicos", será exibida a página pública de serviços. */}
        <Route path='/servicos' element={<Servico />} />

        {/* // Quando acessar "/sobre", será exibida a página Sobre Nós. */}
        <Route path='/sobre' element={<SobreNos />} />

        {/* // Quando acessar "/loghome", será exibida a página inicial do cliente logado. */}
        <Route path='/loghome' element={<LogHome />} />

        {/* // Quando acessar "/petcare", será exibida a página PetCare. */}
        <Route path='/petcare' element={<PetCare />} />

        {/* // Quando acessar "/pets", será exibida a página onde o cliente gerencia seus pets. */}
        <Route path='/pets' element={<Pets />} />

        {/* // Quando acessar "/agendamentos", será exibida a página de agendamentos. */}
        <Route path='/agendamentos' element={<Agendamento />} />

        {/* // Quando acessar "/admin", será exibido o dashboard do administrador. */}
        <Route path='/admin' element={<DashboardAdmin />} />

        {/* // Quando acessar "/admin/agendamentos", será exibida
        // a página de gerenciamento de agendamentos do administrador. */}
        <Route path='/admin/agendamentos' element={<AgendamentosAdmin />} />

        {/* // Quando acessar "/pagamento", será exibida a página
        // de pagamentos do cliente. */}
        <Route path='/pagamento' element={<Pagamento />} />

        {/* // Quando acessar "/admin/pagamentos", será exibida
        // a página de gerenciamento de pagamentos do administrador. */}
        <Route path='/admin/pagamentos' element={<PagamentoADM />} />

        {/* // Quando acessar "/admin/clientes", será exibida
        // a página de gerenciamento dos clientes. */}
        <Route path='/admin/clientes' element={<ClientesADM />} />

        {/* // Quando acessar "/admin/servicos", será exibida
        // a página de gerenciamento dos serviços. */}
        <Route path='/admin/servicos' element={<ServicoADM />} />

        {/* // Quando acessar "/cliente/conta", será exibida
        // a página de conta do cliente. */}
        <Route path='/cliente/conta' element={<Conta />} />

        {/* // Quando acessar "/cliente/servicos", será exibida
        // a página de serviços para o cliente logado. */}
        <Route path='/cliente/servicos' element={<LogServico />} />

      {/* // Fecha o componente Routes. */}
      </Routes>

    {/* // Fecha o Router. */}
    </Router>
  )
}

// Exporta o componente App como padrão.
// Isso permite que ele seja importado em outros arquivos da aplicação,
// normalmente no main.tsx.
export default App