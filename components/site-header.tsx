"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Construção",
    href: "#",
    description:
      "Encontre aqui os diversos fornecedores de serviços de contrução para o seu projecto!",
  },
  {
    title: "Arquitetura",
    href: "#",
    description:
      "Se necessita de arquitetos para o seu projecto aqui poderá encontrar um ideial para si",
  },
  {
    title: "Design Gráfico",
    href: "#",
    description:
      "Veja os melhores designer que temos para trabalhar na imagem da sua empresa e/ou evento",
  },
  {
    title: "Programação",
    href: "#",
    description:
      "Encontre aqui o programador e/ou desenvolvedor para o seu projecto.",
  },
  {
    title: "Carpitaria",
    href: "#",
    description:
      "Listamos as melhores carpintarias para fazer o seu projecto de uma forma já mais vista por si",
  },
  {
    title: "Estilistas",
    href: "#",
    description:
      "Caso deseja trabalhar o seu visual veja a lista de estilistas que temos para si",
  },
]

export function SiteHeader() {
  const { data: session }: any = useSession()
  const [providers, setProviders] = useState<any | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [dadosFornecedor, setDadosFornecedor] = React.useState([])

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/servicosTodos/${
          session?.["user"]["id"] ? session?.["user"]["id"] : ""
        }/servicos`
      )
      const data = await response.json()
      setDadosFornecedor(data)
    }
    if (session?.["user"]["id"]) fetchPosts()
  }, [session])

  useEffect(() => {
    const setUpProviders = async () => {
      const response2 = await getProviders()
      setProviders(response2)
    }
    setUpProviders()
  }, [])
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* Desktop Navigation */}
            <div className="hidden sm:flex">
              {session?.user ? (
                <>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Suporte</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  {/* <Icons.logo className="h-6 w-6" /> */}
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    GEPO
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Conectando Vidas e Projectos, junte-se a nós
                                    nessa grande jornada...
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <ListItem href="#" title="Ajuda e suporte">
                              Encontre o que você precisa com a nossa ajuda!
                            </ListItem>
                            <ListItem href="#" title="Confiança e Segurança">
                              Milhões de serviços, milhões de usuários. Nossa
                              prioridade: sua confiança e segurança
                            </ListItem>
                            <ListItem href="#" title="Guias GEPO">
                              Tudo que você precisa saber para alavancar o seu
                              negócio
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          Categorias
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                              <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                              >
                                {component.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {dadosFornecedor.length > 0 ? (
                        <>
                          <NavigationMenuItem>
                            <Link
                              href={`/mensagens/${session?.user?.id}`}
                              legacyBehavior
                              passHref
                            >
                              <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                  />
                                </svg>
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                        </>
                      ) : (
                        <>
                          <NavigationMenuItem>
                            <Link
                              href={`/mensagens/${session?.user?.id}`}
                              legacyBehavior
                              passHref
                            >
                              <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                              >
                                {
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    />
                                  </svg>
                                }
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                        </>
                      )}

                      <NavigationMenuItem>
                        <Link href="#" legacyBehavior passHref>
                          <NavigationMenuLink
                            onClick={() => signOut()}
                            className={navigationMenuTriggerStyle()}
                          >
                            Sair
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link href="/perfil" legacyBehavior passHref>
                          <Avatar>
                            <AvatarImage
                              src={session?.user?.image}
                              alt="@shadcn"
                            />
                            <AvatarFallback>GP</AvatarFallback>
                          </Avatar>
                        </Link>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <ThemeToggle />
                </>
              ) : (
                <>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Suporte</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  {/* <Icons.logo className="h-6 w-6" /> */}
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    GEPO
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Conectando Vidas e Projectos, junte-se a nós
                                    nessa grande jornada...
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <ListItem href="#" title="Ajuda e suporte">
                              Encontre o que você precisa com a nossa ajuda!
                            </ListItem>
                            <ListItem href="#" title="Confiança e Segurança">
                              Milhões de serviços, milhões de usuários. Nossa
                              prioridade: sua confiança e segurança
                            </ListItem>
                            <ListItem href="#" title="Guias GEPO">
                              Tudo que você precisa saber para alavancar o seu
                              negócio
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          Categorias
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                              <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                              >
                                {component.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline">Entrar</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-center">
                                Entre na sua Conta
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                <div className="text-center">
                                  Faça o seu cadastro para poder ter acesso ao
                                  seu Dashboard e poder fornecer os seus
                                  serviços a milhares de clientes!
                                </div>
                                <br />
                                <div className="my-4 flex flex-col content-center justify-center text-center">
                                  <AlertDialogTitle>
                                    Autenticar com conta Google
                                  </AlertDialogTitle>
                                  {providers &&
                                    Object.values(providers).map(
                                      (provider: any) => (
                                        <Button
                                          type="button"
                                          key={provider["name"]}
                                          onClick={() => signIn(provider["id"])}
                                          variant="outline"
                                        >
                                          Google
                                        </Button>
                                      )
                                    )}
                                </div>
                                <Tabs defaultValue="account">
                                  <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="account">
                                      Autenticação
                                    </TabsTrigger>
                                    <TabsTrigger value="password">
                                      Nova Conta
                                    </TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="account">
                                    <Card>
                                      <CardHeader className="text-center">
                                        <CardTitle>
                                          Credênciais do Usuário
                                        </CardTitle>
                                        <CardDescription></CardDescription>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                          <Label htmlFor="name">Nome</Label>
                                          <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="username">
                                            Username
                                          </Label>
                                          <Input
                                            id="username"
                                            defaultValue="@peduarte"
                                          />
                                        </div>
                                      </CardContent>
                                      <CardFooter>
                                        <Button>Confirmar</Button>
                                      </CardFooter>
                                    </Card>
                                  </TabsContent>
                                  <TabsContent value="password">
                                    <Card>
                                      <CardHeader className="text-center">
                                        <CardTitle>Dados do Usuário</CardTitle>
                                        <CardDescription></CardDescription>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                          <Label htmlFor="current">Nome</Label>
                                          <Input type="text" />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="current">
                                            Username
                                          </Label>
                                          <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="current">Senha</Label>
                                          <Input type="password" />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="new">
                                            Confirmar Senha
                                          </Label>
                                          <Input type="password" />
                                        </div>
                                        <p className="text-xs">
                                          Ao inscrever-se, você concorda com os
                                          Termos de Serviço da GEPO e aceita
                                          receber nossos e-mails ocasionalmente.
                                          Leia nossa Política de Privacidade
                                          para saber como usamos seus dados
                                          pessoais.
                                        </p>
                                      </CardContent>
                                      <CardFooter>
                                        <Button>Criar Conta</Button>
                                      </CardFooter>
                                    </Card>
                                  </TabsContent>
                                </Tabs>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <ThemeToggle />
                </>
              )}
            </div>
            {/* Mobile Navigation */}
            <div className="relative flex sm:hidden">
              {session?.user ? (
                <>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <Avatar>
                          <AvatarImage
                            onClick={() => setToggleDropdown((prev) => !prev)}
                            src={session?.user?.image}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                    {toggleDropdown && (
                      <div className="absolute right-0 top-full mt-3 flex w-full min-w-[210px] flex-col items-end justify-end gap-2 rounded-lg bg-black p-5">
                        <Link
                          href={"/perfil"}
                          className="font-inter text-sm font-medium text-gray-700 hover:text-gray-500"
                          onClick={() => setToggleDropdown(false)}
                          legacyBehavior
                          passHref
                        >
                          Perfil
                        </Link>
                        <Link
                          className="font-inter text-sm font-medium text-gray-700 hover:text-gray-500"
                          onClick={() => setToggleDropdown(false)}
                          href="#"
                          legacyBehavior
                          passHref
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                          </svg>
                        </Link>
                        <Button
                          onClick={() => signOut()}
                          className="mt-5 w-full"
                          variant="outline"
                        >
                          Sair
                        </Button>
                      </div>
                    )}
                  </NavigationMenu>
                  <ThemeToggle />
                </>
              ) : (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline">Entrar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-center">
                              Entre na sua Conta
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              <ThemeToggle />
                              <div className="text-center">
                                Faça o seu cadastro para poder ter acesso ao seu
                                Dashboard e poder fornecer os seus serviços a
                                milhares de clientes!
                              </div>
                              <br />
                              <div className="my-4 flex flex-col content-center justify-center text-center">
                                <AlertDialogTitle>
                                  Autenticar com conta Google
                                </AlertDialogTitle>

                                {providers &&
                                  Object.values(providers).map(
                                    (provider: any) => (
                                      <Button
                                        type="button"
                                        key={provider["name"]}
                                        onClick={() => signIn(provider["id"])}
                                        variant="outline"
                                      >
                                        Google
                                      </Button>
                                    )
                                  )}
                              </div>
                              <Tabs defaultValue="account">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="account">
                                    Autenticação
                                  </TabsTrigger>
                                  <TabsTrigger value="password">
                                    Nova Conta
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">
                                  <Card>
                                    <CardHeader className="text-center">
                                      <CardTitle>
                                        Credênciais do Usuário
                                      </CardTitle>
                                      <CardDescription></CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div className="space-y-1">
                                        <Label htmlFor="name">Nome</Label>
                                        <Input
                                          id="name"
                                          defaultValue="Pedro Duarte"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <Label htmlFor="username">
                                          Username
                                        </Label>
                                        <Input
                                          id="username"
                                          defaultValue="@peduarte"
                                        />
                                      </div>
                                    </CardContent>
                                    <CardFooter>
                                      <Button>Confirmar</Button>
                                    </CardFooter>
                                  </Card>
                                </TabsContent>
                                <TabsContent value="password">
                                  <Card>
                                    <CardHeader className="text-center">
                                      <CardTitle>Dados do Usuário</CardTitle>
                                      <CardDescription></CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div className="space-y-1">
                                        <Label htmlFor="current">Nome</Label>
                                        <Input type="text" />
                                      </div>
                                      <div className="space-y-1">
                                        <Label htmlFor="current">
                                          Username
                                        </Label>
                                        <Input id="current" type="password" />
                                      </div>
                                      <div className="space-y-1">
                                        <Label htmlFor="current">Senha</Label>
                                        <Input type="password" />
                                      </div>
                                      <div className="space-y-1">
                                        <Label htmlFor="new">
                                          Confirmar Senha
                                        </Label>
                                        <Input type="password" />
                                      </div>
                                      <p className="text-xs">
                                        Ao inscrever-se, você concorda com os
                                        Termos de Serviço da GEPO e aceita
                                        receber nossos e-mails ocasionalmente.
                                        Leia nossa Política de Privacidade para
                                        saber como usamos seus dados pessoais.
                                      </p>
                                    </CardContent>
                                    <CardFooter>
                                      <Button>Criar Conta</Button>
                                    </CardFooter>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
