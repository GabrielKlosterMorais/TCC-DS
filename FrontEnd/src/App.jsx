import React from 'react'
import Registro from './pages/registro'
import Login from './pages/login'
import Home from './pages/home'
import Servico from './pages/servicos'
import SobreNos from './pages/sobre'
import LogHome from './pages/logHome'
import PetCare from './pages/petcare'
import Pets from './pages/pets'
import Agendamento from './pages/agendamento'
import DashboardAdmin from './pages/dashboardAdmin'
import AgendamentosAdmin from './pages/agendamentoADM'
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
      </Routes>
    </Router>
  )
}

export default App
