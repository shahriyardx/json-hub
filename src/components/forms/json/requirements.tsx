import React, { useContext } from "react"
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
import SubRequirements from "./sub-requirements"
import type { AssignmentJSON } from "."
import RequirementMark from "./requirement-mark"
import { marksContext, type MarksContextProps } from "@/context/marks-context"

type Props = {
	form: UseFormReturn<AssignmentJSON>
	sectionIndex: number
}

const Requirements = ({ form, sectionIndex }: Props) => {
	const { removeReq } = useContext(marksContext) as MarksContextProps
	const { fields, append, remove, swap } = useFieldArray({
		control: form.control,
		name: `sections.${sectionIndex}.requirements`,
	})

	return (
		<div>
			{fields.length > 0 && <p>Requirements</p>}
			<div className="mt-2 space-y-5">
				{fields.map((req, index) => (
					<div key={req.id}>
						<div className="rounded-md border p-5 relative bg-secondary/20 group/req">
							<Button
								onClick={() => {
									remove(index)
									removeReq(`sections.${sectionIndex}.requirements.${index}`)
								}}
								size="icon"
								variant="destructive"
								type="button"
								className="absolute top-0 right-0 rounded-md rounded-bl-full hidden group-hover/req:flex"
							>
								<Trash size={15} className="-mt-2 ml-1" />
							</Button>
							<div className="grid grid-cols-[60px_auto]">
								<div className="flex flex-col gap-2">
									<Button
										size="icon"
										variant="outline"
										type="button"
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
										name={`sections.${sectionIndex}.requirements.${index}.data.description`}
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

									<RequirementMark
										form={form}
										sectionIndex={sectionIndex}
										index={index}
									/>

									<FormField
										control={form.control}
										name={`sections.${sectionIndex}.requirements.${index}.data.okayMessage`}
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
										name={`sections.${sectionIndex}.requirements.${index}.data.notOkayMessage`}
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
							<SubRequirements
								form={form}
								sectionIndex={sectionIndex}
								requirementIndex={index}
								key={req.id}
							/>
						</div>
					</div>
				))}
			</div>

			<Button
				onClick={() =>
					append({
						data: {
							description: "",
							number: 0,
							okayMessage: "okay",
							notOkayMessage: "not okay",
							correct: true,
						},
						subRequirements: [],
					})
				}
				variant="secondary"
				type="button"
				size="sm"
				className="mt-3"
			>
				<Plus size={15} className="mr-2" /> Requirement
			</Button>
		</div>
	)
}

export default Requirements
