import './styles.css';
import Navbar from '../../components/navBar'

const services = [
  {
    title: "Banho",
    category: "HIGIENE",
    description:
      "Cuidados completos para manter seu pet limpo, confortável e saudável.",
    price: "A partir de R$ 50,00",
    duration: "Duração média: 1h",
    image:
      "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Tosa",
    category: "ESTÉTICA",
    description:
      "Tosa realizada de acordo com as características e necessidades do seu pet.",
    price: "A partir de R$ 60,00",
    duration: "Duração média: 1h30",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Banho e Tosa",
    category: "HIGIENE E ESTÉTICA",
    description:
      "Um cuidado completo combinando banho, higiene e tosa.",
    price: "A partir de R$ 90,00",
    duration: "Duração média: 2h",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Consulta Veterinária",
    category: "SAÚDE",
    description:
      "Atendimento veterinário para acompanhar a saúde e o bem-estar do seu pet.",
    price: "A partir de R$ 120,00",
    duration: "Duração média: 40min",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Higiene",
    category: "HIGIENE",
    description:
      "Cuidados com unhas, ouvidos e outras necessidades de higiene.",
    price: "A partir de R$ 35,00",
    duration: "Duração média: 30min",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Pet Care",
    category: "BEM-ESTAR",
    description:
      "Cuidados especiais para proporcionar conforto e qualidade de vida ao seu pet.",
    price: "A partir de R$ 70,00",
    duration: "Duração média: 1h",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
  },
];

function Servico() {
  return (
    <div className="services-page">

      <Navbar />


      <main>

        <section className="services-hero">

          <div className="services-hero-content">

            <span className="section-label">
              NOSSOS SERVIÇOS
            </span>

            <h2>
              Cuidados pensados para
              <span>seu melhor amigo.</span>
            </h2>

            <p>
              Encontre o serviço ideal para seu pet e cuide da saúde,
              higiene e bem-estar dele de forma simples e prática.
            </p>

          </div>

        </section>


        <section className="services-section">

          <div className="services-header">

            <div>
              <span className="section-label">
                ESCOLHA UM SERVIÇO
              </span>

              <h2>
                O que seu pet precisa?
              </h2>
            </div>

            <p>
              Escolha uma opção abaixo para conhecer mais detalhes
              e realizar seu agendamento.
            </p>

          </div>


          <div className="services-grid">

            {services.map((service) => (

              <article
                className="service-card"
                key={service.title}
              >

                <div className="service-image">

                  <img
                    src={service.image}
                    alt={service.title}
                  />

                  <span className="service-category">
                    {service.category}
                  </span>

                </div>


                <div className="service-content">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>


                  <div className="service-info">

                    <span>
                      {service.duration}
                    </span>

                    <strong>
                      {service.price}
                    </strong>

                  </div>


                  <a
                    href="/agendamento"
                    className="service-button"
                  >
                    Agendar serviço
                    <span>→</span>
                  </a>

                </div>

              </article>

            ))}

          </div>

        </section>


        <section className="booking-info">

          <div className="booking-info-image">

            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Cães juntos"
            />

          </div>


          <div className="booking-info-content">

            <span className="section-label">
              AGENDAMENTO
            </span>

            <h2>
              Escolha o serviço.
              <span> Nós cuidamos do resto.</span>
            </h2>

            <p>
              Depois de escolher o serviço, você poderá selecionar
              seu pet, consultar os horários disponíveis e escolher
              o melhor dia para realizar o atendimento.
            </p>

            <div className="booking-steps">

              <div className="booking-step">

                <strong>01</strong>

                <div>
                  <h3>Escolha o serviço</h3>
                  <p>
                    Encontre o cuidado que seu pet precisa.
                  </p>
                </div>

              </div>


              <div className="booking-step">

                <strong>02</strong>

                <div>
                  <h3>Escolha seu pet</h3>
                  <p>
                    Selecione um dos pets cadastrados.
                  </p>
                </div>

              </div>


              <div className="booking-step">

                <strong>03</strong>

                <div>
                  <h3>Escolha o horário</h3>
                  <p>
                    Veja os horários disponíveis e confirme.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>


        <section className="services-cta">

          <div>

            <span>
              SEU PET MERECE
            </span>

            <h2>
              Pronto para cuidar melhor dele?
            </h2>

            <p>
              Crie sua conta e tenha acesso aos nossos serviços
              e agendamentos.
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

export default Servico;