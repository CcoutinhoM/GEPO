"use client"

import React from "react"
import Image from "next/image"
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
import axios from "axios"
import FormData from "form-data"
import { Check, ChevronsUpDown } from "lucide-react"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import { FileUpload } from "primereact/fileupload"

import { cn } from "@/lib/utils"
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

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

function NovoServico() {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [openExperiencia, setOpenExperiencia] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [valueExperiencia, setValueExperiencia] = React.useState("")
  const [telefone, settelefone] = React.useState("")
  const [processando, setProcessando] = React.useState(false)
  const [images, setImages] = React.useState([])
  const [nomeSerico, setNomeServico] = React.useState("")
  const [precoServico, setPrecoServico] = React.useState("")
  const [tempoMinimo, setTempoMinimo] = React.useState("")
  const [tempoMaximo, setTempoMaximo] = React.useState("")
  const [descricao, setDescricao] = React.useState("")
  const [imagem, setImagem] = React.useState("")

  async function servicoNovo() {
    setProcessando(true)
    try {
      const response = await fetch("api/servicos/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.use.id,
          nomeSerico,
          precoServico,
          tempoMinimo,
          tempoMaximo,
          descricao,
          imagem: session?.user?.image,
          categoria: value,
        }),
      })
    } catch (error) {
      console.log(error)
    } finally {
      setProcessando(false)
      router.push("/perfil")
    }
  }

  function profissionalInfo() {
    router.push("/perfil")
  }
  async function uploadImages(ev) {
    const files = ev.target?.files
    if (files?.length > 0) {
      // setIsUploading(true);
      const data = new FormData()
      for (const file of files) {
        data.append("file", file)
      }
      const res = await axios.post("/api/upload", data)
      // setImages(oldImages => {
      //   return [...oldImages, ...res.data.links];
      // });
      // setIsUploading(false);
    }
  }
  return (
    <div className="container mt-4 flex gap-4">
      <main className="flex-1">
        <div>
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle>Novo Serviço</CardTitle>
              <CardDescription>
                Preencha o formulário para adicionar o seu serviço, não deixe
                nehum campo vazio para ajudar aos clientes no momento da escolha
                do mesmo!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger className="w-[40%]">
                    Nome do Serviço
                  </HoverCardTrigger>
                  <HoverCardContent></HoverCardContent>
                </HoverCard>
                <Input
                  value={nomeSerico}
                  onChange={(e) => setNomeServico(e.target.value)}
                  type="text"
                  placeholder="Digite o nome do serviço"
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? frameworks.find(
                            (framework) => framework.value === value
                          )?.label
                        : "Categoria"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Procurar fornecedor" />
                      <CommandEmpty>Nenhum fornecedor encontrado!</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              )
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
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
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger className="w-[40%]">
                    Preço do Serviço
                  </HoverCardTrigger>
                  <HoverCardContent></HoverCardContent>
                </HoverCard>
                <Input
                  value={precoServico}
                  onChange={(e) => setPrecoServico(e.target.value)}
                  type="number"
                  placeholder="Digite o preço do serviço"
                />
                <Input
                  value={tempoMinimo}
                  onChange={(e) => setTempoMinimo(e.target.value)}
                  type="number"
                  placeholder="Tempo minimo para a entrega do serviço (mês)"
                />
                <Input
                  value={tempoMaximo}
                  onChange={(e) => setTempoMaximo(e.target.value)}
                  type="number"
                  placeholder="Tempo maximo para a entrega do serviço (mês)"
                />
              </div>
              <br />
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger className="w-[40%]">
                    Descrição do Serviço
                  </HoverCardTrigger>
                  <HoverCardContent></HoverCardContent>
                </HoverCard>
                <Textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Escrever texto da descrição do serviço."
                />
              </div>
              <br />
              <div className="flex flex-row gap-4">
                <HoverCard>
                  <HoverCardTrigger className="w-[40%]">
                    Imagem do Serviço
                  </HoverCardTrigger>
                  <HoverCardContent></HoverCardContent>
                </HoverCard>
                {!!images?.length &&
                  images.map((link) => (
                    <div key={link} className="h-24 rounded-lg p-4 shadow-sm">
                      <Image src={link} className="rounded-lg" alt="Link" />
                    </div>
                  ))}
                <label className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-sm border text-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div>Upload</div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={uploadImages}
                  ></input>
                </label>
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
                <Button onClick={servicoNovo} variant="outline">
                  Finalizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default NovoServico
