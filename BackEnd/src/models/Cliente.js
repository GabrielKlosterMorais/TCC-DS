// Importa o Mongoose, que permite trabalhar com o MongoDB
// dentro da aplicação Node.js.
import mongoose from 'mongoose';


// Cria o Model chamado "Cliente".

// Esse Model define quais informações um cliente pode
// possuir dentro do banco de dados.
const Cliente = mongoose.model('Cliente', {

    // Nome do cliente.
    // String significa que o valor será armazenado como texto.
    // required: true significa que é obrigatório informar o nome.
    nomeCliente: {
        type: String,
        required: true
    },


    // Telefone do cliente.
    // Também é armazenado como texto, pois um telefone pode
    // possuir símbolos como parênteses, espaços e hífen.
    telefone: {
        type: String,
        required: true
    },


    // E-mail utilizado pelo cliente.
    // É obrigatório para criar o cadastro.
    email: {
        type: String,
        required: true
    },


    // Endereço do cliente.
    // É obrigatório no cadastro.
    endereco: {
        type: String,
        required: true
    },


    // Senha utilizada pelo cliente para acessar sua conta.
    // O campo é obrigatório.
    senha: {
        type: String,
        required: true
    },


    // Indica se o cadastro do cliente está ativo.
    // Boolean permite armazenar true ou false.
    // Todo cliente começa ativo por padrão.
    ativo: {
        type: Boolean,
        default: true
    },


    // Define o tipo de usuário.
    // O usuário pode ser "cliente" ou "admin".
    // Caso nenhum tipo seja informado, será "cliente".
    tipo: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente'
    },


    // Guarda o endereço de uma imagem do cliente.
    // É opcional porque não possui required: true.
    img: {
        type: String
    }

});


// Exporta o Model Cliente para que ele possa ser utilizado
// em outros arquivos, como os Controllers.
export default Cliente;