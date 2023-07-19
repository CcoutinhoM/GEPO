import { connectToDB } from "../../../../utils/database";
import Servicos from "../../../../models/servicos";

export const POST = async (req, res) => {
    const { nomeSerico, precoServico, tempoMinimo, tempoMaximo, descricao, imagem, categoria, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Servicos({
            creator: userId,
            nomeSerico,
            precoServico,
            tempoMinimo,
            tempoMaximo,
            descricao,
            imagem,
            categoria,
        });
 
        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new servico", { status: 500 })
    }
}