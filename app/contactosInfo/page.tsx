"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Dropdown, Text, Row, Modal, useModal, Grid, Loading } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
import { Progress } from "@/components/ui/progress"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter, usePathname } from 'next/navigation';
const frameworks = [
    {
      value: "marketing",
      label: "Marketing",
    },
    {
      value: "design",
      label: "Design",
    },
    {
      value: "escritor",
      label: "Escritor",
    },
    {
      value: "programador",
      label: "Programador",
    },
    {
      value: "música",
      label: "Música",
    },
    {
        value: "animação",
        label: "Animação",
    },
    {
        value: "fotógrafo",
        label: "Fotógrafo",
    },
  ]

  const experiencias = [
    {
      value: "iniciante",
      label: "Iniciante",
    },
    {
      value: "intermediario",
      label: "Intermediario",
    },
    {
      value: "profissional",
      label: "Profissional",
    },
  ]

function ContactosInfo() {
  const {data: session } = useSession();
  const router = useRouter();
  const [progress, setProgress] = React.useState(66.68)
  const [open, setOpen] = React.useState(false)
  const [openExperiencia, setOpenExperiencia] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [valueExperiencia, setValueExperiencia] = React.useState("")
  const [telefone, settelefone] = React.useState(''); 
  const [processando, setProcessando] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 100)
    return () => clearTimeout(timer)
  }, [])

  function contactoInfo() {
    setProcessando(true);
    const fetchPosts = async () => {
      const response = await fetch(`/api/servicosTodos/${session?.user?.id}/servicos`);
      const data = await response.json();
      data.map((fonecedor) => {
        try {
          async function jfasda() {
            const response2 = await fetch(`api/rota/${fonecedor._id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                userId: session?.user?.id,
                nome: fonecedor.nome,
                apelido: fonecedor.apelido,
                nomePublico: fonecedor.nomePublico,
                descricao: fonecedor.descricao,
                ocupacao: value,
                experiencia: valueExperiencia,
                educacaoPais: fonecedor.educacaoPais,
                grauAdquirido: fonecedor.grauAdquirido,
                nomeInstituicao: fonecedor.nomeInstituicao,
                dataGraduacao: fonecedor.dataGraduacao,
                certificadoPor: fonecedor.certificadoPor,
                dataCertificado: fonecedor.dataCertificado,
                telefone,
              })
          })
          if (response2.ok) {
            console.log(response2);
        }
          }
          jfasda();
      } catch (error) {
          console.log(error);
        }finally {
          setProcessando(false);
          router.push('/perfil');
        }
      });      
    }
    if(session?.user?.id) fetchPosts();   
  }
  function profissionalInfo() {
    router.push('/profissionalInfo');
  }
  return (
    <div className="container flex gap-4 mt-4">
      <main className="flex-1">
        <div>
            <Progress value={progress} className="w-full mb-2" />
            <Card className="w-full">
                <CardHeader>
                <CardTitle>3. Informação de Contacto</CardTitle>
                <CardDescription>
                    Adicione os seus contactos pessoais
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className='flex flex-row gap-4'>
                    <HoverCard>
                        <HoverCardTrigger className='w-[40%]'>E-mail</HoverCardTrigger>
                        <HoverCardContent>
                        </HoverCardContent>
                    </HoverCard>
                    <p>{session?.user?.email}</p>
                </div>
                <br />
                <div className='flex flex-row gap-4'>
                    <HoverCard>
                        <HoverCardTrigger className='w-[40%]'>Telefone</HoverCardTrigger>
                        <HoverCardContent>
                        </HoverCardContent>
                    </HoverCard>
                    <Input 
                      value={telefone}
                      onChange={(e) => settelefone(e.target.value)}
                      type="number" 
                      placeholder="Digite o número de telefone" />
                </div>
                <br />
                <div className='flex flex-row text-center justify-end rounded-full'> 
                {processando && (
                        <div className='justify-center items-center'>
                        <Grid.Container gap={2}>
                            <Grid>
                                <Loading color="primary"></Loading>
                            </Grid>
                        </Grid.Container>
                    </div> 
                    )}            
                    <Button onClick={contactoInfo} variant="outline">Finalizar</Button>
                </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}

export default ContactosInfo