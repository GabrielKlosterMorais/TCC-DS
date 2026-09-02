import './styles.css';
import Navbar from '../../../components/navBar';

function SobreNos() {
  return (
    <div className="about-page">

      <Navbar />


      <main>

        <section className="about-hero">

          <div className="about-hero-content">

            <span className="section-label">
              SOBRE O PETCARE
            </span>

            <h2>
              Cuidando de quem
              <span>faz parte da família.</span>
            </h2>

            <p>
              O PetCare nasceu para tornar a rotina de cuidados com os
              animais mais simples, organizada e acessível.
            </p>

          </div>

        </section>


        <section className="about-introduction">

          <div className="about-introduction-image">

            <img
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1000&q=85"
              alt="Cachorro feliz"
            />

          </div>


          <div className="about-introduction-content">

            <span className="section-label">
              NOSSA HISTÓRIA
            </span>

            <h2>
              Mais do que um sistema,
              <span>uma forma de cuidar.</span>
            </h2>

            <p>
              O PetCare foi criado pensando em uma necessidade simples:
              facilitar o cuidado com os animais de estimação.
            </p>

            <p>
              Sabemos que manter os cuidados, consultas e serviços
              organizados pode ser difícil. Por isso, desenvolvemos
              uma plataforma que reúne tudo em um único lugar.
            </p>

            <p>
              Com o PetCare, os usuários podem cadastrar seus pets,
              consultar serviços e realizar agendamentos de maneira
              simples e prática.
            </p>

          </div>

        </section>


        <section className="mission-section">

          <div className="mission-content">

            <span className="section-label">
              NOSSA MISSÃO
            </span>

            <h2>
              Tornar o cuidado com seu pet
              <span>mais simples.</span>
            </h2>

            <p>
              Nossa missão é proporcionar uma experiência prática para
              que os tutores possam acompanhar melhor a rotina e os
              cuidados dos seus animais.
            </p>

            <p>
              Queremos ajudar a transformar tarefas que poderiam ser
              complicadas em uma experiência simples, organizada e
              eficiente.
            </p>

          </div>


          <div className="mission-image">

            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Dois cachorros juntos"
            />

          </div>

        </section>


        <section className="values-section">

          <div className="values-header">

            <span className="section-label">
              NOSSOS VALORES
            </span>

            <h2>
              O que guia o PetCare
            </h2>

            <p>
              Criamos nossa plataforma pensando em alguns princípios
              que consideramos essenciais.
            </p>

          </div>


          <div className="values-grid">

            <div className="value-card">

              <div className="value-number">
                01
              </div>

              <h3>
                Cuidado
              </h3>

              <p>
                Colocamos o bem-estar dos animais como uma das
                principais prioridades da nossa plataforma.
              </p>

            </div>


            <div className="value-card">

              <div className="value-number">
                02
              </div>

              <h3>
                Praticidade
              </h3>

              <p>
                Buscamos tornar o acesso aos serviços e agendamentos
                simples e rápido para os usuários.
              </p>

            </div>


            <div className="value-card">

              <div className="value-number">
                03
              </div>

              <h3>
                Organização
              </h3>

              <p>
                Reunimos informações importantes dos pets em um único
                lugar para facilitar sua rotina.
              </p>

            </div>


            <div className="value-card">

              <div className="value-number">
                04
              </div>

              <h3>
                Confiança
              </h3>

              <p>
                Buscamos oferecer uma experiência segura, clara e
                confiável para nossos usuários.
              </p>

            </div>

          </div>

        </section>


        <section className="numbers-section">

          <div className="numbers-image">

            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85"
              alt="Cachorro olhando para a câmera"
            />

          </div>


          <div className="numbers-content">

            <span className="section-label">
              PETCARE EM NÚMEROS
            </span>

            <h2>
              Feito para facilitar
              <span>a rotina.</span>
            </h2>

            <div className="numbers-grid">

              <div className="number-item">
                <strong>+500</strong>
                <span>Pets cuidados</span>
              </div>

              <div className="number-item">
                <strong>+20</strong>
                <span>Serviços disponíveis</span>
              </div>

              <div className="number-item">
                <strong>4.9/5</strong>
                <span>Avaliação dos usuários</span>
              </div>

              <div className="number-item">
                <strong>24h</strong>
                <span>Organização dos cuidados</span>
              </div>

            </div>

          </div>

        </section>


        <section className="about-cta">

          <div>

            <span>
              FAÇA PARTE DO PETCARE
            </span>

            <h2>
              Cuide melhor de quem
              faz parte da sua família.
            </h2>

            <p>
              Crie sua conta e comece a organizar os cuidados
              do seu pet.
            </p>

          </div>

          <a
            href="/registro"
            className="cta-button"
          >
            Criar minha conta
            <span>→</span>
          </a>

        </section>

      </main>


      <footer>

        <div className="footer-content">

          <div className="footer-brand">

            <a
              href="/"
              className="logo footer-logo"
            >
              <div className="logo-icon">P</div>
              <h1>PetCare</h1>
            </a>

            <p>
              Cuidando de quem faz parte da família.
            </p>

          </div>


          <div className="footer-column">

            <strong>Navegação</strong>

            <a href="/">
              Início
            </a>

            <a href="/servicos">
              Serviços
            </a>

            <a href="/sobre">
              Sobre nós
            </a>

          </div>


          <div className="footer-column">

            <strong>Conta</strong>

            <a href="/login">
              Entrar
            </a>

            <a href="/registro">
              Criar conta
            </a>

          </div>


          <div className="footer-column">

            <strong>PetCare</strong>

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


        <div className="footer-bottom">

          <span>
            © 2026 PetCare. Todos os direitos reservados.
          </span>

          <span>
            Feito para cuidar melhor.
          </span>

        </div>

      </footer>

    </div>
  );
}

export default SobreNos;