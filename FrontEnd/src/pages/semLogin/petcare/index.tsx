// Importa o arquivo CSS responsável pela estilização da página
import './styles.css';

// Importa o componente de navegação principal do sistema
import Navbar from '../../../components/navBar';

// Cria um array contendo os três pilares apresentados na página
const pillars = [
  {
    // Identificador utilizado para criar a âncora da seção
    id: 'cuidado',

    // Número exibido visualmente no pilar
    number: '01',

    // Nome do pilar
    title: 'Cuidado',

    // Subtítulo apresentado na seção
    subtitle: 'Uma rotina mais organizada',

    // Texto explicativo sobre o pilar
    description:
      'Cuidar de um pet envolve pequenas tarefas todos os dias. O PetCare ajuda você a organizar esses cuidados e manter a rotina do seu animal sempre em dia.',

    // Imagem utilizada no pilar
    image:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85',

    // Lista de atividades relacionadas ao pilar
    items: [
      'Banho e higiene',
      'Cuidados com a pelagem',
      'Rotina de cuidados',
      'Acompanhamento dos serviços',
    ],
  },

  {
    // Identificador da seção
    id: 'saude',

    // Número do segundo pilar
    number: '02',

    // Nome do pilar
    title: 'Saúde',

    // Subtítulo do pilar
    subtitle: 'Prevenção e acompanhamento',

    // Texto explicativo sobre saúde
    description:
      'A saúde do seu pet merece atenção. Ter informações organizadas facilita o acompanhamento e ajuda você a lembrar dos cuidados importantes.',

    // Imagem utilizada na seção
    image:
      'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=85',

    // Lista de atividades relacionadas à saúde
    items: [
      'Acompanhamento veterinário',
      'Consultas',
      'Cuidados preventivos',
      'Histórico de serviços',
    ],
  },

  {
    // Identificador da seção
    id: 'bem-estar',

    // Número do terceiro pilar
    number: '03',

    // Nome do pilar
    title: 'Bem-estar',

    // Subtítulo do pilar
    subtitle: 'Qualidade de vida para seu pet',

    // Texto explicativo sobre bem-estar
    description:
      'Bem-estar também faz parte da saúde. Uma rotina equilibrada, cuidados adequados e atenção ajudam seu pet a ter uma vida mais confortável e feliz.',

    // Imagem utilizada na seção
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85',

    // Lista de cuidados relacionados ao bem-estar
    items: [
      'Conforto e higiene',
      'Rotina saudável',
      'Cuidados personalizados',
      'Qualidade de vida',
    ],
  },
];

