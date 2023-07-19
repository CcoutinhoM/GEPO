import { Schema, model, models } from "mongoose";

const FornecedoresSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nome: {type: String},
    apelido: {type: String},
    nomePublico: {type: String},
    descricao: {type: String},
    ocupacao: {type: String},
    experiencia: {type: String},
    educacaoPais: {type: String},
    grauAdquirido: {type: String},
    nomeInstituicao: {type: String},
    dataGraduacao: {type: String},
    certificadoPor: {type: String},
    dataCertificado: {type: String},
    telefone: {type: String},
})

const Fornecedores = models.Fornecedores || model("Fornecedores", FornecedoresSchema);

export default Fornecedores;