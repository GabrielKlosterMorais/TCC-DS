import './styles.css';
import LogNavbar from '../../components/logNavBar';

const services = [
  {
    title: "Banho",
    category: "HIGIENE",
    description: "Cuidados para manter seu pet limpo, confortável e saudável.",
    image:
      "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Tosa",
    category: "ESTÉTICA",
    description: "Cuidados especiais para manter seu pet confortável e bem cuidado.",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Veterinário",
    category: "SAÚDE",
    description: "Acompanhamento para cuidar da saúde e do bem-estar do seu pet.",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Pet Care",
    category: "BEM-ESTAR",
    description: "Cuidados especiais para garantir qualidade de vida ao seu pet.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80",
  },
];

function LogHome() {
  return (
    <div className="home">

      <LogNavbar />

      <main>

        <section className="hero">

          <div className="hero-content">

            <span className="hero-label">
              BEM-VINDO DE VOLTA AO PETCARE
            </span>

            <h2>
              Cuide do seu pet
              <span>de forma simples.</span>
            </h2>

            <p>
              Organize os cuidados, acompanhe seus pets e encontre os melhores
              serviços para manter seu melhor amigo saudável e feliz.
            </p>

            <div className="hero-buttons">

              <a
                href="/servicos"
                className="primary-button"
              >
                Agendar serviço <span>→</span>
              </a>

              <a
                href="/pets"
                className="secondary-button"
              >
                Meus pets
              </a>

            </div>

            <div className="hero-info">

              <div className="info-item">
                <strong>0</strong>
                <span>Pets cadastrados</span>
              </div>

              <div className="info-divider"></div>

              <div className="info-item">
                <strong>0</strong>
                <span>Agendamentos</span>
              </div>

              <div className="info-divider"></div>

              <div className="info-item">
                <strong>+20</strong>
                <span>Serviços</span>
              </div>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-image-wrapper">

              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85"
                alt="Cachorro do PetCare"
              />

            </div>

            <div className="floating-card card-top">

              <div className="floating-icon">
                ✓
              </div>

              <div>
                <strong>Seu pet</strong>
                <span>Cuidados em dia</span>
              </div>

            </div>

            <div className="floating-card card-bottom">

              <div className="floating-icon green">
                ✓
              </div>

              <div>
                <strong>Agendamento</strong>
                <span>Fácil e rápido</span>
              </div>

            </div>

          </div>

        </section>


        <section className="quick-actions">

          <div className="section-header">

            <span className="section-label">
              ACESSO RÁPIDO
            </span>

            <h2>
              O que você deseja fazer?
            </h2>

            <p>
              Acesse rapidamente as principais funções da sua conta.
            </p>

          </div>

          <div className="quick-grid">

            <a href="/pets" className="quick-card">

              <div className="quick-icon">
                P
              </div>

              <div>
                <h3>Meus Pets</h3>
                <p>
                  Cadastre e acompanhe seus animais.
                </p>
              </div>

              <span className="quick-arrow">
                →
              </span>

            </a>


            <a href="/servicos" className="quick-card">

              <div className="quick-icon">
                S
              </div>

              <div>
                <h3>Agendar serviço</h3>
                <p>
                  Escolha um serviço e horário disponível.
                </p>
              </div>

              <span className="quick-arrow">
                →
              </span>

            </a>


            <a href="/agendamentos" className="quick-card">

              <div className="quick-icon">
                A
              </div>

              <div>
                <h3>Agendamentos</h3>
                <p>
                  Veja seus próximos cuidados.
                </p>
              </div>

              <span className="quick-arrow">
                →
              </span>

            </a>

          </div>

        </section>


        <section className="services-preview">

          <div className="section-header">

            <span className="section-label">
              NOSSOS SERVIÇOS
            </span>

            <h2>
              Tudo para cuidar do seu pet
            </h2>

            <p>
              Encontre serviços para manter seu melhor amigo saudável,
              confortável e feliz.
            </p>

          </div>

          <div className="services-grid">

            {services.map((service) => (

              <div
                className="service-card"
                key={service.title}
              >

                <img
                  src={service.image}
                  alt={service.title}
                />

                <div className="service-content">

                  <span className="service-tag">
                    {service.category}
                  </span>

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <a href="/servicos">
                    Ver serviço →
                  </a>

                </div>

              </div>

            ))}

          </div>

          <div className="services-footer">

            <p>
              Encontre o serviço ideal para o seu pet.
            </p>

            <a href="/servicos">
              Ver todos os serviços →
            </a>

          </div>

        </section>


        <section className="about-preview">

          <div className="about-preview-image">

            <img
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85"
              alt="Cachorro feliz"
            />

            <div className="image-badge">
              <strong>PetCare</strong>
              <span>cuidando da família</span>
            </div>

          </div>

          <div className="about-preview-content">

            <span className="section-label">
              SOBRE O PETCARE
            </span>

            <h2>
              Cuidando de quem
              <span>faz parte da família.</span>
            </h2>

            <p>
              O PetCare foi desenvolvido para tornar a rotina de cuidados
              com os animais mais simples, organizada e prática.
            </p>

            <p>
              Agora que você possui uma conta, pode cadastrar seus pets,
              acompanhar seus agendamentos e encontrar serviços em um único lugar.
            </p>

            <a
              href="/sobre"
              className="about-button"
            >
              Conheça o PetCare →
            </a>

          </div>

        </section>


        <section className="mission">

          <div className="mission-image">

            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Dois cães juntos"
            />

          </div>

          <div className="mission-content">

            <span className="section-label">
              NOSSA MISSÃO
            </span>

            <h2>
              Tornar o cuidado com seu pet mais simples.
            </h2>

            <p>
              Acreditamos que cuidar de um animal vai muito além de oferecer
              alimentação e abrigo. É acompanhar, proteger e proporcionar
              qualidade de vida.
            </p>

            <a href="/sobre">
              Conheça nossa história →
            </a>

          </div>

        </section>


        <section className="cta">

          <div className="cta-image">

            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=700&q=80"
              alt="Cachorro olhando para a câmera"
            />

          </div>

          <div className="cta-content">

            <span className="cta-label">
              SEU PET MERECE
            </span>

            <h2>
              O melhor cuidado começa aqui.
            </h2>

            <p>
              Cadastre seu pet e comece a organizar todos os cuidados
              e agendamentos em um só lugar.
            </p>

            <a
              href="/pets"
              className="cta-button"
            >
              Cadastrar meu pet <span>→</span>
            </a>

          </div>

        </section>

      </main>


      <footer>

        <div className="footer-content">

          <div className="footer-brand">

            <a
              href="/"
              className="logo footer-logo"
            >
              <div className="logo-icon">
                P
              </div>

              <h1>
                PetCare
              </h1>

            </a>

            <p>
              Cuidando de quem faz parte da família.
            </p>

          </div>


          <div className="footer-column">

            <strong>
              Navegação
            </strong>

            <a href="/">
              Início
            </a>

            <a href="/servicos">
              Serviços
            </a>

            <a href="/pets">
              Meus Pets
            </a>

            <a href="/agendamentos">
              Agendamentos
            </a>

          </div>


          <div className="footer-column">

            <strong>
              Minha conta
            </strong>

            <a href="/pets">
              Meus Pets
            </a>

            <a href="/agendamentos">
              Agendamentos
            </a>

            <a href="/conta">
              Configurações
            </a>

          </div>


          <div className="footer-column">

            <strong>
              PetCare
            </strong>

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

export default LogHome;