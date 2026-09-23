// Importa os hooks useEffect e useState do React
// useState: usado para criar e controlar estados do componente
// useEffect: usado para executar ações quando o componente é carregado ou atualizado
import { useEffect, useState } from "react";

// Importa o arquivo CSS responsável pela aparência desta página
import "./styles.css";

// Importa a Navbar utilizada nas páginas que o usuário já está logado
import LogNavbar from "../../../components/logNavBar";


// Interface que define o formato de um serviço
// Ela ajuda o TypeScript a saber quais informações cada serviço possui
interface Service {
  _id: string;       // ID do serviço no MongoDB
  nome: string;      // Nome do serviço
  descricao: string; // Descrição do serviço
  preco: number;     // Preço do serviço
  duracao: number;   // Duração em minutos
  img: string;       // URL da imagem do serviço
}


// Componente principal da página de serviços
function LogServico() {

  // Cria o estado "services"
  // Ele começa como um array vazio
  // setServices é a função usada para alterar esse estado
  const [services, setServices] = useState<Service[]>([]);

  // Estado responsável por saber se os serviços ainda estão sendo carregados
  // Começa como true porque, inicialmente, ainda estamos buscando os dados
  const [loading, setLoading] = useState(true);


  // useEffect executa uma ação depois que o componente é renderizado
  //
  // O [] no final significa que esse efeito será executado apenas uma vez,
  // quando a página for carregada
  useEffect(() => {

    // Função assíncrona responsável por buscar os serviços
    const carregarServicos = async () => {

      try {

        // fetch faz uma requisição HTTP para o backend
        //
        // Aqui estamos fazendo uma requisição GET para:
        // http://localhost:3001/Servico
        const res = await fetch(
          "http://localhost:3001/Servico"
        );


        // res.ok verifica se a requisição HTTP foi bem-sucedida
        //
        // Se o backend retornar um erro, como 404 ou 500,
        // res.ok será false
        if (!res.ok) {
          throw new Error("Erro ao buscar serviços");
        }


        // res.json() transforma a resposta do backend
        // em um objeto JavaScript
        const data = await res.json();


        // Guarda os serviços recebidos no estado
        //
        // data.data provavelmente é o array enviado pelo backend
        //
        // O || [] significa:
        // se data.data não existir, usa um array vazio
        setServices(data.data || []);

      } catch (error) {

        // Caso aconteça algum erro durante a requisição,
        // ele será mostrado no console do navegador
        console.error(
          "Erro ao carregar serviços:",
          error
        );

      } finally {

        // finally sempre é executado no final
        // independentemente de ter dado certo ou errado
        //
        // Aqui informamos que o carregamento terminou
        setLoading(false);
      }
    };


    // Executa a função que busca os serviços
    carregarServicos();

  }, []);


  // Função responsável por formatar o preço
  // para o padrão de moeda brasileira
  const formatarPreco = (preco: number) => {

    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };


  // Função responsável por transformar a duração,
  // que está em minutos, em um formato mais fácil de ler
  const formatarDuracao = (duracao: number) => {

    // Se a duração for maior ou igual a 60 minutos
    if (duracao >= 60) {

      // Math.floor pega somente a parte inteira
      //
      // Exemplo:
      // 90 / 60 = 1.5
      // Math.floor(1.5) = 1
      const horas = Math.floor(duracao / 60);

      // Calcula quantos minutos sobram depois das horas
      //
      // Exemplo:
      // 90 % 60 = 30
      const minutos = duracao % 60;


      // Se não houver minutos restantes,
      // mostra somente a quantidade de horas
      if (minutos === 0) {
        return `${horas}h`;
      }


      // Caso existam horas e minutos,
      // mostra os dois
      //
      // Exemplo:
      // 90 minutos -> "1h 30min"
      return `${horas}h ${minutos}min`;
    }


    // Caso a duração seja menor que 60 minutos,
    // mostra somente os minutos
    //
    // Exemplo:
    // 30 -> "30min"
    return `${duracao}min`;
  };


  // O return representa o JSX do componente
  //
  // JSX é uma sintaxe parecida com HTML,
  // utilizada dentro do React para criar a interface da página
  return (

    // Container principal da página
    <div className="services-page">

      {/* Navbar do usuário logado */}
      <LogNavbar />


      {/* Conteúdo principal da página */}
      <main>


        {/* ================================
            SEÇÃO HERO
            ================================ */}

        <section className="services-hero">

          <div className="services-hero-content">

            {/* Pequeno título da seção */}
            <span className="section-label">
              NOSSOS SERVIÇOS
            </span>


            {/* Título principal */}
            <h2>
              Cuidados pensados para

              {/* O span permite destacar uma parte do título */}
              <span>
                seu melhor amigo.
              </span>
            </h2>


            {/* Texto explicativo da página */}
            <p>
              Encontre o serviço ideal para seu pet e cuide da saúde,
              higiene e bem-estar dele de forma simples e prática.
            </p>

          </div>

        </section>



        {/* ================================
            SEÇÃO DE SERVIÇOS
            ================================ */}

        <section className="services-section">

          {/* Cabeçalho da seção */}
          <div className="services-header">

            <div>

              <span className="section-label">
                ESCOLHA UM SERVIÇO
              </span>

              <h2>
                O que seu pet precisa?
              </h2>

            </div>


            {/* Explicação para o usuário */}
            <p>
              Escolha uma opção abaixo para conhecer mais detalhes
              e realizar seu agendamento.
            </p>

          </div>


          {/* ================================
              ESTADO DE CARREGAMENTO
              ================================

              Aqui temos renderização condicional.

              Se loading for true:
              mostra "Carregando serviços..."

              Se loading for false e services estiver vazio:
              mostra "Nenhum serviço..."

              Caso contrário:
              mostra os cards dos serviços.
          */}

          {loading ? (

            // Enquanto o fetch está buscando os dados
            <div className="services-message">
              <p>
                Carregando serviços...
              </p>
            </div>


          ) : services.length === 0 ? (

            // Se terminou de carregar, mas não existem serviços
            <div className="services-message">
              <p>
                Nenhum serviço disponível no momento.
              </p>
            </div>


          ) : (

            // Se existem serviços, mostra a grade de cards
            <div className="services-grid">


              {/* map percorre o array de serviços
                  e cria um card para cada serviço */}

              {services.map((service) => (

                // article representa o card de um serviço
                <article
                  className="service-card"

                  // key identifica cada elemento da lista
                  // e ajuda o React a controlar os elementos
                  key={service._id}
                >


                  {/* ================================
                      IMAGEM DO SERVIÇO
                      ================================ */}

                  <div className="service-image">

                    <img

                      // Se service.img existir,
                      // utiliza a imagem cadastrada no banco

                      // Se não existir,
                      // utiliza uma imagem padrão
                      src={
                        service.img ||
                        "https://cdn-icons-png.flaticon.com/512/616/616408.png"
                      }

                      // Texto alternativo da imagem
                      // importante para acessibilidade
                      alt={service.nome}


                      // onError é executado caso a imagem não carregue
                      onError={(e) => {

                        // Troca a imagem quebrada por uma imagem padrão
                        e.currentTarget.src =
                          "https://cdn-icons-png.flaticon.com/512/616/616408.png";
                      }}
                    />


                    {/* Categoria do serviço */}
                    <span className="service-category">
                      SERVIÇO
                    </span>

                  </div>



                  {/* ================================
                      INFORMAÇÕES DO SERVIÇO
                      ================================ */}

                  <div className="service-content">

                    {/* Nome do serviço vindo do backend */}
                    <h3>
                      {service.nome}
                    </h3>


                    {/* Descrição do serviço */}
                    <p>
                      {service.descricao}
                    </p>


                    {/* Informações de duração e preço */}
                    <div className="service-info">


                      {/* Duração */}
                      <div className="service-duration">

                        <span>
                          DURAÇÃO
                        </span>

                        <strong>
                          {formatarDuracao(service.duracao)}
                        </strong>

                      </div>


                      {/* Preço */}
                      <div className="service-price">

                        <span>
                          A PARTIR DE
                        </span>

                        <strong>
                          {formatarPreco(service.preco)}
                        </strong>

                      </div>

                    </div>


                    {/* Botão para realizar o agendamento */}
                    <a
                      href="/agendamentos"
                      className="service-button"
                    >
                      Agendar serviço

                      <span>
                        →
                      </span>

                    </a>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>



        {/* ================================
            SEÇÃO DE EXPLICAÇÃO DO AGENDAMENTO
            ================================ */}

        <section className="booking-info">


          {/* Imagem da seção */}
          <div className="booking-info-image">

            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Cães juntos"
            />

          </div>


          {/* Texto da seção */}
          <div className="booking-info-content">

            <span className="section-label">
              AGENDAMENTO
            </span>


            <h2>
              Escolha o serviço.

              <span>
                Nós cuidamos do resto.
              </span>
            </h2>


            <p>
              Depois de escolher o serviço, você poderá selecionar
              seu pet, consultar os horários disponíveis e escolher
              o melhor dia para realizar o atendimento.
            </p>


            {/* Etapas do agendamento */}
            <div className="booking-steps">


              {/* ETAPA 01 */}
              <div className="booking-step">

                <strong>
                  01
                </strong>

                <div>

                  <h3>
                    Escolha o serviço
                  </h3>

                  <p>
                    Encontre o cuidado que seu pet precisa.
                  </p>

                </div>

              </div>


              {/* ETAPA 02 */}
              <div className="booking-step">

                <strong>
                  02
                </strong>

                <div>

                  <h3>
                    Escolha seu pet
                  </h3>

                  <p>
                    Selecione um dos pets cadastrados.
                  </p>

                </div>

              </div>


              {/* ETAPA 03 */}
              <div className="booking-step">

                <strong>
                  03
                </strong>

                <div>

                  <h3>
                    Escolha o horário
                  </h3>

                  <p>
                    Veja os horários disponíveis e confirme.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ================================
            CTA - CHAMADA PARA AGENDAMENTO
            ================================ */}

        <section className="services-cta">

          <div>

            <span>
              SEU PET MERECE
            </span>

            <h2>
              Pronto para cuidar melhor dele?
            </h2>

            <p>
              Escolha um serviço e faça seu agendamento.
            </p>

          </div>


          {/* Link para a página de agendamento */}
          <a
            href="/agendamentos"
            className="services-cta-button"
          >

            <span className="services-cta-text">
              Agendar agora
            </span>

            <span className="services-cta-arrow">
              →
            </span>

          </a>

        </section>

      </main>



      {/* ================================
          FOOTER
          ================================ */}

      <footer>

        <div className="footer-content">


          {/* ================================
              MARCA / LOGO
              ================================ */}

          <div className="footer-brand">

            <a
              href="/loghome"
              className="logo footer-logo"
            >

              {/* Ícone da logo */}
              <div className="logo-icon">
                P
              </div>


              {/* Nome da empresa */}
              <h1>
                PetCare
              </h1>

            </a>


            {/* Frase da empresa */}
            <p>
              Cuidando de quem faz parte da família.
            </p>

          </div>



          {/* ================================
              NAVEGAÇÃO
              ================================ */}

          <div className="footer-column">

            <strong>
              Navegação
            </strong>

            <a href="/loghome">
              Início
            </a>

            <a href="/servicos">
              Serviços
            </a>

            <a href="/sobre">
              Sobre nós
            </a>

          </div>



          {/* ================================
              CONTA DO USUÁRIO
              ================================ */}

          <div className="footer-column">

            <strong>
              Minha conta
            </strong>

            <a href="/pets">
              Meus pets
            </a>

            <a href="/agendamentos">
              Agendamentos
            </a>

            <a href="/pagamento">
              Pagamentos
            </a>

          </div>



          {/* ================================
              INFORMAÇÕES DO PETCARE
              ================================ */}

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


        {/* ================================
            PARTE INFERIOR DO FOOTER
            ================================ */}

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


// Exporta o componente para que ele possa
// ser utilizado nas rotas ou em outros arquivos
export default LogServico;