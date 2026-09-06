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

function Servico() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarServicos = async () => {
      try {
        const res = await fetch("http://localhost:3001/Servico");

        if (!res.ok) {
          throw new Error("Erro ao buscar serviços");
        }

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

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarDuracao = (duracao: number) => {
    if (duracao >= 60) {
      const horas = Math.floor(duracao / 60);
      const minutos = duracao % 60;

      if (minutos === 0) {
        return `${horas}h`;
      }

      return `${horas}h ${minutos}min`;
    }

    return `${duracao}min`;
  };

  return (
    <div className="services-page">
      <Navbar />

      <main>
        {/* HERO */}

        <section className="services-hero">
          <div className="services-hero-content">
            <span className="section-label">NOSSOS SERVIÇOS</span>

            <h2>
              Cuidados pensados para
              <span>seu melhor amigo.</span>
            </h2>

            <p>
              Encontre o serviço ideal para seu pet e cuide da saúde, higiene e
              bem-estar dele de forma simples e prática.
            </p>
          </div>
        </section>

        {/* SERVIÇOS */}

        <section className="services-section">
          <div className="services-header">
            <div>
              <span className="section-label">ESCOLHA UM SERVIÇO</span>

              <h2>O que seu pet precisa?</h2>
            </div>

            <p>
              Escolha uma opção abaixo para conhecer mais detalhes e realizar
              seu agendamento.
            </p>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="services-message">
              <p>Carregando serviços...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="services-message">
              <p>Nenhum serviço disponível no momento.</p>
            </div>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service._id}>
                  {/* IMAGEM VINDO DO BANCO */}

                  <div className="service-image">
                    <img
                      src={
                        service.img ||
                        "https://cdn-icons-png.flaticon.com/512/616/616408.png"
                      }
                      alt={service.nome}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://cdn-icons-png.flaticon.com/512/616/616408.png";
                      }}
                    />

                    <span className="service-category">SERVIÇO</span>
                  </div>

                  {/* INFORMAÇÕES */}

                  <div className="service-content">
                    <h3>{service.nome}</h3>

                    <p>{service.descricao}</p>

                    <div className="service-info">
                      <div className="service-duration">
                        <span>DURAÇÃO</span>

                        <strong>{formatarDuracao(service.duracao)}</strong>
                      </div>

                      <div className="service-price">
                        <span>A PARTIR DE</span>

                        <strong>{formatarPreco(service.preco)}</strong>
                      </div>
                    </div>

                    <a href="/login" className="service-button">
                      Agendar serviço
                      <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* INFORMAÇÕES SOBRE AGENDAMENTO */}

        <section className="booking-info">
          <div className="booking-info-image">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Cães juntos"
            />
          </div>

          <div className="booking-info-content">
            <span className="section-label">AGENDAMENTO</span>

            <h2>
              Escolha o serviço.
              <span> Nós cuidamos do resto.</span>
            </h2>

            <p>
              Depois de escolher o serviço, você poderá selecionar seu pet,
              consultar os horários disponíveis e escolher o melhor dia para
              realizar o atendimento.
            </p>

            <div className="booking-steps">
              <div className="booking-step">
                <strong>01</strong>

                <div>
                  <h3>Escolha o serviço</h3>

                  <p>Encontre o cuidado que seu pet precisa.</p>
                </div>
              </div>

              <div className="booking-step">
                <strong>02</strong>

                <div>
                  <h3>Escolha seu pet</h3>

                  <p>Selecione um dos pets cadastrados.</p>
                </div>
              </div>

              <div className="booking-step">
                <strong>03</strong>

                <div>
                  <h3>Escolha o horário</h3>

                  <p>Veja os horários disponíveis e confirme.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="services-cta">
          <div>
            <span>SEU PET MERECE</span>

            <h2>Pronto para cuidar melhor dele?</h2>

            <p>
              Crie sua conta e tenha acesso aos nossos serviços e agendamentos.
            </p>
          </div>

          <a href="/registro" className="services-cta-button">
            <span className="services-cta-text">Criar minha conta</span>

            <span className="services-cta-arrow">→</span>
          </a>
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

            <span>Cuidado</span>

            <span>Saúde</span>

            <span>Bem-estar</span>
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

export default Servico;
