"use client"

import React from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
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

function LayOut() {
  const { data: session } = useSession()
  const router = useRouter()
  const [dadosFornecedor, setDadosFornecedor] = React.useState([])
  const [meusServicos, setMeusServicos] = React.useState([])

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/servicosTodos/${session?.user.id}/servicos`
      )
      const data = await response.json()
      setDadosFornecedor(data)
    }
    if (session?.user.id) fetchPosts()
  }, [session?.user.id])

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/servicos/${session?.user.id}`)
      const data = await response.json()
      setMeusServicos(data)
    }
    if (session?.user.id) fetchPosts()
  }, [session?.user.id])

  function perfilInfo() {
    router.push("/infoPessoal")
  }
  return (
    <div className="container mt-4 flex gap-4">
      <aside>
        <Card className="mb-4 w-[350px] gap-4">
          <CardHeader>
            <CardTitle className="text-center">Dados da Conta</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {dadosFornecedor.length > 0 &&
              dadosFornecedor.map((autor) => (
                <>
                  <div
                    key={autor["creator"]["_id"]}
                    className="flex flex-row content-center justify-center rounded-full text-center"
                  >
                    <Image
                      className="rounded-full"
                      width={100}
                      height={100}
                      src={autor["creator"]["image"]}
                      alt="Perfil Image"
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <p>{autor["creator"]["username"]}</p>
                  </div>
                  <div className="text-center">
                    <p>{autor["creator"]["email"]}</p>
                  </div>
                </>
              ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button variant="outline">Editar</Button>
          </CardFooter>
        </Card>
        {dadosFornecedor.length > 0 && (
          <>
            <Card className="mb-4 w-[350px]">
              <CardHeader>
                <CardTitle className="text-center">
                  Infromação Pessoal
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                {dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>
                        Nome Completo: {fornecdor["nome"]}{" "}
                        {fornecdor["apelido"]}
                      </p>
                      <br />
                      <p>Nome Público: {fornecdor["nomePublico"]}</p>
                    </div>
                  </>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button variant="outline">Editar</Button>
              </CardFooter>
            </Card>
            <Card className="mb-4 w-[350px]">
              <CardHeader>
                <CardTitle className="text-center">Serviço Prestado</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                {dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>Nome do Serviço: {fornecdor["ocupacao"]}</p>
                      <br />
                      <p>Experiência: {fornecdor["experiencia"]}</p>
                    </div>
                  </>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button variant="outline">Editar</Button>
              </CardFooter>
            </Card>
            <Card className="mb-4 w-[350px]">
              <CardHeader>
                <CardTitle className="text-center">
                  Infromação Académica
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                {dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>País de Formação: {fornecdor["educacaoPais"]}</p>
                      <br />
                      <p>Grau: {fornecdor["grauAdquirido"]}</p>
                      <br />
                      <p>Instituição: {fornecdor["nomeInstituicao"]}</p>
                      <br />
                      <p>Data: {fornecdor["dataGraduacao"]}</p>
                    </div>
                  </>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button variant="outline">Editar</Button>
              </CardFooter>
            </Card>
            <Card className="mb-4 w-[350px]">
              <CardHeader>
                <CardTitle className="text-center">Certificado</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                {dadosFornecedor.map((fornecdor) => (
                  <>
                    <div>
                      <p>Instituição: {fornecdor["certificadoPor"]}</p>
                      <br />
                      <p>Data: {fornecdor["dataCertificado"]}</p>
                    </div>
                  </>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button variant="outline">Editar</Button>
              </CardFooter>
            </Card>
          </>
        )}
      </aside>
      <main className="flex-1">
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center"></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              {dadosFornecedor.length > 0 ? (
                <>
                  <p className="mb-4 text-center text-lg">Meus Serviços</p>
                  <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {meusServicos.length > 0 &&
                      meusServicos.map((servicos) => (
                        <>
                          <Card className="w-[250px]">
                            <CardHeader>
                              <CardTitle>{servicos["nomeSerico"]}</CardTitle>
                              <CardDescription>
                                Categoria: {servicos["categoria"]}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-row content-center justify-center text-center">
                                <Image
                                  className="rounded-md"
                                  width={60}
                                  height={60}
                                  src={servicos["imagem"]}
                                  alt="Perfil Image"
                                />
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button
                                onClick={() =>
                                  router.push(
                                    `/detalhesServico/${servicos["_id"]}`
                                  )
                                }
                                variant="outline"
                              >
                                Detalhes
                              </Button>
                              Preço: {servicos["precoServico"]}
                            </CardFooter>
                          </Card>
                        </>
                      ))}
                    <Card className="w-[250px]">
                      <CardHeader>
                        <CardTitle>Adicionar Novo Serviço</CardTitle>
                        <CardDescription>
                          Adicione serviços para que os seus clientes possam
                          contactar-lhe...
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter className="flex justify-end">
                        <Button
                          onClick={() => router.push("/novoServico")}
                          variant="outline"
                        >
                          Novo Serviço
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <p>Gostaria de aumentar o seu público para vendas?</p>
                  </div>
                  <br />
                  <div className="flex flex-row content-center justify-center rounded-full text-center">
                    <Button onClick={perfilInfo} variant="outline">
                      Tone-se um fornecedor
                    </Button>
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

export default LayOut
