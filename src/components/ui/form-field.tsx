import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField as ShadcnFormField,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { ComponentProps, HTMLAttributes } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "./input";

export function FormField<T extends FieldValues>({
	control,
	label,
	name,
	required = false,
	className,
	textarea = false,
	...params
}: {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	textarea?: boolean;
	className?: HTMLAttributes<"input">["className"];
	required?: boolean;
} & Partial<Omit<ComponentProps<"input">, "name" | "defaultValue">>) {
	return (
		<ShadcnFormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					<FormLabel>
						<p>
							{label}
							{required && <span className="text-red-500">*</span>}
						</p>
					</FormLabel>
					<FormControl>
						{textarea ? (
							// @ts-ignore
							<Textarea {...params} {...field} />
						) : (
							<Input {...params} {...field} />
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
