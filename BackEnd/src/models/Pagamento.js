import mongoose from 'mongoose'

const Pagamento = mongoose.model('Pagamento', {

    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },

    agendamentoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agendamento',
        required: true
    },

    formaPagamento: {
        type: String,
        enum: [
            'dinheiro',
            'cartao',
            'pix'
        ],
        required: false
    },

    status: {
        type: String,
        enum: [
            'pendente',
            'pago',
            'cancelado'
        ],
        default: 'pendente',
        required: true
    },

    dataPagamento: {
        type: Date,
        required: false
    },

    valor: {
        type: Number,
        required: true
    },

    ativo: {
        type: Boolean,
        default: true
    }

})

export default Pagamento





