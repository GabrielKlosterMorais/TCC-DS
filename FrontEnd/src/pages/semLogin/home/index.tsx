import { useEffect, useState } from "react";
import "./styles.css";
import Navbar from "../../../components/navBar";

/* Define a estrutura dos dados de um serviço */
interface Service {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  img: string;
}

/* Componente principal da página inicial */
function Home() {

  /* Armazena a lista de serviços recebidos do backend */
  const [services, setServices] = useState<Service[]>([]);

  /* Controla o estado de carregamento dos serviços */
  const [loading, setLoading] = useState(true);

  /* Executa o carregamento dos serviços quando a página é aberta */
  useEffect(() => {

    /* Função responsável por buscar os serviços no backend */
    const carregarServicos = async () => {
      try {

        /* Faz uma requisição para a rota de serviços */
        const res = await fetch("http://localhost:3001/Servico");

        /* Verifica se a resposta da API apresentou erro */
        if (!res.ok) throw new Error("Erro ao buscar serviços");

        /* Converte a resposta para JSON */
        const data = await res.json();

        /* Armazena os serviços recebidos */
        setServices(data.data || []);

      } catch (error) {

        /* Exibe o erro no console caso a requisição falhe */
        console.error("Erro ao carregar serviços:", error);

      } finally {

        /* Finaliza o estado de carregamento */
        setLoading(false);
      }
    };

    /* Executa a função de carregamento */
    carregarServicos();

  /* Array vazio faz o efeito executar somente quando o componente é montado */
  }, []);

  return (
    /* Container principal da página */
    <div className="home">

      {/* Barra de navegação pública */}
      <Navbar />

      <main>

        {/* HERO */}
        {/* Seção principal de apresentação do PetCare */}
        <section className="hero">

          {/* Área com textos e botões principais */}
          <div className="hero-content">

            {/* Pequeno texto de destaque */}
            <span className="hero-label">
              CUIDADO PARA QUEM FAZ PARTE DA FAMÍLIA
            </span>

            {/* Título principal da página */}
            <h2>
              Seu pet merece
              <span>o melhor cuidado.</span>
            </h2>

            {/* Texto de apresentação */}
            <p>
              Encontre serviços, organize os cuidados e acompanhe a rotina do
              seu melhor amigo de forma simples e prática.
            </p>

            {/* Área dos botões principais */}
            <div className="hero-buttons">

              {/* Botão para criar uma conta */}
              <a href="/registro" className="primary-button">
                Começar agora <span>→</span>
              </a>

              {/* Botão para visualizar os serviços */}
              <a href="/servicos" className="secondary-button">
                Conhecer serviços
              </a>

            </div>

            {/* Informações e números de destaque */}
            <div className="hero-info">

              {/* Quantidade de pets cuidados */}
              <div className="info-item">
                <strong>+500</strong>
                <span>Pets cuidados</span>
              </div>

              {/* Divisor entre as informações */}
              <div className="info-divider" />

              {/* Quantidade de serviços */}
              <div className="info-item">
                <strong>+20</strong>
                <span>Serviços</span>
              </div>

              {/* Divisor entre as informações */}
              <div className="info-divider" />

              {/* Avaliação apresentada no site */}
              <div className="info-item">
                <strong>4.9/5</strong>
                <span>Avaliação</span>
              </div>

            </div>
          </div>

          {/* Área visual do Hero */}
          <div className="hero-visual">

            {/* Container da imagem principal */}
            <div className="hero-image-wrapper">

              {/* Imagem do cachorro */}
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85"
                alt="Cachorro do PetCare"
              />

            </div>

            {/* Card flutuante superior */}
            <div className="floating-card card-top">

              {/* Ícone do card */}
              <div className="floating-icon">✓</div>

              <div>
                <strong>Agendamento</strong>
                <span>Fácil e rápido</span>
              </div>

            </div>

            {/* Card flutuante inferior */}
            <div className="floating-card card-bottom">

              {/* Ícone do card */}
              <div className="floating-icon green">✓</div>

              <div>
                <strong>Pet saudável</strong>
                <span>Cuidados em dia</span>
              </div>

            </div>

          </div>
        </section>


        {/* SERVIÇOS */}
        {/* Seção que apresenta os serviços cadastrados no sistema */}
        <section className="services-preview">

          {/* Cabeçalho da seção */}
          <div className="section-header">

            <span className="section-label">NOSSOS SERVIÇOS</span>

            <h2>Tudo para cuidar do seu pet</h2>

            <p>
              Serviços pensados para manter seu melhor amigo saudável,
              confortável e feliz.
            </p>

          </div>

          {/* Verifica se os serviços ainda estão sendo carregados */}
          {loading ? (

            /* Mensagem exibida durante o carregamento */
            <div className="services-loading">
              <p>Carregando serviços...</p>
            </div>

          ) : services.length === 0 ? (

            /* Mensagem exibida caso não existam serviços */
            <div className="services-empty">
              <h3>Nenhum serviço disponível</h3>
              <p>No momento não existem serviços cadastrados.</p>
            </div>

          ) : (

            /* Lista dos serviços recebidos do backend */
            <div className="services-grid">

              {/* Percorre cada serviço e cria um card */}
              {services.map((service) => (

                <div className="service-card" key={service._id}>

                  {/* Área da imagem do serviço */}
                  <div className="service-image">

                    <img
                      src={service.img}
                      alt={service.nome}
                    />

                  </div>

                  {/* Informações do serviço */}
                  <div className="service-info">

                    {/* Categoria do serviço */}
                    <span className="service-category">
                      SERVIÇO
                    </span>

                    {/* Nome do serviço */}
                    <h3>{service.nome}</h3>

                    {/* Descrição do serviço */}
                    <p>{service.descricao}</p>

                    {/* Link para visualizar os serviços */}
                    <a href="/servicos">Saiba mais →</a>

                  </div>
                </div>

              ))}
            </div>
          )}

          {/* Rodapé da seção de serviços */}
          <div className="services-footer">

            <p>Quer conhecer todos os nossos serviços?</p>

            <a href="/servicos">Ver todos os serviços →</a>

          </div>

        </section>


        {/* SOBRE */}
        {/* Seção de apresentação do PetCare */}
        <section className="about-preview">

          {/* Área da imagem */}
          <div className="about-preview-image">

            <img
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85"
              alt="Cachorro feliz"
            />

            {/* Informação apresentada sobre a imagem */}
            <div className="image-badge">
              <strong>+500</strong>
              <span>pets cuidados</span>
            </div>

          </div>

          {/* Área com o texto sobre o PetCare */}
          <div className="about-preview-content">

            <span className="section-label">
              SOBRE O PETCARE
            </span>

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

            {/* Link para a página completa sobre o PetCare */}
            <a href="/sobre" className="about-button">
              Conheça o PetCare →
            </a>

          </div>
        </section>


        {/* CTA */}
        {/* Seção de chamada para criação de conta */}
        <section className="cta">

          {/* Imagem da seção */}
          <div className="cta-image">

            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=700&q=80"
              alt="Cachorro olhando para a câmera"
            />

          </div>

          {/* Conteúdo da chamada */}
          <div className="cta-content">

            <span className="cta-label">
              SEU PET MERECE
            </span>

            <h2>O melhor cuidado começa aqui.</h2>

            <p>
              Crie sua conta gratuitamente e comece a cuidar da rotina do seu
              melhor amigo.
            </p>

            {/* Botão para criar uma conta */}
            <a href="/registro" className="cta-button">

              {/* Texto do botão */}
              <span>Criar minha conta</span>

              {/* Seta do botão */}
              <span className="cta-arrow">→</span>

            </a>

          </div>
        </section>

      </main>


      {/* FOOTER */}
      {/* Rodapé da aplicação */}
      <footer>

        {/* Conteúdo principal do rodapé */}
        <div className="footer-content">

          {/* Informações da marca */}
          <div className="footer-brand">

            {/* Logo do PetCare */}
            <a href="/" className="logo footer-logo">

              <div className="logo-icon">P</div>

              <h1>PetCare</h1>

            </a>

            <p>
              Cuidando de quem faz parte da família.
            </p>

          </div>


          {/* Coluna de navegação */}
          <div className="footer-column">

            <strong>Navegação</strong>

            <a href="/">Início</a>
            <a href="/servicos">Serviços</a>
            <a href="/sobre">Sobre nós</a>

          </div>


          {/* Coluna relacionada à conta */}
          <div className="footer-column">

            <strong>Conta</strong>

            <a href="/login">Entrar</a>
            <a href="/registro">Criar conta</a>

          </div>


          {/* Coluna com informações do PetCare */}
          <div className="footer-column">

            <strong>PetCare</strong>

            <a href="/petcare#cuidado">Cuidado</a>
            <a href="/petcare#saude">Saúde</a>
            <a href="/petcare#bem-estar">Bem-estar</a>

          </div>

        </div>


        {/* Parte inferior do rodapé */}
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

/* Exporta o componente para que ele possa ser utilizado em outras partes do sistema */
export default Home;