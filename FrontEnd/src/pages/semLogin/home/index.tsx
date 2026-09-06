import { useEffect, useState } from "react";
import "./styles.css";
import Navbar from "../../../components/navBar";

interface Service {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  img: string;
}

function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarServicos = async () => {
      try {
        const res = await fetch("http://localhost:3001/Servico");

        if (!res.ok) throw new Error("Erro ao buscar serviços");

        const data = await res.json();
        setServices(data.data || []);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarServicos();
  }, []);

  return (
    <div className="home">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">
              CUIDADO PARA QUEM FAZ PARTE DA FAMÍLIA
            </span>

            <h2>
              Seu pet merece
              <span>o melhor cuidado.</span>
            </h2>

            <p>
              Encontre serviços, organize os cuidados e acompanhe a rotina do
              seu melhor amigo de forma simples e prática.
            </p>

            <div className="hero-buttons">
              <a href="/registro" className="primary-button">
                Começar agora <span>→</span>
              </a>

              <a href="/servicos" className="secondary-button">
                Conhecer serviços
              </a>
            </div>

            <div className="hero-info">
              <div className="info-item">
                <strong>+500</strong>
                <span>Pets cuidados</span>
              </div>

              <div className="info-divider" />

              <div className="info-item">
                <strong>+20</strong>
                <span>Serviços</span>
              </div>

              <div className="info-divider" />

              <div className="info-item">
                <strong>4.9/5</strong>
                <span>Avaliação</span>
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
              <div className="floating-icon">✓</div>
              <div>
                <strong>Agendamento</strong>
                <span>Fácil e rápido</span>
              </div>
            </div>

            <div className="floating-card card-bottom">
              <div className="floating-icon green">✓</div>
              <div>
                <strong>Pet saudável</strong>
                <span>Cuidados em dia</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section className="services-preview">
          <div className="section-header">
            <span className="section-label">NOSSOS SERVIÇOS</span>

            <h2>Tudo para cuidar do seu pet</h2>

            <p>
              Serviços pensados para manter seu melhor amigo saudável,
              confortável e feliz.
            </p>
          </div>

          {loading ? (
            <div className="services-loading">
              <p>Carregando serviços...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="services-empty">
              <h3>Nenhum serviço disponível</h3>
              <p>No momento não existem serviços cadastrados.</p>
            </div>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <div className="service-card" key={service._id}>
                  <div className="service-image">
                    <img src={service.img} alt={service.nome} />
                  </div>

                  <div className="service-info">
                    <span className="service-category">SERVIÇO</span>

                    <h3>{service.nome}</h3>

                    <p>{service.descricao}</p>

                    <a href="/servicos">Saiba mais →</a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="services-footer">
            <p>Quer conhecer todos os nossos serviços?</p>

            <a href="/servicos">Ver todos os serviços →</a>
          </div>
        </section>

        {/* SOBRE */}
        <section className="about-preview">
          <div className="about-preview-image">
            <img
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85"
              alt="Cachorro feliz"
            />

            <div className="image-badge">
              <strong>+500</strong>
              <span>pets cuidados</span>
            </div>
          </div>

          <div className="about-preview-content">
            <span className="section-label">SOBRE O PETCARE</span>

            <h2>
              Cuidando de quem
              <span> faz parte da família.</span>
            </h2>

            <p>
              O PetCare foi desenvolvido para tornar a rotina de cuidados com os
              animais mais simples, organizada e prática.
            </p>

            <p>
              Nossa plataforma reúne informações dos pets, serviços e
              agendamentos em um único lugar.
            </p>

            <a href="/sobre" className="about-button">
              Conheça o PetCare →
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-image">
            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=700&q=80"
              alt="Cachorro olhando para a câmera"
            />
          </div>

          <div className="cta-content">
            <span className="cta-label">SEU PET MERECE</span>

            <h2>O melhor cuidado começa aqui.</h2>

            <p>
              Crie sua conta gratuitamente e comece a cuidar da rotina do seu
              melhor amigo.
            </p>

            <a href="/registro" className="cta-button">
  <span>Criar minha conta</span>
  <span className="cta-arrow">→</span>
</a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="logo footer-logo">
              <div className="logo-icon">P</div>
              <h1>PetCare</h1>
            </a>

            <p>Cuidando de quem faz parte da família.</p>
          </div>

          <div className="footer-column">
            <strong>Navegação</strong>
            <a href="/">Início</a>
            <a href="/servicos">Serviços</a>
            <a href="/sobre">Sobre nós</a>
          </div>

          <div className="footer-column">
            <strong>Conta</strong>
            <a href="/login">Entrar</a>
            <a href="/registro">Criar conta</a>
          </div>

          <div className="footer-column">
            <strong>PetCare</strong>
            <a href="/petcare#cuidado">Cuidado</a>
            <a href="/petcare#saude">Saúde</a>
            <a href="/petcare#bem-estar">Bem-estar</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 PetCare. Todos os direitos reservados.</span>
          <span>Feito para cuidar melhor.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
