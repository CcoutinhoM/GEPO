import { Schema, model, models } from "mongoose";

const ServicosSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nomeSerico: {type: String},
    precoServico: {type: String},
    tempoMinimo: {type: String},
    tempoMaximo: {type: String},
    descricao: {type: String},
    imagem: {type: String},
    categoria: {type: String},
})

const Servicos = models.Servicos || model("Servicos", ServicosSchema);

export default Servicos;