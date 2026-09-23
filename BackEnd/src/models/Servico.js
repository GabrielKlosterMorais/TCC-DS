// Importa o Mongoose, que permite trabalhar com o MongoDB
// dentro da aplicação.
import mongoose from 'mongoose';


// Cria o Model "Servico".

// Esse Model define a estrutura dos serviços
// oferecidos pelo PetCare.
const Servico = mongoose.model('Servico', {

    // Nome do serviço.
    // É armazenado como texto e é obrigatório.
    nome: {
        type: String,
        required: true
    },


    // Descrição do serviço.
    // Armazena informações explicando o que o serviço oferece.
    // É um campo obrigatório.
    descricao: {
        type: String,
        required: true
    },


    // Preço do serviço.
    // Number permite armazenar valores numéricos,
    // incluindo valores decimais.
    // É obrigatório informar o preço.
    preco: {
        type: Number,
        required: true
    },


    // Duração do serviço em minutos.
    // É armazenada como um número.
    // É obrigatória para que o sistema saiba
    // quanto tempo o serviço irá ocupar no agendamento.
    duracao: {
        type: Number,
        required: true
    },


    // Indica se o serviço está disponível no sistema.
    // Boolean permite armazenar true ou false.
    // Todo serviço começa ativo por padrão.
    ativo: {
        type: Boolean,
        default: true
    },


    // Armazena a imagem do serviço.
    // Como não possui required: true, é um campo opcional.
    img: {
        type: String
    }

});


// Exporta o Model Servico para que ele possa ser utilizado
// pelos Controllers e por outras partes da aplicação.
export default Servico;