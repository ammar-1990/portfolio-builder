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

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/modal-hook";
import { Loader } from "lucide-react";

const formSchema = z.object({
  theme: z.string().min(1, {
    message: "Theme is required.",
  }),
});

type Props = {
  portfolio: Portfolio | null;
};

const SettingsForm = ({ portfolio }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: portfolio?.theme || "basic",
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

  return (
    <div className="mt-10 flex-1 h-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col h-full   justify-between border-b p-4"
        >
          <div className="">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className=" flex-shrink-0 w-fit">
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
          </div>

          <Button className="self-start" disabled={isLoading} type="submit">
            Save changes{" "}
            {isLoading && (
              <Loader className="w-4 h-4 ml-2 animate-spin mt-auto" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
