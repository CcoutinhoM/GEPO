"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Grid } from "@nextui-org/react"
import { BellRing, Check } from "lucide-react"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Card4 } from "./Card4"

export default function IndexPage() {
  const { data: session } = useSession()

  const router = useRouter()
  const [servicoAutor, setServicoAutor] = React.useState([])
  console.log(session)
  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/fornecedores/todos`)
      const data = await response.json()
      setServicoAutor(data)
    }
    fetchPosts()
  }, [])
  return (
    <section className="container mt-4 grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="max-w[60%] text-lg">
          Deseja Fornecer e/ou Realizar Projectos?
          <br className="hidden sm:inline" />
          Então você está no local certo....
        </h1>
        <p className="max-w-[20%] text-lg text-muted-foreground">
          Aqui, você encontrará uma plataforma abrangente que conecta pessoas
          com ideias e necessidades a profissionais talentosos capazes de
          transformar essas ideias em realidade.
        </p>
      </div>
      <br />
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <p className="font-extrabold leading-tight tracking-tighter">
          Adicionados Recentimente
        </p>
      </div>
      <div className="grid w-[10%] justify-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {servicoAutor.length > 0 &&
          servicoAutor.map((servicos) => (
            <Card className="w-[150px]">
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
                    router.push(`/detalhesServico/${servicos["_id"]}`)
                  }
                  variant="outline"
                >
                  Detalhes
                </Button>
                Preço: {servicos["precoServico"]}
              </CardFooter>
            </Card>
          ))}
      </div>
    </section>
  )
}
