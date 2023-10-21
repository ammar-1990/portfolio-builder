"use client";

import { Portfolio } from "@prisma/client";

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
import { XIcon } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  title: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  country: z.string().optional(),
  skills: z
    .array(z.string())
    .max(10, { message: "Maximum of 10 skills" })
    .optional(),
});

type Props = {
  portfolio: Portfolio | null;

  names: any | undefined;
};

const AboutForm = ({ portfolio, names }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: portfolio?.name || "",
      title: portfolio?.title || "",
      bio: portfolio?.bio || "",
      imageUrl: portfolio?.imageUrl || "",
      country: portfolio?.country || "",
      skills: portfolio?.skills || [],
    },
  });
  const isLoading = form.formState.isSubmitting;

  const params = useParams();
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(
        `/api/${params.profileId}/${params.portfolioId}`,
        values
      );
      router.refresh();
      toast({
        variant: "default",
        title: "Portfolio",
        description: "Changes saved",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Portfolio",
        description: "Something went wrong",
      });
    }
  }

  let noChanges =
    portfolio?.name === form.getValues("name") &&
    (portfolio?.title || "") === form.getValues("title") &&
    (portfolio?.bio || "") === form.getValues("bio") &&
    (portfolio?.imageUrl || "") === form.getValues("imageUrl") &&
    (portfolio?.country || "") === form.getValues("country") &&
    portfolio?.skills.join() === form.getValues("skills")?.join();

  const { onOpen } = useModal();

  const handleKeyPress = (event:KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
   const myArray = form.getValues('skills')
 form.setValue('skills',[...myArray!,skillInput])
 setSkillInput('')
  };

  useEffect(()=>{

   const handleEvent = (e:KeyboardEvent)=>{
    if(e.key==='Enter'){
     e.preventDefault()
      handleButtonClick()
      console.log(skillInput)
    }

   }

   document.addEventListener('keydown',handleEvent)

   return ()=>document.removeEventListener('keydown',handleEvent)
  },[handleButtonClick])

  return (
    <div className="mt-10 flex-1  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col h-full justify-between p-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Photography" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Expert photographer" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-zinc-200"
                          placeholder="Select your country"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px] ">
                        {names?.map((name: any) => (
                          <SelectItem
                            className="cursor-pointer "
                            key={name.name}
                            value={name.name}
                          >
                            <div className="flex items-center gap-x-3">
                            <img  alt="flag" src={name.flag} className="object-contain w-5 h-5 " />
                          
                          {name.name}
                            </div>
                        
                            
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="col-span-2 flex flex-col gap-1">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your career..."
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={(value) => field.onChange(value)}
                      onRemove={() => field.onChange("")}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <div className="flex items-center gap-x-2">
                    <FormControl>
                      <Input
                        placeholder="Programming.."
                        value={skillInput}
                        onChange={(e) => {setSkillInput(e.target.value)}}
                      />
                    </FormControl>
                    <Button
                    
                      type="button"
                      onClick={handleButtonClick}
                      disabled={!skillInput || field.value?.length! >= 10}
                    >
                      Add
                    </Button>
                  </div>

                  <div className=" flex flex-wrap gap-3 items-center w-full">
                    {field.value?.map((value) => (
                      <span
                        key={uuidv4()}
                        className="px-3 py-1 border rounded-full text-xs flex items-center gap-x-3 capitalize bg-black text-white"
                      >
                        {value}
                        <XIcon
                          className="w-4 h-4 cursor-pointer "
                          onClick={() => {
                            field.onChange([
                              ...field.value?.filter((item) => item !== value)!,
                            ]);
                          }}
                        />
                      </span>
                    ))}
                  </div>
                  {field.value?.length! >= 10 && (
                    <p className="py-1 text-sm text-rose-500">
                      You can add 10 skills only
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-x-4">
            {" "}
            <Button disabled={isLoading || noChanges} type="submit">
              Save changes
            </Button>
            <Button
              onClick={() => onOpen("alert-modal")}
              type="button"
              variant={"destructive"}
            >
              Delete portfolio
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AboutForm;
