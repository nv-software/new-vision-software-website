import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";

const Circle = forwardRef<
	HTMLDivElement,
	{ className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
	return (
		<div className="relative">
			<p className="absolute left-1/2 transform -translate-x-1/2 bottom-[14px] text-xs font-foreground">
				{children}
			</p>
			<div
				ref={ref}
				className={cn(
					"z-10 rounded-full size-3 bg-muted-foreground",
					className,
				)}
			/>
		</div>
	);
});

Circle.displayName = "Circle";

export function OurWorkflow() {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	const div3Ref = useRef<HTMLDivElement>(null);
	const div4Ref = useRef<HTMLDivElement>(null);
	const div5Ref = useRef<HTMLDivElement>(null);
	const div6Ref = useRef<HTMLDivElement>(null);

	return (
		<div
			className="relative select-none flex w-full items-center justify-center overflow-hidden p-10"
			ref={containerRef}
		>
			<div className="flex size-full flex-col items-stretch justify-between gap-10">
				<div className="flex flex-row justify-between">
					<Circle ref={div1Ref}>Prospecção</Circle>
					<Circle ref={div2Ref}>Proposta</Circle>
					<Circle ref={div3Ref}>Discovery</Circle>
					<Circle ref={div4Ref}>Execução</Circle>
					<Circle ref={div5Ref}>Entrega</Circle>
					<Circle ref={div6Ref}>Suporte</Circle>
				</div>
			</div>

			<AnimatedBeam
				duration={3}
				containerRef={containerRef}
				fromRef={div1Ref}
				toRef={div2Ref}
			/>
			<AnimatedBeam
				duration={3}
				containerRef={containerRef}
				fromRef={div2Ref}
				toRef={div3Ref}
			/>
			<AnimatedBeam
				duration={3}
				containerRef={containerRef}
				fromRef={div3Ref}
				toRef={div4Ref}
			/>
			<AnimatedBeam
				duration={3}
				containerRef={containerRef}
				fromRef={div4Ref}
				toRef={div5Ref}
			/>
			<AnimatedBeam
				duration={3}
				containerRef={containerRef}
				fromRef={div5Ref}
				toRef={div6Ref}
			/>
		</div>
	);
}
