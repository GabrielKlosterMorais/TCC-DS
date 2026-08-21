import mongoose from 'mongoose';

const Agendamento = mongoose.model('Agendamento', {
    petId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true      },
    servicoId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Servico', required: true      },
    data: {   type: Date, required: true      },
    hora: {   type: String, required: true      },
    status: {   type: String, required: true, enum: ['pendente', 'confirmado', 'cancelado']      },
    observacoes: {   type: String, required: false      }
});

export default Agendamento;