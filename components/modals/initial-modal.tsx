'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { useToast } from "@/components/ui/use-toast"
import { useModal } from "@/hooks/modal-hook"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"

  import React from 'react'
import { useForm } from "react-hook-form"
import {useParams, useRouter} from 'next/navigation'
import axios from 'axios'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"




  const formSchema = z.object({
    name: z.string().min(1,{message:'Enter the name of your portfolio'}).trim(),
  })
  
  type Props = {}
  
  const InitialModal = (props: Props) => {
const {open,onClose,modalType,data} = useModal()

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
  const { toast } = useToast()

  const isLoading = form.formState.isSubmitting

  const params = useParams()

  const {profileId} = params

  const router = useRouter()
  async function onSubmit(values: z.infer<typeof formSchema>) {
 
  try {
  await axios.post(`/api/${profileId}/portfolio`,values)

  data?.refresh ? (()=>{router.refresh();onClose()})()  :    window.location.href = '/dashboard'
  toast({
    variant:'default',
    title: "Portfolio",
    description: "New portfolio created",
  })
 

  } catch (error) {
    console.log(error)
  }
  }

const isOpen = open && modalType === 'initial-modal'

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
       
        <DialogContent>
          <DialogHeader className="pt-6">
            <DialogTitle className="capitalize">Portfolio Name</DialogTitle>
            <DialogDescription>
             Enter the name of your  portfolio.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
            
              <FormControl>
                <Input placeholder="Photography" {...field}  />
              </FormControl>
       
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">Create {isLoading && <Loader className="w-4 h-4 ml-2 animate-spin" />}</Button>
      </form>
    </Form>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default InitialModal