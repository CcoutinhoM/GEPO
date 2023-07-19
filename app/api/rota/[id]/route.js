import Fornecedores from "../../../../models/fornecedores";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Fornecedores.findById(params.id).populate("creator");
        if (!prompt) return new Response("Not found", {status: 404})
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const {nome, apelido, nomePublico, descricao, telefone, dataCertificado, certificadoPor, dataGraduacao, nomeInstituicao, ocupacao, grauAdquirido, experiencia, userId, educacaoPais} = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Fornecedores.findById(params.id);
        if (!existingPrompt) return new Response("Usuário não encontrado", {status: 404});

        existingPrompt.nome = nome;
        existingPrompt.apelido = apelido;
        existingPrompt.nomePublico = nomePublico;
        existingPrompt.descricao = descricao;
        existingPrompt.ocupacao = ocupacao;
        existingPrompt.experiencia = experiencia;
        existingPrompt.userId = userId;
        existingPrompt.grauAdquirido = grauAdquirido;
        existingPrompt.nomeInstituicao = nomeInstituicao;
        existingPrompt.dataGraduacao = dataGraduacao;
        existingPrompt.certificadoPor = certificadoPor;
        existingPrompt.dataCertificado = dataCertificado;
        existingPrompt.telefone = telefone;
        console.log('Fornecedor editado');
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Fornecedores.findByIdAndRemove(params.id)
        return new Response("Sucess", { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 