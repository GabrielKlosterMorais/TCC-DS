// Importa os hooks useEffect e useState do React
// useState: cria e controla estados dentro do componente
// useEffect: executa códigos em determinados momentos do ciclo do componente
import { useEffect, useState } from "react";

// Importa o arquivo CSS responsável pela aparência da página
import "./styles.css";

// Importa a Navbar utilizada na área logada do sistema
import LogNavbar from "../../../components/logNavBar";


// ================= INTERFACE DO SERVIÇO =================

// Interface define o formato dos dados de um serviço
// que serão recebidos da API.
interface Service {
  _id: string;        // ID do serviço no MongoDB
  nome: string;       // Nome do serviço
  descricao: string;  // Descrição do serviço
  preco: number;      // Preço do serviço
  duracao: number;    // Duração em minutos
  img?: string;       // Imagem do serviço (opcional)
}


// ================= COMPONENTE PRINCIPAL =================

// Componente responsável pela página inicial da área logada
function LogHome() {

  // useState cria um estado chamado "services"
  //
  // services:
  // guarda a lista de serviços recebidos da API.
  //
  // setServices:
  // função utilizada para alterar essa lista.
  //
  // O [] indica que o estado começa como um array vazio.
  const [services, setServices] = useState<Service[]>([]);


  // Estado responsável por controlar o carregamento dos serviços.
  //
  // true:
  // os serviços ainda estão sendo carregados.
  //
  // false:
  // terminou o carregamento.
  const [loadingServices, setLoadingServices] = useState(true);


  // ================= BUSCAR SERVIÇOS =================

  // useEffect executa o código dentro dele depois que
  // o componente é renderizado.
  //
  // O [] no final significa que esse efeito será executado
  // apenas uma vez, quando a página for carregada.
  useEffect(() => {

    // Função assíncrona responsável por buscar os serviços
    // no backend.
    const fetchServices = async () => {

      try {

        // fetch faz uma requisição HTTP para o backend.
        //
        // Nesse caso estamos utilizando GET, que é o método
        // padrão do fetch quando nenhum método é informado.
        //
        // A API está rodando na porta 3001 e a rota é /Servico.
        const res = await fetch("http://localhost:3001/Servico");


        // res.ok verifica se a resposta HTTP foi bem-sucedida.
        //
        // Se houver um erro HTTP, lançamos um erro manualmente.
        if (!res.ok) {
          throw new Error("Erro ao buscar serviços");
        }


        // Converte a resposta da API de JSON para um objeto
        // que podemos utilizar no JavaScript/TypeScript.
        const data = await res.json();


        // A API pode retornar os serviços de duas formas:
        //
        // 1. Diretamente como array:
        //    [ ... ]
        //
        // 2. Dentro de uma propriedade "data":
        //    { data: [ ... ] }
        //
        // Array.isArray(data) verifica se "data" já é um array.
        //
        // Se for array, utiliza o próprio data.
        // Caso contrário, tenta pegar data.data.
        const servicesData = Array.isArray(data) ? data : data.data;


        // Verifica novamente se o resultado é realmente um array.
        //
        // Se for, salva os serviços no estado.
        // Se não for, salva um array vazio.
        setServices(Array.isArray(servicesData) ? servicesData : []);

      } catch (error) {

        // Se acontecer algum erro durante a requisição,
        // ele será mostrado no console do navegador.
        console.error("Erro ao carregar serviços:", error);


        // Em caso de erro, deixamos a lista de serviços vazia.
        setServices([]);

      } finally {

        // finally sempre é executado depois do try/catch.
        //
        // Aqui informamos que o carregamento terminou.
        //
        // true  -> ainda carregando
        // false -> terminou
        setLoadingServices(false);
      }
    };


    // Executa a função que busca os serviços.
    fetchServices();

  }, []);


  // ================= JSX DA PÁGINA =================

  // return contém o JSX.
  //
  // JSX é a sintaxe utilizada pelo React para escrever
  // a estrutura visual do componente utilizando uma
  // sintaxe parecida com HTML.
  return (

    // Div principal da página.
    <div className="home">

      {/* ================= NAVBAR ================= */}

      {/* 
        Renderiza a barra de navegação da área logada.
        LogNavbar é outro componente React.
      */}
      <LogNavbar />


      {/* ================= CONTEÚDO PRINCIPAL ================= */}

      <main>


        {/* ==================================================
            HERO
        ================================================== */}

        {/* 
          A seção Hero é a primeira parte da página.
          É utilizada para apresentar o PetCare e
          disponibilizar os principais botões de acesso.
        */}
        <section className="hero">

          <div className="hero-content">

            {/* Pequeno texto de boas-vindas */}
            <span className="hero-label">
              BEM-VINDO DE VOLTA AO PETCARE
            </span>


            {/* Título principal da página */}
            <h2>

              Cuide do seu pet

              {/* Parte do título destacada pelo CSS */}
              <span>de forma simples.</span>

            </h2>


            {/* Texto explicativo sobre o sistema */}
            <p>
              Organize os cuidados, acompanhe seus pets e encontre os melhores
              serviços para manter seu melhor amigo saudável e feliz.
            </p>


            {/* ================= BOTÕES DO HERO ================= */}

            <div className="hero-buttons">

              {/* 
                Link para a página de serviços.
                O usuário pode acessar essa página para
                escolher e agendar um serviço.
              */}
              <a
                href="/servicos"
                className="primary-button"
              >
                <span>Agendar serviço</span>
                <span>→</span>
              </a>


              {/* 
                Link para a página onde ficam os pets
                cadastrados pelo usuário.
              */}
              <a
                href="/pets"
                className="secondary-button"
              >
                <span>Meus pets</span>
              </a>

            </div>


            {/* ================= INFORMAÇÕES ================= */}

            <div className="hero-info">

              {/* Informação sobre pets */}
              <div className="info-item">

                {/* 
                  Atualmente está fixo em 0.
                  Não está sendo calculado pelo backend.
                */}
                <strong>0</strong>

                <span>Pets cadastrados</span>

              </div>


              {/* Linha divisória */}
              <div className="info-divider" />


              {/* Informação sobre agendamentos */}
              <div className="info-item">

                {/* Também está fixo em 0 */}
                <strong>0</strong>

                <span>Agendamentos</span>

              </div>


              {/* Linha divisória */}
              <div className="info-divider" />


              {/* Quantidade de serviços */}
              <div className="info-item">

                {/* 
                  Valor apresentado de forma fixa.
                  Não está vindo da API.
                */}
                <strong>+20</strong>

                <span>Serviços</span>

              </div>

            </div>

          </div>


          {/* ================= IMAGEM DO HERO ================= */}

          <div className="hero-visual">

            <div className="hero-image-wrapper">

              {/* 
                Imagem externa utilizada no Hero.
                Nesse caso, a imagem vem do Unsplash.
              */}
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85"
                alt="Cachorro do PetCare"
              />

            </div>


            {/* Card flutuante superior */}
            <div className="floating-card card-top">

              <div className="floating-icon">
                ✓
              </div>

              <div>

                <strong>Seu pet</strong>

                <span>Cuidados em dia</span>

              </div>

            </div>


            {/* Card flutuante inferior */}
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



        {/* ==================================================
            ACESSO RÁPIDO
        ================================================== */}

        {/* 
          Essa seção apresenta atalhos para as principais
          funcionalidades do sistema.
        */}
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


          {/* Grid que contém os cards de acesso rápido */}
          <div className="quick-grid">


            {/* ================= MEUS PETS ================= */}

            <a
              href="/pets"
              className="quick-card"
            >

              {/* Ícone representado pela letra P */}
              <div className="quick-icon">
                P
              </div>

              <div className="quick-card-text">

                <h3>
                  Meus Pets
                </h3>

                <p>
                  Cadastre e acompanhe seus animais.
                </p>

              </div>

              {/* Seta indicando acesso */}
              <span className="quick-arrow">
                →
              </span>

            </a>


            {/* ================= AGENDAR SERVIÇO ================= */}

            <a
              href="/servicos"
              className="quick-card"
            >

              <div className="quick-icon">
                S
              </div>

              <div className="quick-card-text">

                <h3>
                  Agendar serviço
                </h3>

                <p>
                  Escolha um serviço e horário disponível.
                </p>

              </div>

              <span className="quick-arrow">
                →
              </span>

            </a>


            {/* ================= AGENDAMENTOS ================= */}

            <a
              href="/agendamentos"
              className="quick-card"
            >

              <div className="quick-icon">
                A
              </div>

              <div className="quick-card-text">

                <h3>
                  Agendamentos
                </h3>

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



        {/* ==================================================
            SERVIÇOS
        ================================================== */}

        {/* 
          Seção responsável por mostrar alguns dos serviços
          disponíveis no PetCare.
        */}
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


          {/* ==================================================
              ESTADO DE CARREGAMENTO
          ================================================== */}

          {/* 
            Operador ternário utilizado para escolher
            o que será exibido na tela.
            
            Se loadingServices for true:
            mostra "Carregando serviços..."
            
            Se for false, verifica se existem serviços.
          */}
          {loadingServices ? (

            // ================= CARREGANDO =================

            <div className="services-loading">

              {/* 
                Span vazio.
                Provavelmente utilizado pelo CSS para
                criar um indicador visual de carregamento.
              */}
              <span />

              <p>
                Carregando serviços...
              </p>

            </div>

          ) : services.length === 0 ? (

            // ================= NENHUM SERVIÇO =================

            <div className="services-empty">

              <h3>
                Nenhum serviço disponível
              </h3>

              <p>
                Novos serviços estarão disponíveis em breve.
              </p>

            </div>

          ) : (

            // ================= SERVIÇOS DISPONÍVEIS =================

            <div className="services-grid">

              {/* 
                slice(0, 4) pega somente os primeiros 4 serviços.

                IMPORTANTE:
                slice NÃO altera o array original.

                Exemplo:
                [1, 2, 3, 4, 5]
                
                slice(0, 4)
                
                resulta em:
                [1, 2, 3, 4]
              */}
              {services.slice(0, 4).map((service) => (

                /*
                  map percorre cada serviço do array.

                  Para cada serviço encontrado, o React
                  cria um card.

                  "service" representa o serviço atual
                  durante cada repetição.
                */
                <div
                  className="service-card"
                  key={service._id}
                >


                  {/* ================= IMAGEM DO SERVIÇO ================= */}

                  <div className="service-image">

                    {/* 
                      Operador ternário:
                      
                      Se service.img existir:
                      mostra a imagem.
                      
                      Caso contrário:
                      mostra um bloco alternativo.
                    */}
                    {service.img ? (

                      <img
                        src={service.img}
                        alt={service.nome}
                      />

                    ) : (

                      // ================= SEM IMAGEM =================

                      <div className="service-no-image">

                        <span>
                          PetCare
                        </span>

                      </div>

                    )}


                    {/* 
                      Mostra o preço do serviço.

                      Number(service.preco || 0):
                      garante que o valor seja tratado como número.

                      toFixed(2):
                      mantém duas casas decimais.

                      replace(".", ","):
                      troca o ponto decimal por vírgula,
                      seguindo o formato brasileiro.
                    */}
                    <span className="service-price">

                      R$ {Number(service.preco || 0)
                        .toFixed(2)
                        .replace(".", ",")}

                    </span>

                  </div>


                  {/* ================= INFORMAÇÕES ================= */}

                  <div className="service-content">

                    {/* Categoria do serviço */}
                    <span className="service-tag">
                      PETCARE
                    </span>


                    {/* Nome recebido da API */}
                    <h3>
                      {service.nome}
                    </h3>


                    {/* Descrição recebida da API */}
                    <p>
                      {service.descricao}
                    </p>


                    {/* ================= RODAPÉ DO CARD ================= */}

                    <div className="service-footer">

                      {/* 
                        Mostra a duração do serviço.
                        
                        Exemplo:
                        se duracao = 60
                        
                        aparece:
                        60 min
                      */}
                      <span>
                        {service.duracao} min
                      </span>


                      {/* Link para visualizar/agendar serviços */}
                      <a href="/servicos">

                        <span>
                          Ver serviço
                        </span>

                        <span>
                          →
                        </span>

                      </a>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}


          {/* ================= RODAPÉ DOS SERVIÇOS ================= */}

          <div className="services-footer">

            <p>
              Encontre o serviço ideal para o seu pet.
            </p>

            {/* Link para acessar todos os serviços */}
            <a href="/servicos">
              Ver todos os serviços →
            </a>

          </div>

        </section>



        {/* ==================================================
            SOBRE O PETCARE
        ================================================== */}

        <section className="about-preview">

          {/* Imagem da seção Sobre */}
          <div className="about-preview-image">

            <img
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85"
              alt="Cachorro feliz"
            />


            {/* 
              Badge sobreposto à imagem.
              Serve como elemento visual para destacar
              a mensagem do PetCare.
            */}
            <div className="image-badge">

              <strong>
                PetCare
              </strong>

              <span>
                cuidando da família
              </span>

            </div>

          </div>


          {/* Conteúdo textual da seção */}
          <div className="about-preview-content">

            <span className="section-label">
              SOBRE O PETCARE
            </span>

            <h2>

              Cuidando de quem

              <span>
                faz parte da família.
              </span>

            </h2>


            <p>
              O PetCare foi desenvolvido para tornar a rotina de cuidados
              com os animais mais simples, organizada e prática.
            </p>

            <p>
              Agora que você possui uma conta, pode cadastrar seus pets,
              acompanhar seus agendamentos e encontrar serviços em um único
              lugar.
            </p>


            {/* Link para a página Sobre Nós */}
            <a
              href="/sobre"
              className="about-button"
            >
              Conheça o PetCare →
            </a>

          </div>

        </section>



        {/* ==================================================
            MISSÃO
        ================================================== */}

        {/* 
          Seção destinada a apresentar a missão do PetCare.
        */}
        <section className="mission">

          {/* Imagem da missão */}
          <div className="mission-image">

            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Dois cães juntos"
            />

          </div>


          {/* Texto da missão */}
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


            {/* Link para conhecer a história do PetCare */}
            <a href="/sobre">
              Conheça nossa história →
            </a>

          </div>

        </section>



        {/* ==================================================
            CTA
        ================================================== */}

        {/* 
          CTA significa "Call To Action".

          É uma seção criada para incentivar o usuário
          a realizar uma ação.
        */}
        <section className="cta">

          {/* Imagem do CTA */}
          <div className="cta-image">

            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=700&q=80"
              alt="Cachorro olhando para a câmera"
            />

          </div>


          {/* Conteúdo do CTA */}
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


            {/* 
              Botão que direciona o usuário para
              o cadastro dos pets.
            */}
            <a
              href="/pets"
              className="cta-button"
            >

              <span>
                Cadastrar meu pet
              </span>

              <span>
                →
              </span>

            </a>

          </div>

        </section>

      </main>



      {/* ==================================================
          FOOTER
      ================================================== */}

      {/* 
        Footer é a parte inferior da página.

        Ele contém:
        - Logo
        - Descrição
        - Links de navegação
        - Links da conta
        - Informações sobre o PetCare
        - Copyright
      */}
      <footer>

        <div className="footer-content">


          {/* ================= MARCA ================= */}

          <div className="footer-brand">

            {/* Logo que direciona para a página inicial */}
            <a
              href="/"
              className="footer-logo"
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



          {/* ================= NAVEGAÇÃO ================= */}

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



          {/* ================= MINHA CONTA ================= */}

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



          {/* ================= PETCARE ================= */}

          <div className="footer-column">

            <strong>
              PetCare
            </strong>

            {/* 
              Aqui são utilizados spans porque são
              apenas textos informativos e não links.
            */}
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



        {/* ================= PARTE INFERIOR ================= */}

        <div className="footer-bottom">

          {/* Copyright */}
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


// Exporta o componente LogHome
// permitindo que ele seja importado e utilizado
// em outras partes da aplicação.
export default LogHome;