"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from 'next/navigation';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

 

function PerfilFornecedor({ params }) {
  const {data: session } = useSession();  
  const router = useRouter();
  const [dadosFornecedor, setDadosFornecedor] = React.useState([]);
  const [meusServicos, setMeusServicos] = React.useState([]);
  
  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/fornecedores/${params.id}`);
      const data = await response.json();
      setDadosFornecedor(data);
    }
    fetchPosts();
  }, [])

   React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/servicos/${params.id}`);
      const data = await response.json();
      setMeusServicos(data);
    }
    fetchPosts();
  }, [])


  function perfilInfo() {
    router.push('/infoPessoal');
  }
  return (
    <div className="container flex gap-4 mt-4">
      <aside>
        <Card className="w-[350px] mb-4">
          <CardHeader>
            <CardTitle className='text-center'>Dados da Conta</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {dadosFornecedor.length > 0 && dadosFornecedor.map((fornecedor) => (
                <>
                    <div className='flex flex-row text-center content-center justify-center rounded-full'>
                    <img className='rounded-full' width={100} height={100} src={fornecedor.creator.image} alt="Perfil Image" />              
                    </div>
                    <br />
                    <div className='text-center'>
                    <p>{fornecedor.creator.name}</p>
                    </div>
                    <div className='text-center'>
                    <p>{fornecedor.creator.email}</p>
                    </div>
                </>
            ))}
            
            
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button  variant="outline">Editar</Button>
          </CardFooter>
        </Card>
        { dadosFornecedor.length > 0 && (
          <>
            <Card className="w-[350px] mb-4">
              <CardHeader>
                <CardTitle className='text-center'>Infromação Pessoal</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                { dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>
                        Nome Completo: {fornecdor.nome} {fornecdor.apelido}
                      </p>
                      <br />
                      <p>
                        Nome Público: {fornecdor.nomePublico}
                      </p>
                    </div>
                  </>
                )) }
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button  variant="outline">Editar</Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px] mb-4">
              <CardHeader>
                <CardTitle className='text-center'>Serviço Prestado</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                { dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>
                        Nome do Serviço: {(fornecdor.ocupacao).toUpperCase()}
                      </p>
                      <br />
                      <p>
                        Experiência: {(fornecdor.experiencia).toUpperCase()}
                      </p>
                    </div>
                  </>
                )) }
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button  variant="outline">Editar</Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px] mb-4">
              <CardHeader>
                <CardTitle className='text-center'>Infromação Académica</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                { dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>
                        País de Formação: {fornecdor.educacaoPais}
                      </p>
                      <br />
                      <p>
                        Grau: {fornecdor.grauAdquirido}
                      </p>
                      <br />
                      <p>
                        Instituição: {fornecdor.nomeInstituicao}
                      </p>
                      <br />
                      <p>
                        Data: {fornecdor.dataGraduacao}
                      </p>
                    </div>
                  </>
                )) }
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button  variant="outline">Editar</Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px] mb-4">
              <CardHeader>
                <CardTitle className='text-center'>Certificado</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                { dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>
                        Instituição: {fornecdor.certificadoPor}
                      </p>
                      <br />
                      <p>
                        Data: {fornecdor.dataCertificado}
                      </p>
                    </div>
                  </>
                )) }
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button  variant="outline">Editar</Button>
              </CardFooter>
            </Card>
          </>
        ) }
        
      </aside>
      <main className="flex-1">
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className='text-center'></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              {dadosFornecedor.length > 0 ? (
                <>
                  <p className='text-lg text-center mb-4'>Meus Serviços</p>
                  <div className="justify-center grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
                {meusServicos.length > 0 && meusServicos.map((servicos) =>
                  <>
                    <Card className="w-[250px]">
                        <CardHeader>
                          <CardTitle>{servicos.nomeSerico}</CardTitle>
                          <CardDescription>
                            Categoria: {(servicos.categoria).toUpperCase()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='flex flex-row text-center content-center justify-center'>
                            <img className='rounded-md' width={60} height={60} src={servicos.imagem} alt="Perfil Image" />              
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button onClick={() => router.push(`/detalhesServico/${servicos._id}`)} variant="outline">Detalhes</Button>
                          Preço: {servicos.precoServico}
                        </CardFooter>
                    </Card>
                  </>
                  )}
                  <Card className="w-[250px]">
                    <CardHeader>
                      <CardTitle>Adicionar Novo Serviço</CardTitle>
                      <CardDescription>
                        Adicione serviços para que os seus clientes possam 
                        contactar-lhe...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => router.push('/novoServico')} variant="outline">Novo Serviço</Button>
                    </CardFooter>
                  </Card>
                </div>
                </>
                
              ) : (
                <>
                  <div className='text-center'>
                    <p>Gostaria de aumentar o seu público para vendas?</p>
                  </div>
                  <br />
                  <div className='flex flex-row text-center content-center justify-center rounded-full'>                
                    <Button onClick={perfilInfo} variant="outline">Tone-se um fornecedor</Button>
                  </div>
                </>
              )}
              
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default PerfilFornecedor