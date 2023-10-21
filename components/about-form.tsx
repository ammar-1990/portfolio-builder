"use client";

import { Portfolio } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  title: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  country: z.string().optional(),
});

type Props = {
  portfolio: Portfolio | null;

  names: string[] | undefined;
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

  let noChanges =
    portfolio?.name === form.getValues("name").trim() &&
    (portfolio?.title || "") === form.getValues("title") &&
    (portfolio?.bio || "") === form.getValues("bio") &&
    (portfolio?.imageUrl || "") === form.getValues("imageUrl") &&
    (portfolio?.country || "") === form.getValues("country");

    const {onOpen} = useModal()

  return (
    <div className="mt-10 flex-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col h-full justify-between"
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
                        {names?.map((name) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={name}
                            value={name}
                          >
                            {name}
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
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your career..."
                      className="resize-none"
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
          </div>
          <div className="flex items-center gap-x-4">
            {" "}
            <Button
              disabled={isLoading || noChanges}
             
              type="submit"
            >
              Save changes
            </Button>
            <Button
            onClick={()=>onOpen('alert-modal')}
            type="button"
          variant={'destructive'}
             
            
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
