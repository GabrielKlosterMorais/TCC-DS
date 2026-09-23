// Importa o StrictMode do React.
// Ele ajuda a identificar possíveis problemas durante o desenvolvimento.
// Não altera o funcionamento normal da aplicação em produção.
import { StrictMode } from 'react'

// Importa a função createRoot, usada para criar a raiz da aplicação React.
import { createRoot } from 'react-dom/client'

// Importa o arquivo de estilos CSS global da aplicação.
import './index.css'

// Importa o componente principal App.
// É dentro do App que estão as rotas e as páginas do sistema.
import App from './App.jsx'


// Procura no HTML o elemento que possui o id="root".
// Esse elemento normalmente fica no arquivo index.html.
createRoot(document.getElementById('root')).render(

  // StrictMode envolve toda a aplicação React.
  // Durante o desenvolvimento, ele ajuda a detectar problemas
  // e comportamentos que podem causar erros.
  <StrictMode>

    {/* // Renderiza o componente principal App.
    // A partir dele, toda a aplicação será carregada,
    // incluindo as páginas e as rotas definidas no App. */}
    <App />

  {/* // Fecha o StrictMode. */}
  </StrictMode>,

// Fecha o método render.
)