// Componente principal da página PetCare
function PetCare() {
  return (
    // Container principal de toda a página
    <div className="petcare-page">

      {/* Exibe a barra de navegação principal */}
      <Navbar />

      {/* Conteúdo principal da página */}
      <main>

        {/* Seção inicial da página */}
        <section className="petcare-hero">

          {/* Área de textos e botões do banner */}
          <div className="petcare-hero-content">

            {/* Identificação da seção */}
            <span className="section-label">
              PETCARE
            </span>

            {/* Título principal */}
            <h2>
              Tudo para cuidar
              <span>do seu melhor amigo.</span>
            </h2>

            {/* Texto de apresentação */}
            <p>
              Cuidado, saúde e bem-estar em um só lugar. O PetCare foi
              pensado para ajudar você a acompanhar a rotina do seu pet
              de maneira simples e organizada.
            </p>

            {/* Área dos botões do banner */}
            <div className="hero-buttons">

              {/* Link para criação de uma conta */}
              <a
                href="/registro"
                className="primary-button"
              >
                Começar agora <span>→</span>
              </a>

              {/* Link para a página de serviços */}
              <a
                href="/servicos"
                className="secondary-button"
              >
                Conhecer serviços
              </a>

            </div>

          </div>

          {/* Área da imagem principal */}
          <div className="petcare-hero-image">

            {/* Imagem de destaque */}
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85"
              alt="Cachorro"
            />

          </div>

        </section>

        {/* Introdução aos pilares do PetCare */}
        <section className="pillars-intro">

          {/* Título pequeno da seção */}
          <span className="section-label">
            OS PILARES DO PETCARE
          </span>

          {/* Título principal */}
          <h2>
            Cuidar é estar presente.
          </h2>

          {/* Descrição dos pilares */}
          <p>
            Reunimos três pilares importantes para ajudar você a
            proporcionar uma rotina melhor para o seu pet.
          </p>

        </section>

        {/* Seção que apresenta os pilares */}
        <section className="pillars">

          {/* Percorre o array de pilares e cria uma seção para cada item */}
          {pillars.map((pillar, index) => (

            // Article representa cada pilar individualmente
            <article
              // Alterna a ordem dos elementos em pilares pares
              className={`pillar ${index % 2 !== 0 ? 'reverse' : ''}`}

              // Define o identificador da seção
              id={pillar.id}

              // Define uma chave única para o React
              key={pillar.id}
            >

              {/* Área da imagem do pilar */}
              <div className="pillar-image">

                {/* Exibe a imagem correspondente ao pilar */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                />

                {/* Exibe o número do pilar */}
                <span className="pillar-number">
                  {pillar.number}
                </span>

              </div>

              {/* Área de conteúdo do pilar */}
              <div className="pillar-content">

                {/* Exibe o nome do pilar em letras maiúsculas */}
                <span className="pillar-tag">
                  {pillar.title.toUpperCase()}
                </span>

                {/* Exibe o subtítulo */}
                <h2>
                  {pillar.subtitle}
                </h2>

                {/* Exibe a descrição */}
                <p>
                  {pillar.description}
                </p>

                {/* Lista de itens relacionados ao pilar */}
                <ul>

                  {/* Percorre os itens do pilar */}
                  {pillar.items.map((item) => (

                    // Cada item da lista recebe uma chave única
                    <li key={item}>

                      {/* Símbolo visual de confirmação */}
                      <span className="check">
                        ✓
                      </span>

                      {/* Texto do item */}
                      {item}
                    </li>

                  ))}

                </ul>

                {/* Botão para acessar os serviços */}
                <a
                  href="/servicos"
                  className="pillar-button"
                >
                  Conhecer serviços <span>→</span>
                </a>

              </div>

            </article>

          ))}

        </section>

        {/* Seção com links para outras áreas do sistema */}
        <section className="petcare-navigation">

          {/* Cabeçalho da seção de navegação */}
          <div className="navigation-header">

            {/* Identificação da seção */}
            <span className="section-label">
              CONHEÇA MAIS
            </span>

            {/* Título da seção */}
            <h2>
              O PetCare foi feito para você.
            </h2>

            {/* Descrição */}
            <p>
              Acesse outras áreas da plataforma e encontre tudo o que
              precisa para cuidar do seu pet.
            </p>

          </div>

          {/* Cards de navegação */}
          <div className="navigation-cards">

            {/* Card que leva para os serviços */}
            <a
              href="/servicos"
              className="navigation-card"
            >

              {/* Número do card */}
              <span className="navigation-number">
                01
              </span>

              {/* Título do card */}
              <h3>
                Serviços
              </h3>

              {/* Descrição do card */}
              <p>
                Encontre os serviços disponíveis para seu pet.
              </p>

              {/* Seta de navegação */}
              <span className="navigation-arrow">
                →
              </span>

            </a>

            {/* Card que leva para a página Sobre nós */}
            <a
              href="/sobre"
              className="navigation-card"
            >

              {/* Número do card */}
              <span className="navigation-number">
                02
              </span>

              {/* Título do card */}
              <h3>
                Sobre nós
              </h3>

              {/* Descrição do card */}
              <p>
                Conheça a história e a missão do PetCare.
              </p>

              {/* Seta de navegação */}
              <span className="navigation-arrow">
                →
              </span>

            </a>

            {/* Card que leva para o cadastro */}
            <a
              href="/registro"
              className="navigation-card"
            >

              {/* Número do card */}
              <span className="navigation-number">
                03
              </span>

              {/* Título do card */}
              <h3>
                Criar conta
              </h3>

              {/* Descrição do card */}
              <p>
                Comece a organizar os cuidados do seu pet.
              </p>

              {/* Seta de navegação */}
              <span className="navigation-arrow">
                →
              </span>

            </a>

          </div>

        </section>

        {/* Seção final de chamada para ação */}
        <section className="petcare-cta">

          {/* Conteúdo textual da chamada para ação */}
          <div className="petcare-cta-content">

            {/* Pequeno título da seção */}
            <span className="cta-label">
              SEU PET MERECE
            </span>

            {/* Título principal */}
            <h2>
              O melhor cuidado começa aqui.
            </h2>

            {/* Texto explicativo */}
            <p>
              Crie sua conta e tenha uma maneira simples de organizar
              os cuidados e serviços do seu melhor amigo.
            </p>

            {/* Botão para criação da conta */}
            <a
              href="/registro"
              className="cta-button"
            >
              Criar minha conta <span>→</span>
            </a>

          </div>

          {/* Imagem da chamada para ação */}
          <div className="petcare-cta-image">

            {/* Imagem utilizada no CTA */}
            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=85"
              alt="Cachorro"
            />

          </div>

        </section>

      </main>

      {/* Rodapé da página */}
      <footer>

        {/* Conteúdo principal do rodapé */}
        <div className="footer-content">

          {/* Informações da marca */}
          <div className="footer-brand">

            {/* Logo do PetCare */}
            <a
              href="/"
              className="logo footer-logo"
            >

              {/* Ícone da marca */}
              <div className="logo-icon">
                P
              </div>

              {/* Nome da marca */}
              <h1>
                PetCare
              </h1>

            </a>

            {/* Frase da empresa */}
            <p>
              Cuidando de quem faz parte da família.
            </p>

          </div>

          {/* Coluna de links de navegação */}
          <div className="footer-column">

            {/* Título da coluna */}
            <strong>
              Navegação
            </strong>

            {/* Link para a página inicial */}
            <a href="/">
              Início
            </a>

            {/* Link para os serviços */}
            <a href="/servicos">
              Serviços
            </a>

            {/* Link para a página Sobre nós */}
            <a href="/sobre">
              Sobre nós
            </a>

          </div>

          {/* Coluna relacionada à conta */}
          <div className="footer-column">

            {/* Título da coluna */}
            <strong>
              Conta
            </strong>

            {/* Link para login */}
            <a href="/login">
              Entrar
            </a>

            {/* Link para cadastro */}
            <a href="/registro">
              Criar conta
            </a>

          </div>

          {/* Coluna com os pilares */}
          <div className="footer-column">

            {/* Título da coluna */}
            <strong>
              PetCare
            </strong>

            {/* Link para a seção Cuidado */}
            <a href="/petcare#cuidado">
              Cuidado
            </a>

            {/* Link para a seção Saúde */}
            <a href="/petcare#saude">
              Saúde
            </a>

            {/* Link para a seção Bem-estar */}
            <a href="/petcare#bem-estar">
              Bem-estar
            </a>

          </div>

        </div>

        {/* Parte inferior do rodapé */}
        <div className="footer-bottom">

          {/* Informação de direitos autorais */}
          <span>
            © 2026 PetCare. Todos os direitos reservados.
          </span>

          {/* Frase final */}
          <span>
            Feito para cuidar melhor.
          </span>

        </div>

      </footer>

    </div>
  );
}

// Exporta o componente para que ele possa ser utilizado em outras partes da aplicação
export default PetCare;