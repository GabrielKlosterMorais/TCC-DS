import './styles.css';
import Navbar from '../../../components/navBar';

const pillars = [
  {
    id: 'cuidado',
    number: '01',
    title: 'Cuidado',
    subtitle: 'Uma rotina mais organizada',
    description:
      'Cuidar de um pet envolve pequenas tarefas todos os dias. O PetCare ajuda você a organizar esses cuidados e manter a rotina do seu animal sempre em dia.',
    image:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85',
    items: [
      'Banho e higiene',
      'Cuidados com a pelagem',
      'Rotina de cuidados',
      'Acompanhamento dos serviços',
    ],
  },
  {
    id: 'saude',
    number: '02',
    title: 'Saúde',
    subtitle: 'Prevenção e acompanhamento',
    description:
      'A saúde do seu pet merece atenção. Ter informações organizadas facilita o acompanhamento e ajuda você a lembrar dos cuidados importantes.',
    image:
      'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=85',
    items: [
      'Acompanhamento veterinário',
      'Consultas',
      'Cuidados preventivos',
      'Histórico de serviços',
    ],
  },
  {
    id: 'bem-estar',
    number: '03',
    title: 'Bem-estar',
    subtitle: 'Qualidade de vida para seu pet',
    description:
      'Bem-estar também faz parte da saúde. Uma rotina equilibrada, cuidados adequados e atenção ajudam seu pet a ter uma vida mais confortável e feliz.',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85',
    items: [
      'Conforto e higiene',
      'Rotina saudável',
      'Cuidados personalizados',
      'Qualidade de vida',
    ],
  },
];

function PetCare() {
  return (
    <div className="petcare-page">

      <Navbar />


      <main>

        <section className="petcare-hero">

          <div className="petcare-hero-content">

            <span className="section-label">
              PETCARE
            </span>

            <h2>
              Tudo para cuidar
              <span>do seu melhor amigo.</span>
            </h2>

            <p>
              Cuidado, saúde e bem-estar em um só lugar. O PetCare foi
              pensado para ajudar você a acompanhar a rotina do seu pet
              de maneira simples e organizada.
            </p>

            <div className="hero-buttons">

              <a
                href="/registro"
                className="primary-button"
              >
                Começar agora <span>→</span>
              </a>

              <a
                href="/servicos"
                className="secondary-button"
              >
                Conhecer serviços
              </a>

            </div>

          </div>


          <div className="petcare-hero-image">

            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85"
              alt="Cachorro"
            />

          </div>

        </section>


        <section className="pillars-intro">

          <span className="section-label">
            OS PILARES DO PETCARE
          </span>

          <h2>
            Cuidar é estar presente.
          </h2>

          <p>
            Reunimos três pilares importantes para ajudar você a
            proporcionar uma rotina melhor para o seu pet.
          </p>

        </section>


        <section className="pillars">

          {pillars.map((pillar, index) => (

            <article
              className={`pillar ${index % 2 !== 0 ? 'reverse' : ''}`}
              id={pillar.id}
              key={pillar.id}
            >

              <div className="pillar-image">

                <img
                  src={pillar.image}
                  alt={pillar.title}
                />

                <span className="pillar-number">
                  {pillar.number}
                </span>

              </div>


              <div className="pillar-content">

                <span className="pillar-tag">
                  {pillar.title.toUpperCase()}
                </span>

                <h2>
                  {pillar.subtitle}
                </h2>

                <p>
                  {pillar.description}
                </p>


                <ul>

                  {pillar.items.map((item) => (

                    <li key={item}>
                      <span className="check">
                        ✓
                      </span>

                      {item}
                    </li>

                  ))}

                </ul>

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


        <section className="petcare-navigation">

          <div className="navigation-header">

            <span className="section-label">
              CONHEÇA MAIS
            </span>

            <h2>
              O PetCare foi feito para você.
            </h2>

            <p>
              Acesse outras áreas da plataforma e encontre tudo o que
              precisa para cuidar do seu pet.
            </p>

          </div>


          <div className="navigation-cards">

            <a
              href="/servicos"
              className="navigation-card"
            >

              <span className="navigation-number">
                01
              </span>

              <h3>
                Serviços
              </h3>

              <p>
                Encontre os serviços disponíveis para seu pet.
              </p>

              <span className="navigation-arrow">
                →
              </span>

            </a>


            <a
              href="/sobre"
              className="navigation-card"
            >

              <span className="navigation-number">
                02
              </span>

              <h3>
                Sobre nós
              </h3>

              <p>
                Conheça a história e a missão do PetCare.
              </p>

              <span className="navigation-arrow">
                →
              </span>

            </a>


            <a
              href="/registro"
              className="navigation-card"
            >

              <span className="navigation-number">
                03
              </span>

              <h3>
                Criar conta
              </h3>

              <p>
                Comece a organizar os cuidados do seu pet.
              </p>

              <span className="navigation-arrow">
                →
              </span>

            </a>

          </div>

        </section>


        <section className="petcare-cta">

          <div className="petcare-cta-content">

            <span className="cta-label">
              SEU PET MERECE
            </span>

            <h2>
              O melhor cuidado começa aqui.
            </h2>

            <p>
              Crie sua conta e tenha uma maneira simples de organizar
              os cuidados e serviços do seu melhor amigo.
            </p>

            <a
              href="/registro"
              className="cta-button"
            >
              Criar minha conta <span>→</span>
            </a>

          </div>

          <div className="petcare-cta-image">

            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=85"
              alt="Cachorro"
            />

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

            <a href="/sobre">
              Sobre nós
            </a>

          </div>


          <div className="footer-column">

            <strong>
              Conta
            </strong>

            <a href="/login">
              Entrar
            </a>

            <a href="/registro">
              Criar conta
            </a>

          </div>


          <div className="footer-column">

            <strong>
              PetCare
            </strong>

            <a href="/petcare#cuidado">
              Cuidado
            </a>

            <a href="/petcare#saude">
              Saúde
            </a>

            <a href="/petcare#bem-estar">
              Bem-estar
            </a>

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

export default PetCare;