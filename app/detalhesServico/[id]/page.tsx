'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Dropdown, Text, Row, Modal, useModal, Grid, Loading } from "@nextui-org/react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, usePathname } from 'next/navigation';

function DetalhesServicos({ params }) {
  const {data: session } = useSession();
  const router = useRouter();
  const [servicoUnico, setServicoUnico] = React.useState([]);
  const [servicoAutor, setServicoAutor] = React.useState([]);
  const { toast } = useToast();


  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/servicoUnico/${params?.id}`);
      const data = await response.json();
      setServicoUnico(data);
      setServicoAutor(data);
      
    }
    fetchPosts();
  }, [params?.id])
  return (
     <div className="container mt-4 flex gap-4">
      <aside>
        <Card className="mb-4 w-[350px]">
          <CardHeader>
            <CardTitle className='text-center'>Autor</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          {servicoAutor.length > 0 && servicoAutor.map((autor) => 
              (
              <>
                <CardContent>
                  
                      <div key={autor.creator._id} className='flex flex-row content-center justify-center rounded-full text-center'>
                        <Image className='rounded-full' width={100} height={100} src={autor.creator.image} alt="Perfil Image" />              
                        </div>
                        <br />
                        <div className='text-center'>
                          <p>{autor.creator.username}</p>
                        </div>
                        <div className='text-center'>
                          <p>{autor.creator.email}</p>
                      </div>
                    
                              
                </CardContent>
                <CardFooter className="flex justify-end">
                  {/* <Button variant="outline">Cancel</Button> */}
                  <Button  onClick={() => router.push(`/perfil_fornecedor/${autor.creator._id}`)} variant="outline">Ver Perfil</Button>
                </CardFooter>
              </>
                )
                )}
        </Card>      
      </aside>
      <main className="flex-1">
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className='text-center'></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              {servicoUnico.length > 0 && servicoUnico.map((servico) =>
                (
                  <div className="flex flex-row gap-4">
                    <Card className="w-[30%]">
                        <CardHeader>
                          <CardTitle></CardTitle>
                          <CardDescription>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='flex flex-row content-center justify-center text-center'>
                            <Image className='rounded-md' width={150} height={150} src={servico.imagem} alt="Perfil Image" />              
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className='flex flex-row content-center justify-center gap-4 text-center'>
                            <Image className='cursor-pointer rounded-md' width={30} height={30} src={servico.imagem} alt="Perfil Image" />
                             <Image className='cursor-pointer rounded-md' width={30} height={30} src={servico.imagem} alt="Perfil Image" />
                              <Image className='cursor-pointer rounded-md' width={30} height={30} src={servico.imagem} alt="Perfil Image" />            
                          </div>
                        </CardFooter>
                    </Card>
                    <Card className="w-[70%]">
                        <CardHeader>
                          <CardTitle>{servico.nomeSerico}</CardTitle>
                          <CardDescription>
                            Categoria: {servico.categoria}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {servico.descricao}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <p>Tempo Minimo: {servico.tempoMinimo} Mes(es)</p>
                          <p>Tempo: {servico.tempoMaximo} Mes(es)</p>
                        </CardFooter>
                    </Card>
              </div>    
                )
              )}      
                    <Card className="mt-4 w-[100%]">
                        <CardHeader>
                          <CardTitle>Comentários</CardTitle>
                          <CardDescription>
                            Dê o seu parecer sobre este produto: 
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Textarea 
                            // value={descricao}
                            // onChange={(e) => setdescricao(e.target.value)}
                            placeholder="Escrever o seu comentario aqui." />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          {/* Comentarios */}
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast({
                                description: "Comentario Enviado Com Seucesso.",
                              })
                            }}
                          >
                            Enviar Comentario
                          </Button>
                          {/* Pagamentos */}
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline">Adquirir Serviço</Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Pagamento via conta móvel</SheetTitle>
                                <SheetDescription>
                                  Digite o número a ser descontado o saldo do pagamento do serviço
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Número
                                  </Label>
                                  <Input type='number' value="82 000 0000" className="col-span-3" />
                                </div>
                                
                              </div>
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button type="submit">Confirmar</Button>
                                </SheetClose>
                              </SheetFooter>

                              <SheetHeader className='mt-12'>
                                <SheetTitle>Pagamento via conta bancária</SheetTitle>
                                <SheetDescription>
                                  Ao selecionar o botão abaixo será redirecionado para a pagina de
                                  autenticação bancaria
                                </SheetDescription>
                              </SheetHeader>
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button type="submit" className='mt-4'>Autenticar</Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </CardFooter>
                    </Card>       
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
  )
}

export default DetalhesServicos