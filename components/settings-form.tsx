"use client";

import { Portfolio } from "@prisma/client";

import React, { useCallback, useEffect, useRef, useState } from "react";

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

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/modal-hook";
import { Copy, Globe, Loader } from "lucide-react";
import { useOrigin } from "@/hooks/useOrigin";
import TipTool from "./tip-tool";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  theme: z.string().min(1, {
    message: "Theme is required.",
  }),
  published: z.boolean(),
});

type Props = {
  portfolio: Portfolio | null;
};

const SettingsForm = ({ portfolio }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: portfolio?.theme || "basic",
      published: portfolio?.published || false,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const params = useParams();
  const router = useRouter();

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

  const [initiated, setInitiated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!initiated) {
      setInitiated(true);
    } else {
      console.log("change");
      form.handleSubmit(onSubmit)();
    }
  }, [form.getValues("theme"), form.getValues("published")]);

  const origin = useOrigin();
  const url = ` ${origin}/preview/${params.portfolioId}`

  const copy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="mt-10 flex-1 h-full border-b ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col h-full   justify-between  p-4"
        >
          <div className="flex gap-20 flex-col">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className=" w-fit">
                  <FormLabel>Choose your theme</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue
                          className="text-zinc-200 capitalize"
                          placeholder="Select your country"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px] ">
                        <SelectItem
                          className="cursor-pointer capitalize"
                          key={"basic"}
                          value={"basic"}
                        >
                          basic
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer capitalize"
                          key={"move"}
                          value={"move"}
                        >
                          move
                        </SelectItem>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs">
                    Choose the theme you want for your site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className=" ">
                  <FormLabel>Publish your site</FormLabel>
                  {portfolio?.published ? (
                    <div className=" flex flex-col gap-1 ">
                      <div className="flex items-center gap-1">
                        {" "}
                        <p className="font-semibold text-xs">
                          Your site is published
                        </p>{" "}
                        <div className="border p-2 rounded-xl flex items-center gap-1 self-start">
                          <Globe className="w-4 h-4  text-black" />{" "}
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 border rounded-xl p-1 max-w-fit">
                        <p className="text-xs text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                        {url}
                        </p>
                        <TipTool
                          side="right"
                          title={copied ? "Copied" : "Copy"}
                        >
                          <Button className={cn("text-xs",copied && 'cursor-default opacity-70 ')} onClick={copy} type="button" variant={'ghost'} size={'sm'}>
                            {copied ? "Copied" : "Copy"}{" "}
                            <Copy className="w-3 h-3 ml-1" />
                          </Button>
                        </TipTool>
                      </div>
                      <Button
                       disabled={isLoading}
                        onClick={() => {
                          field.onChange(false);
                        }}
                        className="mt-1 self-start"
                      >
                        Unpublish
                      </Button>
                    </div>
                  ) : (
                    <div
                      className=""
                     
                    >

                      <p className="text-sm text-gray-600 py-2">Your site is unpublished</p>
                      <Button
                      disabled={isLoading}
                      type="button"  onClick={() => {
                        field.onChange(true);
                      }}>Publish <Globe className="w-4 h-4 ml-2" /></Button>
                      
                    </div>
                  )}

                  <FormDescription className="text-xs">
                    Publish your site and share it with people
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
