"use client";

import { Experience, Portfolio } from "@prisma/client";

import React, { useCallback, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { CalendarIcon, Loader, XIcon } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  place: z.string().min(1, {
    message: "Place is required.",
  }),
  description: z.string().optional(),
startDate:z.date().optional(),
endDate:z.date().optional()

});

type Props = {
  experience: Experience | null;


};

const ExperienceForm = ({ experience }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: experience?.place || "",
      description: experience?.description || "",
      startDate: experience?.startDate || undefined,
      endDate: experience?.startDate || undefined,
    
    },
  });
  const isLoading = form.formState.isSubmitting;

  const params = useParams();
  const router = useRouter();
 

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

        experience?  await axios.patch(
            `/api/${params.profileId}/${params.portfolioId}/experience/${experience.id}`,
            values
          ):
      await axios.post(
        `/api/${params.profileId}/${params.portfolioId}/experience`,
        values
      );
      router.push(`/dashboard/${params.profileId}/portfolio/${params.portfolioId}/experience`)
      router.refresh();
      toast({
        variant: "default",
        title: "Experience",
        description:experience?  "Changes saved" : " Experience added",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Experience",
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

  const { onOpen } = useModal();




  return (
    <div className="mt-10 flex-1  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col h-full justify-between p-1"
        >
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place*</FormLabel>
                    <FormControl>
                      <Input placeholder="any company" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Describe your experience..."
                        className="resize-none flex-1"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Start date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
           
              <FormMessage />
            </FormItem>
          )}
        />
             

             <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>End date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01") || date < form.getValues('startDate')!
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
           
              <FormMessage />
            </FormItem>
          )}
        />
            
           
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            {" "}
            <Button disabled={isLoading} type="submit">
              {experience ? 'Save changes' : 'Add experience'}
              {isLoading && <Loader className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
            <Button
              onClick={()=>{  onOpen("alert-modal", {
                url: `/api/${params.profileId}/${params.portfolioId}/experience/${experience?.id}`,
                back: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/experience`,
                message:'Experience'
              });}}
              type="button"
              variant={"destructive"}
            >
              Delete experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default React.memo(ExperienceForm);
