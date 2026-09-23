// Importa o Mongoose, que permite trabalhar com o MongoDB
// dentro da aplicação.
import mongoose from 'mongoose';


// Cria o Model "Pet".

// Esse Model define a estrutura dos dados dos pets
// cadastrados no sistema.
const Pet = mongoose.model('Pet', {

    // Nome do pet.
    // É armazenado como texto e é obrigatório.
    nome: {
        type: String,
        required: true
    },


    // Espécie do pet, como cachorro, gato, etc.
    // É armazenada como texto e é obrigatória.
    especie: {
        type: String,
        required: true
    },


    // Raça do pet.
    // É armazenada como texto e é obrigatória.
    raca: {
        type: String,
        required: true
    },


    // Idade do pet.
    // Number permite armazenar um valor numérico.
    // É obrigatório informar a idade.
    idade: {
        type: Number,
        required: true
    },


    // Sexo do pet.
    // É armazenado como texto e é obrigatório.
    sexo: {
        type: String,
        required: true
    },


    // Peso do pet.
    // Number permite armazenar valores numéricos,
    // incluindo valores decimais, como 35.5.
    peso: {
        type: Number,
        required: true
    },


    // Observações adicionais sobre o pet.
    // Não é obrigatório informar esse campo.
    observacoes: {
        type: String,
        required: false
    },


    // Identifica o cliente responsável pelo pet.
    // ObjectId é o tipo de identificador utilizado pelo MongoDB.
    // ref: 'Cliente' cria uma relação com o Model Cliente.
    // required: true significa que todo pet deve estar
    // relacionado a um cliente.
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },


    // Indica se o cadastro do pet está ativo.
    // Boolean permite armazenar true ou false.
    // Todo pet começa ativo por padrão.
    ativo: {
        type: Boolean,
        default: true
    },


    // Armazena a imagem do pet.
    // Como não possui required: true, o campo é opcional.
    img: {
        type: String
    }

});


// Exporta o Model Pet para que ele possa ser utilizado
// pelos Controllers e por outras partes da aplicação.
export default Pet;