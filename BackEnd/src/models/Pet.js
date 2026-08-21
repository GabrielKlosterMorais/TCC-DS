import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    nome: {   type: String, required: true      },
    especie: {   type: String, required: true      },
    raca: {   type: String, required: true      },
    idade: {   type: Number, required: true      },
    sexo: {   type: String, required: true      },
    peso: {   type: Number, required: true      },
    observacoes: {   type: String, required: false      },
    clienteId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true    }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;