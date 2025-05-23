import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faq: Map<string, string> = new Map();

faq.set(
	"Qual é o prazo médio para entrega de um projeto?",
	"O prazo varia conforme a complexidade e escopo do projeto. Projetos simples, como landing pages, podem levar de 1 a 2 semanas. Sistemas mais robustos exigem etapas como discovery, design e desenvolvimento, podendo levar de 1 a 3 meses.",
);
faq.set(
	"Vocês atendem empresas de qualquer porte ou segmento?",
	"Sim! Atuamos com empresas de todos os tamanhos e setores. Nossas soluções são adaptáveis à realidade e às necessidades específicas de cada cliente.",
);
faq.set(
	"Posso contratar apenas o design ou apenas o desenvolvimento?",
	"Claro. Oferecemos serviços modulares — você pode contratar apenas o que precisa, como UI/UX, back-end, front-end, integrações ou suporte técnico.",
);
faq.set(
	"Como funciona o suporte após a entrega do projeto?",
	"Após a entrega, oferecemos períodos de garantia e também planos de manutenção contínua, caso deseje suporte técnico, atualizações ou melhorias contínuas.",
);

export function FaqAccordion() {
	return (
		<Accordion type="single" collapsible>
			{faq
				.entries()
				.toArray()
				.map(([key, value]) => (
					<AccordionItem key={key} value={value}>
						<AccordionTrigger>
							<p className="font-medium text-lg text-title">{key}</p>
						</AccordionTrigger>
						<AccordionContent>
							<p className="text-description text-base">{value}</p>
						</AccordionContent>
					</AccordionItem>
				))}
		</Accordion>
	);
}
