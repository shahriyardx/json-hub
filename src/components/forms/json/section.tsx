import React from "react"
import type { AssignmentJSON } from "@/pages/create"
import {
	useFieldArray,
	type UseFieldArrayReturn,
	type FieldArrayWithId,
	type UseFormReturn,
} from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Requirements from "./requirements"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

type Props = {
	form: UseFormReturn<AssignmentJSON>
	sections: UseFieldArrayReturn<AssignmentJSON, "sections", "id">
	section: FieldArrayWithId<AssignmentJSON, "sections", "id">
	index: number
}

const Section = ({ form, sections, section, index }: Props) => {
	return (
		<div key={section.id} className="rounded-md border p-5 relative">
			<Button
				onClick={() => sections.remove(index)}
				size="icon"
				variant="destructive"
				className="absolute top-0 right-0 rounded-md rounded-bl-full"
			>
				<Trash size={15} className="-mt-2 ml-1" />
			</Button>
			<FormField
				control={form.control}
				name={`sections.${index}.name`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Section Name</FormLabel>
						<FormControl>
							<Input placeholder="Section Name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="mt-3">
				<Requirements form={form} sectionIndex={index} />
			</div>
		</div>
	)
}

export default Section
