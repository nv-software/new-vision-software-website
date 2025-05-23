import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "O nome deve ter pelo menos 2 caracteres.",
	}),
	email: z.string().email({
		message: "Insira um e-mail válido.",
	}),
	company: z.string().min(2, {
		message: "O nome da empresa deve ter pelo menos 2 caracteres.",
	}),
	topic: z.string(),
	message: z.string(),
});

export const ContactForm: FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			company: "",
			email: "",
			message: "",
			topic: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				className="grid grid-cols-1 grid-rows-[1fr] lg:grid-cols-2 gap-4"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					required={true}
					control={form.control}
					name="name"
					label="Seu nome"
					placeholder="Escreva o seu nome"
					autoComplete="off"
				/>
				<FormField
					required={true}
					control={form.control}
					name="email"
					label="Seu e-mail"
					placeholder="Escreva o seu e-mail"
					autoComplete="off"
				/>
				<FormField
					required={true}
					control={form.control}
					placeholder="Escreva o nome da sua empresa"
					name="company"
					label="Sua empresa"
					autoComplete="off"
				/>
				<FormField
					placeholder="Selecione o assunto"
					control={form.control}
					name="topic"
					label="Assunto"
					autoComplete="off"
				/>
				<FormField
					textarea={true}
					placeholder="Escreva a sua mensagem"
					control={form.control}
					name="message"
					label="Mensagem"
					className="col-span-1 lg:col-span-2"
					autoComplete="off"
				/>
				<p className="col-span-1 lg:col-span-2 text-description text-sm">
					Um de nossos especialistas entrará em contato o quanto antes.
				</p>
				<div className="place-self-end col-span-1 lg:col-span-2">
					<Button type="submit">Enviar mensagem</Button>
				</div>
			</form>
		</Form>
	);
};
