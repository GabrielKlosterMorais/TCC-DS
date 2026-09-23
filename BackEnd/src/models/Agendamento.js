// Importa o Mongoose, que é a biblioteca utilizada para
// fazer a comunicação entre o Node.js e o MongoDB.
import mongoose from 'mongoose';


// Cria o Model chamado "Agendamento".

// O primeiro argumento é o nome do Model no MongoDB.
// O segundo argumento define a estrutura dos dados
// que um agendamento pode possuir.
const Agendamento = mongoose.model('Agendamento', {

    // Guarda o ID do pet que possui o agendamento.
    // ObjectId é o tipo de identificador utilizado pelo MongoDB.
    // ref: 'Pet' indica que esse ID está relacionado ao Model Pet.
    // required: true significa que esse campo é obrigatório.
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },


    // Guarda o ID do serviço que será realizado.
    // O campo também utiliza ObjectId porque está relacionado
    // a outro documento do banco de dados.
    // ref: 'Servico' indica que o ID pertence ao Model Servico.
    // required: true significa que o serviço é obrigatório.
    servicoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico',
        required: true
    },


    // Guarda a data em que o agendamento será realizado.
    // O tipo Date permite armazenar uma data no MongoDB.
    // required: true significa que a data é obrigatória.
    data: {
        type: Date,
        required: true
    },


    // Guarda o horário do agendamento.
    // Está como String porque o sistema armazena o horário
    // em formato de texto, por exemplo: "14:30".
    hora: {
        type: String,
        required: true
    },


    // Guarda a situação atual do agendamento.
    // O enum limita os valores que podem ser armazenados.
    // O agendamento só pode ser:
    // "pendente", "confirmado" ou "cancelado".
    status: {
        type: String,
        required: true,
        enum: [
            'confirmado',
            'cancelado'
        ]
    },


    // Guarda uma observação opcional sobre o agendamento.
    // required: false significa que o campo não é obrigatório.
    observacoes: {
        type: String,
        required: false
    },


    // Guarda o motivo informado quando um agendamento é cancelado.
    // Também é um campo opcional.
    // Caso nenhum motivo seja informado, o valor padrão será
    // uma string vazia.
    motivoCancelamento: {
        type: String,
        required: false,
        default: ''
    },


    // Indica se o agendamento está ativo no sistema.
    // Boolean permite trabalhar com true ou false.
    // Por padrão, um novo agendamento começa como ativo.
    ativo: {
        type: Boolean,
        default: true
    }

});


// Exporta o Model Agendamento para que ele possa ser
// utilizado em outros arquivos, como o Controller.
export default Agendamento;