"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
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
import { Dropdown, Text, Row, Modal, useModal, Grid, Loading } from "@nextui-org/react";
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

function ProfissionalInfo() {
  let idUser = "";
  const {data: session } = useSession();
  const router = useRouter();
  const [progress, setProgress] = React.useState(33.34)
  const [open, setOpen] = React.useState(false)
  const [userID, setUserID] = React.useState('')
  const [openExperiencia, setOpenExperiencia] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [valueExperiencia, setValueExperiencia] = React.useState("")
  const [processando, setProcessando] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const [apelido, setapelido] = React.useState('');
  const [nomePublico, setnomePublico] = React.useState('');
  const [descricao, setdescricao] = React.useState('');
  const [ocupacao, setocupacao] = React.useState('');
  const [experiencia, setexperiencia] = React.useState('');
  const [educacaoPais, seteducacaoPais] = React.useState('');
  const [grauAdquirido, setgrauAdquirido] = React.useState('');
  const [nomeInstituicao, setnomeInstituicao] = React.useState('');
  const [dataGraduacao, setdataGraduacao] = React.useState('');
  const [certificadoPor, setcertificadoPor] = React.useState('');
  const [dataCertificado, setdataCertificado] = React.useState('');
  const [telefone, settelefone] = React.useState(''); 

  React.useEffect(() => {    
    const timer = setTimeout(() => setProgress(66.68), 100);
    return () => clearTimeout(timer)
  }, [])

  function perfilInfo() {
    // router.push('/infoPessoal');
  }
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
                educacaoPais,
                grauAdquirido,
                nomeInstituicao,
                dataGraduacao,
                certificadoPor,
                dataCertificado,
                telefone: fonecedor.nomePublico,
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
          router.push('/contactosInfo');
        }
      });      
    }
    if(session?.user?.id) fetchPosts();
    editPadrinho();    
  }
  async function editPadrinho() {    
    
  }

  return (
    <div className="container flex gap-4 mt-4">
      <main className="flex-1">
        <div>
            <Progress value={progress} className="w-full mb-2" />
            <Card className="w-full">
                <CardHeader>
                <CardTitle>2. Informação Profissional</CardTitle>
                <CardDescription>
                    Este é o seu momento de brilhar. Deixe os potenciais compradores 
                    saberem no que você é especialista e como adquiriu suas habilidades, 
                    certificações e experiência.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className='flex flex-row gap-4'>
                    <HoverCard>
                        <HoverCardTrigger className='w-[40%]'>Sua ocupação</HoverCardTrigger>
                        <HoverCardContent>
                        Sua ocupação profissional é a atividade ou trabalho que você exerce como meio de sustento e carreira.
                        </HoverCardContent>
                    </HoverCard>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                            >
                            {value
                                ? frameworks.find((framework) => framework.value === value)?.label
                                : "Seleccione a sua ocupação"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Procurar ocupação" />
                                <CommandEmpty>Ocupação não encontrada</CommandEmpty>
                                <CommandGroup>
                                    {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        onSelect={(currentValue) => {
                                            console.log(currentValue)
                                        setValue(currentValue)
                                        setOpen(false)
                                        }}
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-2",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <br />
                <div className='flex flex-row gap-4'>
                    <HoverCard>
                        <HoverCardTrigger className='w-[40%]'>Experiência</HoverCardTrigger>
                        <HoverCardContent>
                            Que experiência que tens na ocupação selecionada...
                        </HoverCardContent>
                    </HoverCard>
                    <Popover open={openExperiencia} onOpenChange={setOpenExperiencia}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                            >
                            {valueExperiencia
                                ? experiencias.find((framework) => framework.value === valueExperiencia)?.label
                                : "Seleccione a sua Experiência"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Procurar ocupação" />
                                <CommandEmpty>Ocupação não encontrada</CommandEmpty>
                                <CommandGroup>
                                    {experiencias.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        onSelect={(currentValue) => {
                                            console.log(currentValue)
                                        setValueExperiencia(currentValue)
                                        setOpenExperiencia(false)
                                        }}
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-2",
                                            valueExperiencia === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <br />
                <div className='flex flex-row gap-4'>
                    <HoverCard>
                        <HoverCardTrigger className='w-[40%]'>Educação</HoverCardTrigger>
                        <HoverCardContent>
                            Adicione alguma Informação relativa a sua formação para ajudar ao comprador a conhecer-te melhor.
                        </HoverCardContent>
                    </HoverCard>
                    <div className='flex flex-col gap-4 w-full'>
                        <Input 
                          value={educacaoPais}
                          onChange={(e) => seteducacaoPais(e.target.value)} 
                          type="text" 
                          placeholder="País de Formação" />
                        <Input 
                          value={nomeInstituicao}
                          onChange={(e) => setnomeInstituicao(e.target.value)}
                          type="text" placeholder="Nome da Instituição" />
                    </div>    
                    <div className='flex flex-col gap-4 w-full'>
                        <Input 
                          value={grauAdquirido}
                          onChange={(e) => setgrauAdquirido(e.target.value)}
                          type="text" 
                          placeholder="Grau Adquirido" />
                        <Input 
                          value={dataGraduacao}
                          onChange={(e) => setdataGraduacao(e.target.value)}
                          type="date" placeholder="Ano" />
                    </div>                
                    
                </div>
                <br />
                <div className='flex flex-row gap-4'>
                    <HoverCard>
                        <HoverCardTrigger className='w-[40%]'>Certificação</HoverCardTrigger>
                        <HoverCardContent>
                            Adicione alguma Informação relativa às suas certificações para ajudar ao comprador a conhecer-te melhor.
                        </HoverCardContent>
                    </HoverCard>
                    <div className='flex flex-col gap-4 w-full'>
                        <Input 
                          value={certificadoPor}
                          onChange={(e) => setcertificadoPor(e.target.value)}
                          type="text" 
                          placeholder="Certificado Por" />
                        <Input 
                          value={dataCertificado}
                          onChange={(e) => setdataCertificado(e.target.value)}
                          type="date" 
                          placeholder="Ano" />
                    </div>                
                    
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
                    <Button onClick={contactoInfo} variant="outline">Proximo</Button>
                </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}

export default ProfissionalInfo