"use client";

import { Portfolio } from "@prisma/client";

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
import { Loader, XIcon } from "lucide-react";
import Image from "next/image";

const phoneRegex = new RegExp(
  /^\+\d{1,3}\d{10}$/
);

const facebookRegex = /^https?:\/\/(?:www\.)?facebook\.com\/[a-zA-Z0-9.-]+\/?$/;
const linkedinRegex =/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[a-zA-Z0-9_\-\.]+)$/;

const optionalString = z.string().refine(value => value === '' || value !== undefined, {
  message: 'This field must be a valid URL or left empty',
});


const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  title: z.string().min(1,{message:'Enter a valid title '}),
  bio: z.string().min(5,{message:'At least 5 characters'}),
  tel:z.string().regex(phoneRegex,'Enter valid phone number'),
  email: z.string().email(),
  facebook: optionalString.refine(value => value === '' || value === undefined || facebookRegex.test(value), {
    message: 'Enter a valid Facebook account URL',
  }),
  linkedin: optionalString.refine(value => value === '' || value === undefined || linkedinRegex.test(value), {
    message: 'Enter a valid LinkedIn account URL',
  }),
  instagram: optionalString.refine(value => value === '' || value === undefined || instagramRegex.test(value), {
    message: 'Enter a valid Instagram account URL',
  }),

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
      tel: portfolio?.tel || "",
      email: portfolio?.email || "",
      instagram: portfolio?.instagram || "",
      facebook: portfolio?.facebook || "",
      linkedin: portfolio?.linkedin || "",
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

  // let noChanges =
  //   portfolio?.name === form.getValues("name") &&
  //   (portfolio?.title || "") === form.getValues("title") &&
  //   (portfolio?.bio || "") === form.getValues("bio") &&
  //   (portfolio?.imageUrl || "") === form.getValues("imageUrl") &&
  //   (portfolio?.country || "") === form.getValues("country") &&
  //   portfolio?.skills.join() === form.getValues("skills")?.join();

  // Task: refactor noCHanges

  const { onOpen } = useModal();

  const handleButtonClick = useCallback(() => {
    if (!skillRef.current?.value) return;
    const myArray = form.getValues("skills");
    form.setValue("skills", [...myArray!, skillRef.current?.value]);
    skillRef.current.value = "";
  }, [form]);

  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleButtonClick();
      }
    };

    document.addEventListener("keydown", handleEvent);

    return () => document.removeEventListener("keydown", handleEvent);
  }, [handleButtonClick]);
  const skillRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="mt-10 flex-1  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col h-full justify-between p-1"
        >
       
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
              <FormField
              
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
                    <FormLabel>Portfolio name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Photography" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs ">
                      Give your portfolio a name, example: Management...
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Expert photographer" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      The title of your career, example: Project manager, Cook ....
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
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
                                <img
                                  alt="flag"
                                  src={name.flag}
                                  className="object-contain w-5 h-5 "
                                />

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
                name="tel"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
                    <FormLabel>Mobile number*</FormLabel>
                    <FormControl>
                      <Input placeholder="+1xxxxxxxxxx" {...field} />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
                    <FormLabel>E-mail*</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="facebook" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
                    <FormLabel>Linkedin</FormLabel>
                    <FormControl>
                      <Input placeholder="linkedin" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex-shrink-0">
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="instagram" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2 flex flex-col gap-1 flex-shrink-0 col-span-1">
                    <FormLabel>Bio*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your career..."
                        className="resize-none flex-1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Tell us about your self
                    </FormDescription>
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
                    <FormDescription className="text-xs">
                      The logo will appear in your site,otherwise the title will appear
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2 col-span-1 flex-shrink-0">
                    <FormLabel>
                      Skills {`${form.getValues("skills")?.length}/10`}
                    </FormLabel>
                    <div className="flex items-center gap-x-2">
                      <FormControl>
                        <Input ref={skillRef} placeholder="Programming.." />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={handleButtonClick}
                        disabled={field.value?.length! >= 10}
                      >
                        Add
                      </Button>
                    </div>

                    <div className=" flex flex-wrap gap-1 items-center w-full">
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
                                ...field.value?.filter(
                                  (item) => item !== value
                                )!,
                              ]);
                            }}
                          />
                        </span>
                      ))}
                    </div>
                    {field.value?.length! >= 10 && (
                      <p className="py-1 text-sm text-rose-500">
                       You &apos;ve reached the maximum of 10 skills!
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          
          <div className="flex items-center gap-x-4">
            {" "}
            <Button disabled={isLoading} type="submit">
              Save changes
              {isLoading && <Loader className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
            <Button
              onClick={() =>
                onOpen("alert-modal", {
                  url: `/api/${params.profileId}/${params.portfolioId}`,
                  back: "/dashboard",
                  message: "Portfolio",
                })
              }
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

export default React.memo(AboutForm);
