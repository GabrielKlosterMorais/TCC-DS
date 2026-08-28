import mongoose from 'mongoose';

const Cliente = mongoose.model('Cliente', {
    nomeCliente: {   type: String, required: true      },
    telefone: {   type: String, required: true      },
    email: {   type: String, required: true      },
    endereco: {   type: String, required: true      },
    senha: { type: String, required: true },
    ativo: { type: Boolean, default: true },
    tipo: {type: String, enum: ['cliente', 'admin'], default: 'cliente' }
});

export default Cliente;