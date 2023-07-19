import { connectToDB } from "../../../../utils/database";
import Fornecedores from "../../../../models/fornecedores";

export const POST = async (req, res) => {
    const { nome, apelido, nomePublico, descricao, telefone, dataCertificado, certificadoPor, dataGraduacao, nomeInstituicao, grauAdquirido, ocupacao, experiencia, educacaoPais, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Fornecedores({
            creator: userId,
            nome,
            apelido,
            nomePublico,
            descricao,
            ocupacao,
            experiencia,
            educacaoPais,
            grauAdquirido,
            nomeInstituicao,
            dataGraduacao,
            certificadoPor,
            dataCertificado,
            telefone,
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new servico", { status: 500 })
    }
}