import React from 'react'
import Registro from './pages/semLogin/registro'
import Login from './pages/semLogin/login'
import Home from './pages/semLogin/home'
import Servico from './pages/semLogin/servicos'
import SobreNos from './pages/semLogin/sobre'
import LogHome from './pages/cliente/logHome'
import PetCare from './pages/semlogin/petcare'
import Pets from './pages/cliente/pets'
import Agendamento from './pages/cliente/agendamento'
import DashboardAdmin from './pages/adm/dashboardADM'
import AgendamentosAdmin from './pages/adm/agendamentoADM'
import Pagamento from './pages/cliente/pagamento'
import PagamentoADM from './pages/adm/pagamentoADM'
import ClientesADM from './pages/adm/clienteADM'
import ServicoADM from './pages/adm/servicoADM'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='/servicos' element={<Servico />} />
        <Route path='/sobre' element={<SobreNos />} />
        <Route path='/loghome' element={<LogHome />} />
        <Route path='/petcare' element={<PetCare />} />
        <Route path='/pets' element={<Pets />} />
        <Route path='/agendamentos' element={<Agendamento />} />
        <Route path='/admin' element={<DashboardAdmin />} />
        <Route path='/admin/agendamentos' element={<AgendamentosAdmin />} />
        <Route path='/pagamento' element={<Pagamento />} />
        <Route path='/admin/pagamentos' element={<PagamentoADM />} />
        <Route path='/admin/clientes' element={<ClientesADM />} />
        <Route path='/admin/servicos' element={<ServicoADM />} />
      </Routes>
    </Router>
  )
}

export default App
