// Importa o arquivo CSS responsável pela aparência da página
import "./styles.css";

// Importa o componente Navbar para mostrar o menu de navegação
import Navbar from "../../../components/navBar";


// Componente principal da página "Sobre Nós"
function SobreNos() {
  return (
    // Container principal da página
    <div className="about-page">

      {/* Barra de navegação do PetCare */}
      <Navbar />

      {/* Conteúdo principal da página */}
      <main>


        {/* =========================
            HERO
            ========================= */}

        {/* Primeira seção da página */}
        <section className="about-hero">

          {/* Container que organiza o conteúdo do Hero */}
          <div className="about-hero-content">

            {/* Pequeno título da seção */}
            <span className="section-label">
              SOBRE O PETCARE
            </span>

            {/* Título principal */}
            <h2>
              Cuidando de quem

              {/* Essa parte do título fica destacada pelo CSS */}
              <span>faz parte da família.</span>
            </h2>

            {/* Texto explicativo */}
            <p>
              O PetCare nasceu para tornar a rotina de cuidados com os animais
              mais simples, organizada e acessível.
            </p>

          </div>
        </section>


        {/* =========================
            INTRODUÇÃO / NOSSA HISTÓRIA
            ========================= */}

        {/* Seção que apresenta a história do PetCare */}
        <section className="about-introduction">

          {/* Área da imagem */}
          <div className="about-introduction-image">

            {/* Imagem ilustrativa de um cachorro */}
            <img
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1000&q=85"

              // Texto alternativo da imagem
              // Importante para acessibilidade
              alt="Cachorro feliz"
            />

          </div>


          {/* Área com os textos da história */}
          <div className="about-introduction-content">

            {/* Identificação da seção */}
            <span className="section-label">
              NOSSA HISTÓRIA
            </span>

            {/* Título da seção */}
            <h2>
              Mais do que um sistema,

              {/* Parte destacada do título */}
              <span>uma forma de cuidar.</span>
            </h2>

            {/* Primeiro parágrafo */}
            <p>
              O PetCare foi criado pensando em uma necessidade simples:
              facilitar o cuidado com os animais de estimação.
            </p>

            {/* Segundo parágrafo */}
            <p>
              Sabemos que manter os cuidados, consultas e serviços organizados
              pode ser difícil. Por isso, desenvolvemos uma plataforma que reúne
              tudo em um único lugar.
            </p>

            {/* Terceiro parágrafo */}
            <p>
              Com o PetCare, os usuários podem cadastrar seus pets, consultar
              serviços e realizar agendamentos de maneira simples e prática.
            </p>

          </div>
        </section>


        {/* =========================
            NOSSA MISSÃO
            ========================= */}

        {/* Seção que apresenta a missão do PetCare */}
        <section className="mission-section">

          {/* Conteúdo textual da missão */}
          <div className="mission-content">

            {/* Identificação da seção */}
            <span className="section-label">
              NOSSA MISSÃO
            </span>

            {/* Título */}
            <h2>
              Tornar o cuidado com seu pet

              {/* Parte azul/destacada */}
              <span>mais simples.</span>
            </h2>

            {/* Primeiro texto da missão */}
            <p>
              Nossa missão é proporcionar uma experiência prática para que os
              tutores possam acompanhar melhor a rotina e os cuidados dos seus
              animais.
            </p>

            {/* Segundo texto da missão */}
            <p>
              Queremos ajudar a transformar tarefas que poderiam ser complicadas
              em uma experiência simples, organizada e eficiente.
            </p>

          </div>


          {/* Imagem da seção */}
          <div className="mission-image">

            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Dois cachorros juntos"
            />

          </div>
        </section>


        {/* =========================
            NOSSOS VALORES
            ========================= */}

        {/* Seção que apresenta os valores do PetCare */}
        <section className="values-section">

          {/* Cabeçalho da seção */}
          <div className="values-header">

            {/* Nome da seção */}
            <span className="section-label">
              NOSSOS VALORES
            </span>

            {/* Título */}
            <h2>
              O que guia o PetCare
            </h2>

            {/* Descrição */}
            <p>
              Criamos nossa plataforma pensando em alguns princípios que
              consideramos essenciais.
            </p>

          </div>


          {/* Grid que contém os cards dos valores */}
          <div className="values-grid">


            {/* =========================
                VALOR 01
                ========================= */}

            <div className="value-card">

              {/* Número do valor */}
              <div className="value-number">
                01
              </div>

              {/* Nome do valor */}
              <h3>
                Cuidado
              </h3>

              {/* Descrição */}
              <p>
                Colocamos o bem-estar dos animais como uma das principais
                prioridades da nossa plataforma.
              </p>

            </div>


            {/* =========================
                VALOR 02
                ========================= */}

            <div className="value-card">

              {/* Número do valor */}
              <div className="value-number">
                02
              </div>

              {/* Nome do valor */}
              <h3>
                Praticidade
              </h3>

              {/* Descrição */}
              <p>
                Buscamos tornar o acesso aos serviços e agendamentos simples e
                rápido para os usuários.
              </p>

            </div>


            {/* =========================
                VALOR 03
                ========================= */}

            <div className="value-card">

              {/* Número do valor */}
              <div className="value-number">
                03
              </div>

              {/* Nome do valor */}
              <h3>
                Organização
              </h3>

              {/* Descrição */}
              <p>
                Reunimos informações importantes dos pets em um único lugar para
                facilitar sua rotina.
              </p>

            </div>


            {/* =========================
                VALOR 04
                ========================= */}

            <div className="value-card">

              {/* Número do valor */}
              <div className="value-number">
                04
              </div>

              {/* Nome do valor */}
              <h3>
                Confiança
              </h3>

              {/* Descrição */}
              <p>
                Buscamos oferecer uma experiência segura, clara e confiável para
                nossos usuários.
              </p>

            </div>

          </div>
        </section>


        {/* =========================
            PETCARE EM NÚMEROS
            ========================= */}

        {/* Seção que apresenta alguns números do projeto */}
        <section className="numbers-section">

          {/* Imagem da seção */}
          <div className="numbers-image">

            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85"
              alt="Cachorro olhando para a câmera"
            />

          </div>


          {/* Conteúdo com os números */}
          <div className="numbers-content">

            {/* Identificação da seção */}
            <span className="section-label">
              PETCARE EM NÚMEROS
            </span>

            {/* Título */}
            <h2>
              Feito para facilitar

              {/* Parte destacada */}
              <span>a rotina.</span>
            </h2>


            {/* Grid dos números */}
            <div className="numbers-grid">


              {/* Primeiro número */}
              <div className="number-item">

                {/* Número principal */}
                <strong>
                  +500
                </strong>

                {/* Descrição do número */}
                <span>
                  Pets cuidados
                </span>

              </div>


              {/* Segundo número */}
              <div className="number-item">

                <strong>
                  +20
                </strong>

                <span>
                  Serviços disponíveis
                </span>

              </div>


              {/* Terceiro número */}
              <div className="number-item">

                <strong>
                  4.9/5
                </strong>

                <span>
                  Avaliação dos usuários
                </span>

              </div>


              {/* Quarto número */}
              <div className="number-item">

                <strong>
                  24h
                </strong>

                <span>
                  Organização dos cuidados
                </span>

              </div>

            </div>
          </div>
        </section>


        {/* =========================
            CTA
            ========================= */}

        {/* CTA = Call To Action
            É a área que incentiva o usuário
            a realizar alguma ação. */}
        <section className="about-cta">

          {/* Textos do CTA */}
          <div>

            {/* Pequena identificação */}
            <span>
              FAÇA PARTE DO PETCARE
            </span>

            {/* Título */}
            <h2>
              Cuide melhor de quem faz parte da sua família.
            </h2>

            {/* Descrição */}
            <p>
              Crie sua conta e comece a organizar os cuidados do seu pet.
            </p>

          </div>


          {/* Link que leva para a página de cadastro */}
          <a
            href="/registro"
            className="cta-button"
          >

            {/* Texto do botão */}
            <span className="cta-text">
              Criar minha conta
            </span>

            {/* Seta do botão */}
            <span className="cta-arrow">
              →
            </span>

          </a>

        </section>

      </main>


      {/* =========================
          FOOTER
          ========================= */}

      {/* Rodapé da página */}
      <footer>

        {/* Conteúdo principal do rodapé */}
        <div className="footer-content">


          {/* =========================
              MARCA
              ========================= */}

          <div className="footer-brand">

            {/* Link da logo que volta para a página inicial */}
            <a
              href="/"
              className="logo footer-logo"
            >

              {/* Ícone da logo */}
              <div className="logo-icon">
                P
              </div>

              {/* Nome do sistema */}
              <h1>
                PetCare
              </h1>

            </a>

            {/* Frase da empresa */}
            <p>
              Cuidando de quem faz parte da família.
            </p>

          </div>


          {/* =========================
              NAVEGAÇÃO
              ========================= */}

          <div className="footer-column">

            {/* Título da coluna */}
            <strong>
              Navegação
            </strong>

            {/* Link para início */}
            <a href="/">
              Início
            </a>

            {/* Link para serviços */}
            <a href="/servicos">
              Serviços
            </a>

            {/* Link para sobre nós */}
            <a href="/sobre">
              Sobre nós
            </a>

          </div>


          {/* =========================
              CONTA
              ========================= */}

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


          {/* =========================
              PETCARE
              ========================= */}

          <div className="footer-column">

            {/* Título da coluna */}
            <strong>
              PetCare
            </strong>

            {/* Informações */}
            <span>
              Cuidado
            </span>

            <span>
              Saúde
            </span>

            <span>
              Bem-estar
            </span>

          </div>

        </div>


        {/* =========================
            PARTE INFERIOR DO FOOTER
            ========================= */}

        <div className="footer-bottom">

          {/* Direitos autorais */}
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


// Exporta o componente para que ele possa ser utilizado
// em outras partes da aplicação
export default SobreNos;