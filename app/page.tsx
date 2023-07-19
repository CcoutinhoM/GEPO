"use client"
import React from 'react'
import Link from "next/link"
import { Grid } from "@nextui-org/react";
import { Card4 } from "./Card4";
import { BellRing, Check } from "lucide-react"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function IndexPage() {
  const router = useRouter();
  const [servicoAutor, setServicoAutor] = React.useState([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/fornecedores/todos`);
      const data = await response.json();
      setServicoAutor(data);
      }
    fetchPosts();
  }, [])
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Deseja Fornecer e/ou Realizar Projectos? <br className="hidden sm:inline" />
          Então você está no local certo....
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
        Aqui, você encontrará uma plataforma abrangente que conecta pessoas com ideias e 
        necessidades a profissionais talentosos capazes de transformar essas ideias em 
        realidade.
        </p>
      </div>
      <br />
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <p className="font-extrabold leading-tight tracking-tighter">
          Adicionados Recentimente
        </p>
      </div>
      <div className="grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {servicoAutor.length > 0 && servicoAutor.map((servicos) => (
            <Card className="w-[250px]">
                        <CardHeader>
                          <CardTitle>{servicos.nomeSerico}</CardTitle>
                          <CardDescription>
                            Categoria: {(servicos.categoria).toUpperCase()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='flex flex-row content-center justify-center text-center'>
                            <Image className='rounded-md' width={60} height={60} src={servicos.imagem} alt="Perfil Image" />              
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button onClick={() => router.push(`/detalhesServico/${servicos._id}`)} variant="outline">Detalhes</Button>
                          Preço: {servicos.precoServico}
                        </CardFooter>
                    </Card>
        ))}
      </div>
    </section>
  )
}
