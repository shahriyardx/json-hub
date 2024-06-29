import type { JsonForm } from "@/types/json"
import { ChevronDown, ChevronUp, Trash } from "lucide-react"
import {
	type Control,
	type UseFormRegister,
	useFieldArray,
} from "react-hook-form"
import LabledInput from "./LabledInput"

type Props = {
	control: Control<JsonForm>
	register: UseFormRegister<JsonForm>
	nestIndex: number
	reqNestIndex: number
}

const SubRequirements = ({
	nestIndex,
	reqNestIndex,
	control,
	register,
}: Props) => {
	const { fields, remove, append, swap } = useFieldArray({
		control,
		name: `sections.${nestIndex}.requirements.${reqNestIndex}.subRequirements`,
	})

	return (
		<>
			{fields.length > 0 ? (
				<div className="relative p-5 mt-3 overflow-hidden rounded-md bg-zinc-500 border-zinc-400">
					<span className="absolute top-0 left-0 p-2 text-xs text-white rounded-br-md bg-zinc-600">
						Sub Requirements
					</span>
					<div className="flex flex-col gap-5 mt-5">
						{fields.map((item, index) => {
							return (
								<div
									key={item.id}
									className="grid grid-cols-[28px,auto,28px] gap-3"
								>
									<div className="flex flex-col gap-1">
										<button
											type="button"
											onClick={() => {
												if (index !== 0) {
													swap(index, index - 1)
												}
											}}
											className="grid text-white rounded-full bg-zinc-600 w-7 h-7 place-items-center"
										>
											<ChevronUp size={14} />
										</button>
										<button
											type="button"
											onClick={() => {
												if (index < fields.length - 1) {
													swap(index, index + 1)
												}
											}}
											className="grid text-white rounded-full bg-zinc-600 w-7 h-7 place-items-center"
										>
											<ChevronDown size={14} />
										</button>
									</div>
									<div>
										<div className="grid grid-cols-6 gap-3">
											<LabledInput label={"Description"} className="col-span-3">
												<input
													{...register(
														`sections.${nestIndex}.requirements.${reqNestIndex}.subRequirements.${index}.description`,
													)}
													placeholder="Description"
													className="w-full"
												/>
											</LabledInput>
											<LabledInput label={"Number"}>
												<input
													{...register(
														`sections.${nestIndex}.requirements.${reqNestIndex}.subRequirements.${index}.number`,
													)}
													placeholder="Number"
													className="w-full"
												/>
											</LabledInput>
											<LabledInput label={"Okay Message"}>
												<input
													{...register(
														`sections.${nestIndex}.requirements.${reqNestIndex}.subRequirements.${index}.okayMessage`,
													)}
													placeholder="OKay Message"
													className="w-full"
												/>
											</LabledInput>
											<LabledInput label={"Not Okay Message"}>
												<input
													{...register(
														`sections.${nestIndex}.requirements.${reqNestIndex}.subRequirements.${index}.notOkayMessage`,
													)}
													placeholder="Not Okay Message"
													className="w-full"
												/>
											</LabledInput>
										</div>
									</div>

									<div className="mt-6">
										<button
											type="button"
											onClick={() => remove(index)}
											className="grid text-white bg-red-500 rounded-full w-7 h-7 place-items-center"
										>
											<Trash size={14} />
										</button>
									</div>
								</div>
							)
						})}
					</div>

					<div className="mt-3">
						<button
							type="button"
							onClick={() =>
								append({
									okayMessage: "okay",
									notOkayMessage: "not okay",
									description: "",
									number: "",
								})
							}
							className="px-3 py-2 text-xs text-white rounded-md bg-zinc-600"
						>
							Add Another
						</button>
					</div>
				</div>
			) : (
				<>
					<button
						type="button"
						className="px-2 py-2 mt-2 text-xs rounded-md bg-zinc-600"
						onClick={() =>
							append({
								okayMessage: "okay",
								notOkayMessage: "not okay",
								description: "",
								number: "",
							})
						}
					>
						Add Sub Requirement
					</button>
				</>
			)}
		</>
	)
}

export default SubRequirements
