import React from "react"
import type { AssignmentJSON } from "@/pages/create"
import { useFieldArray, type UseFormReturn } from "react-hook-form"
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
	form: UseFormReturn<AssignmentJSON>
	sectionIndex: number
	requirementIndex: number
}

const SubRequirement = ({ form, sectionIndex, requirementIndex }: Props) => {
	const { fields, append, remove, swap } = useFieldArray({
		control: form.control,
		name: `sections.${sectionIndex}.requirements.${requirementIndex}.subRequirements`,
	})

	return (
		<div className={cn(fields.length > 0 ? "mt-3" : "")}>
			{fields.length > 0 && <p>Sub Requirements</p>}
			<div
				className={cn(
					"pl-5 border-l-2 border-zinc-500 space-y-2",
					fields.length > 0 ? "mt-2" : "",
				)}
			>
				{fields.map((req, index) => (
					<div
						key={req.id}
						className="grid grid-cols-[60px_auto] rounded-md border p-5 relative bg-secondary/20"
					>
						<Button
							onClick={() => remove(index)}
							size="icon"
							variant="destructive"
							type="button"
							className="absolute top-0 right-0 rounded-md rounded-bl-full"
						>
							<Trash size={15} className="-mt-2 ml-1" />
						</Button>
						<div className="flex flex-col gap-2">
							<Button
								type="button"
								size="icon"
								variant="outline"
								disabled={!index}
								onClick={() => swap(index, index - 1)}
							>
								<ChevronUp size={15} />
							</Button>

							<Button
								size="icon"
								variant="outline"
								type="button"
								disabled={index === fields.length - 1}
								onClick={() => swap(index, index + 1)}
							>
								<ChevronDown size={15} />
							</Button>
						</div>
						<div className="grid grid-cols-6 gap-5">
							<FormField
								control={form.control}
								name={`sections.${sectionIndex}.requirements.${requirementIndex}.subRequirements.${index}.description`}
								render={({ field }) => (
									<FormItem className="col-span-3">
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder="Description" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`sections.${sectionIndex}.requirements.${requirementIndex}.subRequirements.${index}.number`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Marks</FormLabel>
										<FormControl>
											<Input placeholder="Marks" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`sections.${sectionIndex}.requirements.${requirementIndex}.subRequirements.${index}.okayMessage`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Okay Message</FormLabel>
										<FormControl>
											<Input placeholder="Okay Message" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`sections.${sectionIndex}.requirements.${requirementIndex}.subRequirements.${index}.notOkayMessage`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Not Okay Message</FormLabel>
										<FormControl>
											<Input placeholder="Not Okay Message" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				))}
			</div>

			<div className={cn("flex justify-end", fields.length > 0 ? "mt-2" : "")}>
				<Button
					onClick={() =>
						append({
							description: "",
							number: 0,
							correct: true,
							okayMessage: "okay",
							notOkayMessage: "not okay",
						})
					}
					variant="outline"
					type="button"
					size="sm"
				>
					<Plus size={15} className="mr-2" /> Sub Requirement
				</Button>
			</div>
		</div>
	)
}

export default SubRequirement
