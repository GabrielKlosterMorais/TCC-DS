// Importa o useEffect e o useState do React.
// useState guarda informações que podem mudar na tela.
// useEffect executa uma ação automaticamente quando o componente é carregado.
import { useEffect, useState } from "react";

// Importa os estilos da página.
import "./styles.css";

// Importa a Navbar utilizada no sistema.
import Navbar from "../../../components/navBar";


// Interface que define a estrutura de um serviço.
// Ela informa ao TypeScript quais propriedades cada serviço possui
// e qual é o tipo de cada uma.
interface Service {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  img: string;
}


// Componente responsável pela página de serviços.
function Servico() {

  // Estado que armazena a lista de serviços recebidos do back-end.
  // Inicialmente a lista está vazia.
  const [services, setServices] = useState<Service[]>([]);

  // Estado que controla se os serviços ainda estão sendo carregados.
  // Começa como true porque a busca ainda não foi realizada.
  const [loading, setLoading] = useState(true);


  // useEffect executa o código quando o componente é carregado.
  // O [] no final significa que ele será executado somente uma vez.
  useEffect(() => {

    // Função responsável por buscar os serviços no back-end.
    const carregarServicos = async () => {

      try {

        // Faz uma requisição GET para a rota de serviços.
        const res = await fetch("http://localhost:3001/Servico");


        // Verifica se o servidor retornou algum erro.
        if (!res.ok) {

          // Cria um erro caso a resposta não seja bem-sucedida.
          throw new Error("Erro ao buscar serviços");
        }


        // Converte a resposta do servidor para JSON.
        const data = await res.json();


        // Salva os serviços recebidos no estado.
        // data.data representa a lista enviada pelo back-end.
        // Caso data.data não exista, utiliza uma lista vazia.
        setServices(data.data || []);


      } catch (error) {

        // Exibe o erro no console caso a requisição falhe.
        console.error("Erro ao carregar serviços:", error);


      } finally {

        // Independentemente de sucesso ou erro,
        // informa que o carregamento terminou.
        setLoading(false);
      }
    };


    // Executa a função que busca os serviços.
    carregarServicos();

  }, []);


  // Função responsável por transformar o preço
  // em formato de moeda brasileira.
  const formatarPreco = (preco: number) => {

    // toLocaleString adapta o número para o padrão brasileiro.
    return preco.toLocaleString("pt-BR", {

      // Define o formato como moeda.
      style: "currency",

      // Define a moeda como Real brasileiro.
      currency: "BRL",
    });
  };


  // Função responsável por transformar a duração,
  // que está em minutos, em um formato mais amigável.
  const formatarDuracao = (duracao: number) => {

    // Verifica se a duração é igual ou maior que 60 minutos.
    if (duracao >= 60) {

      // Calcula a quantidade inteira de horas.
      const horas = Math.floor(duracao / 60);

      // Calcula os minutos restantes.
      const minutos = duracao % 60;


      // Se não houver minutos restantes,
      // mostra somente a quantidade de horas.
      if (minutos === 0) {
        return `${horas}h`;
      }


      // Caso tenha horas e minutos,
      // retorna algo como "1h 30min".
      return `${horas}h ${minutos}min`;
    }


    // Se tiver menos de 60 minutos,
    // mostra somente os minutos.
    return `${duracao}min`;
  };


  // Retorna a estrutura visual da página.
  return (
    <div className="services-page">

      {/* Barra de navegação do PetCare */}
      <Navbar />


      <main>

        {/* =================================================
            HERO
            ================================================= */}

        {/* Primeira seção de destaque da página */}
        <section className="services-hero">

          <div className="services-hero-content">

            {/* Pequeno título da seção */}
            <span className="section-label">
              NOSSOS SERVIÇOS
            </span>


            {/* Título principal */}
            <h2>
              Cuidados pensados para
              <span>seu melhor amigo.</span>
            </h2>


            {/* Descrição da página */}
            <p>
              Encontre o serviço ideal para seu pet e cuide da saúde, higiene e
              bem-estar dele de forma simples e prática.
            </p>

          </div>
        </section>


        {/* =================================================
            LISTA DE SERVIÇOS
            ================================================= */}

        <section className="services-section">

          {/* Cabeçalho da lista */}
          <div className="services-header">

            <div>

              <span className="section-label">
                ESCOLHA UM SERVIÇO
              </span>

              <h2>O que seu pet precisa?</h2>

            </div>


            <p>
              Escolha uma opção abaixo para conhecer mais detalhes e realizar
              seu agendamento.
            </p>

          </div>


          {/* =================================================
              LOADING / SERVIÇOS
              ================================================= */}

          {loading ? (

            // Enquanto o servidor ainda está respondendo,
            // mostra uma mensagem de carregamento.
            <div className="services-message">
              <p>Carregando serviços...</p>
            </div>


          ) : services.length === 0 ? (

            // Caso o carregamento termine e não existam serviços,
            // mostra uma mensagem informando que a lista está vazia.
            <div className="services-message">
              <p>Nenhum serviço disponível no momento.</p>
            </div>


          ) : (

            // Caso existam serviços,
            // cria a grade de cards.
            <div className="services-grid">

              {/* map percorre cada serviço existente no array */}
              {services.map((service) => (

                // Cada serviço vira um article/card.
                // key identifica cada elemento individualmente.
                <article
                  className="service-card"
                  key={service._id}
                >

                  {/* =================================================
                      IMAGEM DO SERVIÇO
                      ================================================= */}

                  <div className="service-image">

                    <img
                      src={
                        // Usa a imagem cadastrada no banco.
                        // Caso não exista, usa uma imagem padrão.
                        service.img ||
                        "https://cdn-icons-png.flaticon.com/512/616/616408.png"
                      }

                      // Texto alternativo da imagem.
                      // Nesse caso, utiliza o nome do serviço.
                      alt={service.nome}

                      // Caso a imagem cadastrada não consiga carregar,
                      // substitui pela imagem padrão.
                      onError={(e) => {

                        e.currentTarget.src =
                          "https://cdn-icons-png.flaticon.com/512/616/616408.png";
                      }}
                    />


                    {/* Categoria exibida no card */}
                    <span className="service-category">
                      SERVIÇO
                    </span>

                  </div>


                  {/* =================================================
                      INFORMAÇÕES DO SERVIÇO
                      ================================================= */}

                  <div className="service-content">

                    {/* Nome do serviço vindo do banco */}
                    <h3>{service.nome}</h3>


                    {/* Descrição do serviço vindo do banco */}
                    <p>{service.descricao}</p>


                    {/* Informações de duração e preço */}
                    <div className="service-info">

                      {/* Duração */}
                      <div className="service-duration">

                        <span>DURAÇÃO</span>

                        {/* Converte minutos para formato amigável */}
                        <strong>
                          {formatarDuracao(service.duracao)}
                        </strong>

                      </div>


                      {/* Preço */}
                      <div className="service-price">

                        <span>A PARTIR DE</span>

                        {/* Formata o preço como Real */}
                        <strong>
                          {formatarPreco(service.preco)}
                        </strong>

                      </div>

                    </div>


                    {/* Botão/link para agendamento */}
                    <a
                      href="/login"
                      className="service-button"
                    >
                      Agendar serviço

                      <span>→</span>
                    </a>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>


        {/* =================================================
            INFORMAÇÕES SOBRE AGENDAMENTO
            ================================================= */}

        <section className="booking-info">

          {/* Imagem da seção */}
          <div className="booking-info-image">

            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Cães juntos"
            />

          </div>


          {/* Texto explicativo */}
          <div className="booking-info-content">

            <span className="section-label">
              AGENDAMENTO
            </span>


            <h2>
              Escolha o serviço.
              <span> Nós cuidamos do resto.</span>
            </h2>


            <p>
              Depois de escolher o serviço, você poderá selecionar seu pet,
              consultar os horários disponíveis e escolher o melhor dia para
              realizar o atendimento.
            </p>


            {/* Etapas do agendamento */}
            <div className="booking-steps">


              {/* ETAPA 01 */}
              <div className="booking-step">

                <strong>01</strong>

                <div>

                  <h3>Escolha o serviço</h3>

                  <p>
                    Encontre o cuidado que seu pet precisa.
                  </p>

                </div>
              </div>


              {/* ETAPA 02 */}
              <div className="booking-step">

                <strong>02</strong>

                <div>

                  <h3>Escolha seu pet</h3>

                  <p>
                    Selecione um dos pets cadastrados.
                  </p>

                </div>
              </div>


              {/* ETAPA 03 */}
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


        {/* =================================================
            CTA
            ================================================= */}

        {/* CTA significa Call To Action.
            É uma seção criada para incentivar o usuário
            a realizar uma ação. */}
        <section className="services-cta">

          <div>

            <span>SEU PET MERECE</span>

            <h2>
              Pronto para cuidar melhor dele?
            </h2>

            <p>
              Crie sua conta e tenha acesso aos nossos serviços e agendamentos.
            </p>

          </div>


          {/* Link para a página de cadastro */}
          <a
            href="/registro"
            className="services-cta-button"
          >

            <span className="services-cta-text">
              Criar minha conta
            </span>

            <span className="services-cta-arrow">
              →
            </span>

          </a>

        </section>

      </main>


      {/* =================================================
          FOOTER
          ================================================= */}

      <footer>

        <div className="footer-content">


          {/* Informações da marca */}
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


          {/* Coluna institucional */}
          <div className="footer-column">

            <strong>PetCare</strong>

            <span>Cuidado</span>

            <span>Saúde</span>

            <span>Bem-estar</span>

          </div>

        </div>


        {/* Parte inferior do footer */}
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


// Exporta o componente para poder ser utilizado
// nas rotas ou em outros arquivos do sistema.
export default Servico;

