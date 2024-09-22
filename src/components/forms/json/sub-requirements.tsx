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
import { ChevronDown, ChevronUp, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

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
		<div>
			{fields.length > 0 && <p>Sub Requirements</p>}
			<div className="mt-2 pl-5 border-l-2">
				{fields.map((req, index) => (
					<div
						key={req.id}
						className="mt-2 grid grid-cols-[60px_auto] rounded-md border p-5 relative bg-secondary/20"
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
				className="mt-2"
			>
				Add Sub Requirement
			</Button>
		</div>
	)
}

export default SubRequirement