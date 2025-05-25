import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { cn } from "@/lib/utils";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { useHookFormMask } from "use-mask-input";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(2, "Mínimo de 2 caracteres"),
  company: z.string().nullable(),
  phone: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(11, "Insira um telefone valido"),
  context: z
    .string({
      required_error: "Campo obrigatório",
    })
    .nonempty({
      message: "Campo obrigatório",
    }),
  message: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(2, "Mínimo de 2 caracteres"),
});

export function ContactForm() {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: "",
      context: "",
      name: "",
      phone: "",
    },
  });

  const registerWithMask = useHookFormMask(form.register);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Event has been created.");
    console.log(data);
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step !== 2) {
      const valid = await form.trigger(["name", "company", "phone"]);
      if (!valid) return;
      return setStep(2);
    }

    return form.handleSubmit(onSubmit)(event);
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={submitForm}>
          <div className="stack">
            {/* STEP 1 */}
            <div
              data-step={step}
              className={cn(
                "space-y-4",
                "data-[step=1]:animate-in data-[step=2]:animate-out",
                "fade-in fade-out",
                "data-[step=2]:[animation-fill-mode:forwards]",
                "data-[step=2]:[animation-direction:normal]",
                "data-[step=2]:pointer-events-none",
                "duration-300"
              )}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Se estiver representando uma empresa, insira o nome aqui"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone para contato</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(XX) 99999-9999"
                        {...registerWithMask("phone", ["(99) 99999-9999"], {
                          autoUnmask: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* STEP 1 */}
            {/* STEP 2 */}
            <div
              data-step={step}
              className={cn(
                "space-y-4",
                "data-[step=2]:animate-in data-[step=1]:animate-out",
                "fade-in fade-out",
                "data-[step=1]:[animation-fill-mode:forwards]",
                "data-[step=1]:[animation-direction:normal]",
                "data-[step=1]:pointer-events-none",
                "duration-300",
                "flex flex-col"
              )}
            >
              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Como podemos ajudar?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Desenvolvimento de site institucional",
                          "Criação de landing page",
                          "Desenvolvimento de aplicativo mobile",
                          "Integração com APIs e automações",
                          "Design UX/UI",
                          "Consultoria ou discovery",
                          "Manutenção ou suporte técnico",
                          "Projeto com Inteligência Artificial",
                          "Outro assunto",
                        ].map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="h-full grid grid-rows-[max-content_1fr]">
                    <FormLabel>Fale mais sobre sua ideia</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte com detalhes o que você está planejando. Quanto mais informação, melhor poderemos ajudar."
                        className="resize-none h-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* STEP 2 */}
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-muted-foreground">{step}/2</p>
            <div className="space-x-2">
              <Button
                data-step={step}
                className="data-[step=1]:hidden fade-in duration-300"
                variant="outline"
                onClick={() => setStep(1)}
                type="button"
              >
                Voltar
              </Button>
              <Button type="submit">Avançar</Button>
            </div>
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
