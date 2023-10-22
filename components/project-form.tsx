"use client";

import { Image as PImage, Portfolio, Project } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import getCountryFlag from "react-world-flags";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import ImageUpload from "./upload-image";
import { Textarea } from "./ui/textarea";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/modal-hook";
import { useEffect, useState } from "react";
import { Loader, XIcon } from "lucide-react";
import Image from "next/image";
import ImageManyUpload from "./image-many-upload";

const formSchema = z.object({
 
  title: z.string().min(1,{message:"title is required"}),
  description: z.string().optional(),
  images:z.object({url:z.string()}).array().optional(),

});

type Props = {
  project: Project &{images:PImage[]} | null;


};

const ProjectForm = ({ project }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: project ? {title:project.title,description:project.description ?? '',images:project.images} : {
      title: "",
      description: "",
      images: [],
     
    },
  });
  const isLoading = form.formState.isSubmitting;

  const params = useParams();
  const router = useRouter();

  const {onOpen} = useModal()


  const buttonText = project ? 'Save changes' : 'Create project'


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

        project ?  await axios.patch( `/api/${params.profileId}/${params.portfolioId}/project/${project.id}`,
        values)
      : await axios.post(
        `/api/${params.profileId}/${params.portfolioId}/project`,
        values
      );

     
     router.push(`/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects`)
      router.refresh();
      toast({
        variant: "default",
        title: "Project",
        description:project ? 'Changes saved' : "Project added",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "project",
        description: "Something went wrong",
      });
    }
  }

  // let noChanges =
  //   portfolio?.name === form.getValues("name") &&
  //   (portfolio?.title || "") === form.getValues("title") &&
  //   (portfolio?.bio || "") === form.getValues("bio") &&
  //   (portfolio?.imageUrl || "") === form.getValues("imageUrl") &&
  //   (portfolio?.country || "") === form.getValues("country") &&
  //   portfolio?.skills.join() === form.getValues("skills")?.join();

  // Task: refactor noCHanges

;

 







  return (
    <div className="mt-10 flex-1  ">
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col h-full justify-between p-1"
        >
          <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-3  gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project title*</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="col-span-2 flex flex-col gap-1">
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                  <ImageManyUpload
                      value={field.value!.map((img)=>img.url)}
                      disabled={isLoading}
                      onChange={(url)=>field.onChange([...field.value!,{url}])}
                      onRemove={(url)=>field.onChange([...field.value!.filter(img=>img.url !== url)])}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                  <Textarea
                      placeholder="Describe your Project..."
                      className="resize-none flex-1 min-h-[200px]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            

           
          
           
          </div>
          </div>
          <div className="flex items-center gap-x-4">
            {" "}
            <Button disabled={isLoading } type="submit">
              {buttonText}
              {isLoading && <Loader className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
            {project && 
            <Button type="button"
            variant={'destructive'}
            onClick={()=>{  onOpen("alert-modal", {
              url: `/api/${params.profileId}/${params.portfolioId}/project/${project.id}`,
              back: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects`,
              message:'Project'
            });}}
            >
              Delete
              </Button>}
           
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
