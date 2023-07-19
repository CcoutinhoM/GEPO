"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Dropdown,
  Grid,
  Loading,
  Modal,
  Row,
  Text,
  useModal,
} from "@nextui-org/react"
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

function InfoPessoal() {
  const { data: session } = useSession()
  const router = useRouter()
  const [progress, setProgress] = React.useState(0)
  const [processando, setProcessando] = React.useState(false)
  const [nome, setNome] = React.useState("")
  const [apelido, setapelido] = React.useState("")
  const [nomePublico, setnomePublico] = React.useState("")
  const [descricao, setdescricao] = React.useState("")
  const [ocupacao, setocupacao] = React.useState("")
  const [experiencia, setexperiencia] = React.useState("")
  const [educacaoPais, seteducacaoPais] = React.useState("")
  const [grauAdquirido, setgrauAdquirido] = React.useState("")
  const [nomeInstituicao, setnomeInstituicao] = React.useState("")
  const [dataGraduacao, setdataGraduacao] = React.useState("")
  const [certificadoPor, setcertificadoPor] = React.useState("")
  const [dataCertificado, setdataCertificado] = React.useState("")
  const [telefone, settelefone] = React.useState("")

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(33.34), 100)
    return () => clearTimeout(timer)
  }, [])
  async function profissionalInfo() {
    setProcessando(true)
    try {
      const response = await fetch("api/fornecedores/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.id,
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
        }),
      })
    } catch (error) {
      console.log(error)
    } finally {
      setProcessando(false)
      router.push(`/profissionalInfo`)
    }
  }

  return (
    <div className="container mt-4 flex gap-4">
      <main className="flex-1">
        <div>
          <Progress value={progress} className="mb-2 w-full" />
          <Card className="w-full">
            <CardHeader>
              <CardTitle>1. Informação Pessoal</CardTitle>
              <CardDescription>
                Conte-nos um pouco sobre você. Essas informações aparecerão no
                seu perfil público, para que potenciais compradores possam
                conhecê-lo melhor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger className="w-[30%]">
                    Nome Completo
                  </HoverCardTrigger>
                  <HoverCardContent>Ex: Matias Cossa André.</HoverCardContent>
                </HoverCard>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  type="text"
                  placeholder="Nome"
                />
                <Input
                  value={apelido}
                  onChange={(e) => setapelido(e.target.value)}
                  type="text"
                  placeholder="Apelido"
                />
              </div>
              <br />
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger className="w-[50%]">
                    Nome Público
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Para ajudar na credibilidade dos seus serviços e manter uma
                    conecção autentica com os seus cleintes eles verão o seu
                    nome público.
                  </HoverCardContent>
                </HoverCard>
                <Input
                  value={nomePublico}
                  onChange={(e) => setnomePublico(e.target.value)}
                  type="text"
                  placeholder="Digite o Seu Nome Público"
                />
              </div>
              <br />
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger className="w-[50%]">
                    Descrição
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Compartilhe um pouco da sua experiência, melhores projetos
                    já feitos e a sua ára de experiencia.
                  </HoverCardContent>
                </HoverCard>
                <Textarea
                  value={descricao}
                  onChange={(e) => setdescricao(e.target.value)}
                  placeholder="Escrever texto da descrição pessoal."
                />
              </div>
              <br />
              <div className="flex flex-row justify-end rounded-full text-center">
                {processando && (
                  <div className="items-center justify-center">
                    <Grid.Container gap={2}>
                      <Grid>
                        <Loading color="primary"></Loading>
                      </Grid>
                    </Grid.Container>
                  </div>
                )}
                <Button onClick={profissionalInfo} variant="outline">
                  Proximo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default InfoPessoal
