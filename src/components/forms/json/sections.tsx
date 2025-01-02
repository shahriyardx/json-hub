import React, { useContext } from "react"
import type { AssignmentJSON } from "."
import { useFieldArray, type UseFormReturn } from "react-hook-form"
import {
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
import { marksContext, type MarksContextProps } from "@/context/marks-context"

type Props = {
	form: UseFormReturn<AssignmentJSON>
}

const Sections = ({ form }: Props) => {
	const { removeReq } = useContext(marksContext) as MarksContextProps
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "sections",
	})

	return (
		<div>
			{fields.length === 0 && (
				<div>
					<Button
						type="button"
						variant="secondary"
						onClick={() =>
							append({
								name: "",
								requirements: [],
							})
						}
					>
						Add Section
					</Button>
				</div>
			)}

			<div className="space-y-5">
				{fields.map((section, index) => (
					<div
						key={section.id}
						className="rounded-md border p-5 relative group"
					>
						<Button
							onClick={() => {
								remove(index)
								removeReq(`sections.${index}`)
							}}
							size="icon"
							variant="destructive"
							className="absolute top-0 right-0 rounded-md rounded-bl-full hidden group-hover:flex"
						>
							<Trash size={15} className="-mt-2 ml-1" />
						</Button>
						<FormField
							control={form.control}
							name={`sections.${index}.name`}
							render={({ field }) => (
								<FormItem>
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
				))}
			</div>

			{fields.length > 0 && (
				<div className="mt-5">
					<Button
						variant="secondary"
						type="button"
						onClick={() =>
							append({
								name: "",
								requirements: [],
							})
						}
					>
						Add Section
					</Button>
				</div>
			)}
		</div>
	)
}

export default Sections
