import Servico from '../models/Servico.js';


// Classe responsável pelas operações relacionadas
// aos serviços do PetCare.
class ServicoController {


    // Cria um novo serviço.
    static async create(req, res) {

        try {

            // Recebe os dados enviados no corpo
            // da requisição.
            const {
                nome,
                descricao,
                preco,
                duracao,
                img
            } = req.body;


            // Verifica se os campos obrigatórios
            // foram preenchidos.
            if (!nome || !descricao || !preco || !duracao) {

                // Retorna o status 400 quando existem
                // dados obrigatórios faltando.
                return res.status(400).json({
                    message: 'Dados inválidos. Envie nome, descrição, preço e duração.'
                });
            }


            // Cria o serviço no banco de dados.
            const servico = await Servico.create({
                nome,
                descricao,
                preco,
                duracao,
                img
            });


            // Retorna o serviço criado.
            // O status 201 indica que um novo registro
            // foi criado.
            res.status(201).json({
                message: 'Serviço criado com sucesso',
                data: servico
            });


        } catch (error) {

            // Trata erros que acontecerem durante
            // a criação do serviço.
            res.status(500).json({
                message: 'Erro ao criar serviço',
                error: error.message
            });
        }
    }


    // Busca todos os serviços ativos.
    static async getAll(req, res) {

        try {

            // Procura no banco somente os serviços
            // que possuem ativo como true.
            const servicos = await Servico.find({
                ativo: true
            });


            // Retorna a lista de serviços encontrados.
            res.status(200).json({
                data: servicos
            });


        } catch (error) {

            // Trata erros durante a busca dos serviços.
            res.status(500).json({
                message: 'Erro ao encontrar serviços',
                error: error.message
            });
        }
    }


    // Busca um serviço específico pelo ID.
    static async getById(req, res) {

        try {

            // Procura o serviço utilizando o ID recebido
            // através dos parâmetros da URL.
            // Também verifica se ele está ativo.
            const servico = await Servico.findOne({
                _id: req.params.id,
                ativo: true
            });


            // Caso o serviço não seja encontrado,
            // retorna o status 404.
            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }


            // Retorna os dados do serviço encontrado.
            res.status(200).json({
                data: servico
            });


        } catch (error) {

            // Trata erros durante a busca.
            res.status(500).json({
                message: 'Erro ao encontrar serviço',
                error: error.message
            });
        }
    }


    // Atualiza os dados de um serviço existente.
    static async update(req, res) {

        try {

            // Recebe os novos dados enviados
            // na requisição.
            const {
                nome,
                descricao,
                preco,
                duracao,
                img
            } = req.body;


            // Procura o serviço pelo ID e atualiza
            // suas informações.
            const servico = await Servico.findOneAndUpdate(
                {
                    _id: req.params.id,
                    ativo: true
                },
                {
                    nome,
                    descricao,
                    preco,
                    duracao,
                    img
                },

                // new: true faz com que o resultado retornado
                // seja o serviço já atualizado.
                { new: true }
            );


            // Caso o serviço não seja encontrado,
            // retorna o status 404.
            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }


            // Retorna o serviço depois da atualização.
            res.status(200).json({
                message: 'Serviço atualizado com sucesso',
                data: servico
            });


        } catch (error) {

            // Trata erros durante a atualização.
            res.status(500).json({
                message: 'Erro ao atualizar serviço',
                error: error.message
            });
        }
    }


    // Desativa um serviço.
    static async delete(req, res) {

        try {

            // Procura o serviço pelo ID e verifica
            // se ele está ativo.
            const servico = await Servico.findOneAndUpdate(
                {
                    _id: req.params.id,
                    ativo: true
                },

                // Em vez de apagar o serviço definitivamente,
                // altera o campo ativo para false.
                {
                    ativo: false
                },

                // Retorna o serviço depois da alteração.
                {
                    new: true
                }
            );


            // Caso o serviço não seja encontrado,
            // retorna o status 404.
            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }


            // Informa que o serviço foi desativado
            // com sucesso.
            res.status(200).json({
                message: 'Serviço desativado com sucesso'
            });


        } catch (error) {

            // Trata erros durante a desativação.
            res.status(500).json({
                message: 'Erro ao desativar serviço',
                error: error.message
            });
        }
    }
}


// Exporta o Controller para que ele possa
// ser utilizado pelas rotas.
export default ServicoController;