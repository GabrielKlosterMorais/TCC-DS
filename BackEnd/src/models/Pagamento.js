import mongoose from 'mongoose';

const Pagamento = mongoose.model('Pagamento', {
    clienteId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true      },
    agendamentoId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Agendamento', required: true      },
    formaPagamento: {   type: String, required: true, enum: ['dinheiro', 'cartao', 'pix']      },
    status: {   type: String, required: true, enum: ['pendente', 'pago', 'cancelado']      },
    dataPagamento: {   type: Date, required: false      },
    valor: {   type: Number, required: true      },
    ativo: { type: Boolean, default: true }
});

export default Pagamento;