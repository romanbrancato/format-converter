import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Cross2Icon,
  Pencil2Icon,
  PlusCircledIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { Dropzone } from "@/components/dropzone";
import { toast } from "sonner";
import { download } from "@/lib/utils";

export const configSchema = z.array(
  z.object({
    property: z.string(),
    width: z.coerce.number(),
  }),
);

const parserConfigSchema = z.object({
  config: z.array(
    z.object({
      property: z.string(),
      width: z.coerce.number(),
    }),
  ),
});

interface ParserConfigProps {
  setConfig: React.Dispatch<
    React.SetStateAction<{ property: string; width: number }[]>
  >;
}

export function ButtonParserConfig({ setConfig }: ParserConfigProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof parserConfigSchema>>({
    resolver: zodResolver(parserConfigSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "config",
    control: form.control,
  });

  function onSubmit() {
    setConfig(form.getValues("config"));
    setOpen(false);
  }

  const exportConfig = () => {
    const configStr = JSON.stringify(form.getValues("config"), null, 2);
    download(configStr, "config", "json");
  };

  useEffect(() => {
    if (!files.length) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const obj = JSON.parse(event.target?.result as string);
        const config = configSchema.parse(obj);
        config.forEach((item) => {
          append(item);
        });
      } catch (error) {
        toast.error("Invalid Config", {
          description: "The selected file is not a valid config.",
        });
      }
    };
    reader.readAsText(files[files.length - 1]);
  }, [files]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full border-dashed">
          <Pencil2Icon className="mr-2" />
          Configure Parser
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[800px]">
        <DialogHeader>
          <DialogTitle>Parser Config</DialogTitle>
          <DialogDescription className="flex flex-row items-center gap-x-1">
            Define the fields and their widths.
            <Button
              className="ml-auto w-1/5"
              onClick={() => form.handleSubmit(onSubmit)()}
            >
              Save
            </Button>
            <Button size="icon" onClick={() => exportConfig()}>
              <Share2Icon />
            </Button>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormLabel className="grid grid-cols-7 gap-x-1">
              <span className="col-span-5">Field</span>
              <span>Width</span>
            </FormLabel>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-7 gap-x-1 items-center"
              >
                <FormField
                  control={form.control}
                  name={`config.${index}.property`}
                  render={({ field }) => (
                    <FormItem className="col-span-5">
                      <FormControl>
                        <Input {...field} placeholder="Field" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`config.${index}.width`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Width"
                          type="number"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Cross2Icon
                  className="hover:text-destructive mx-auto opacity-70"
                  onClick={() => remove(index)}
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full border-dashed"
              onClick={(event) => {
                event.preventDefault();
                append({ property: "", width: 0 });
              }}
            >
              <PlusCircledIcon className="mr-2" />
              Add Field
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <Dropzone onChange={setFiles} fileExtension=".json" showInfo={false} />
      </DialogContent>
    </Dialog>
  );
}
