import mongoose from 'mongoose';

const servicoSchema = new mongoose.Schema({

    nome: { type: String,required: true },
    descricao: {  type: String, required: true },
    preco: { type: Number, required: true },
    duracao: { type: Number, required: true },
    ativo: { type: Boolean, default: true }
});

const Servico = mongoose.model('Servico', servicoSchema);

export default Servico;