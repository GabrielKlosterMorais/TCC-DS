import mongoose from "mongoose";
// Importa o Mongoose, que permite conectar o Node.js
// ao MongoDB e trabalhar com os Models.


import dotenv from "dotenv";
// Importa o dotenv, responsável por carregar
// as variáveis de ambiente armazenadas no arquivo .env.


import path from "path";
// Importa o módulo path do Node.js.
// Ele ajuda a trabalhar com caminhos de arquivos e pastas.


import { fileURLToPath } from "url";
// Importa uma função que transforma a URL do arquivo
// atual em um caminho de arquivo do Windows/Linux.


// Descobre o caminho completo deste arquivo (connection.js).
const __filename = fileURLToPath(import.meta.url);


// Descobre a pasta onde este arquivo está localizado.
const __dirname = path.dirname(__filename);


// Carrega o arquivo .env localizado na pasta anterior.
// Dentro dele está a variável MONGODB_URI,
// que contém a conexão com o banco de dados.
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});


// Função responsável por conectar o backend
// ao banco de dados MongoDB.
async function connectDatabase() {

    try {

        // Tenta estabelecer uma conexão com o MongoDB
        // utilizando a URL armazenada na variável de ambiente.
        await mongoose.connect(process.env.MONGODB_URI);


        // Mostra uma mensagem no terminal quando
        // a conexão foi realizada com sucesso.
        console.log("Banco de dados conectado com sucesso!");


    } catch (error) {

        // Caso aconteça algum erro na conexão,
        // mostra o erro no terminal.
        console.error("Erro ao conectar ao banco:", error);


        // Encerra a execução do servidor porque,
        // sem o banco de dados, a aplicação não consegue funcionar corretamente.
        process.exit(1);
    }
}


// Exporta a função para que ela possa ser utilizada
// no arquivo responsável por iniciar o servidor.
export default connectDatabase;