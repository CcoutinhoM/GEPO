'use client'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"


function Mensagens({ params }) {
  const {data: session } = useSession();
  const [servicoUnico, setServicoUnico] = React.useState([]);
  const [servicoAutor, setServicoAutor] = React.useState([]);
  const { toast } = useToast();


  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/servicoUnico/${params.id}`);
      const data = await response.json();
      setServicoUnico(data);
      setServicoAutor(data);
      
    }
    if(session?.user?.id) fetchPosts();
  }, [])
  return (
     <div className="container flex gap-4 mt-4">
      <aside>
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Mensagens Lidas</TabsTrigger>
                <TabsTrigger value="password">Mensagens Não Lidas</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                <CardHeader>
                    <CardTitle>0 Mensagens Abertas</CardTitle>
                    <CardDescription>
                    Poderá visualizar mensagens assim que um cliente o enviar!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                </CardContent>
                <CardFooter>
                    <Button>Elimenar</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                <CardHeader>
                    <CardTitle>0 Mensagens Não Lidas</CardTitle>
                    <CardDescription>
                    Poderá visualizar mensagens assim que um cliente o enviar!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                </CardContent>
                <CardFooter>
                    <Button>Elimenar</Button>
                </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>  
      </aside>
      <main className="flex-1">
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className='text-center'></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                   <Card className="w-[100%] mt-4">
                        <CardHeader>
                          <CardTitle>Chat</CardTitle>
                          <CardDescription>
                            Esteja em contacto permanete com o seu fornecedor ou cliente para
                            der mais informações sobre o mesmo...
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Textarea 
                            // value={descricao}
                            // onChange={(e) => setdescricao(e.target.value)}
                            placeholder="Escreva aqui a sua mensagem." />
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          {/* Pagamentos */}
                          <Button variant="outline">Enviar Mensagem</Button>
                        </CardFooter>
                    </Card>       
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
  )
}

export default Mensagens