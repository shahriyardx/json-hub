import type { JsonForm } from "@/types/json"
import { Trash } from "lucide-react"
import {
	type Control,
	type UseFormRegister,
	type UseFormReset,
	useFieldArray,
} from "react-hook-form"
import LabledInput from "./LabledInput"
import Requirements from "./Requirements"
import { useRef } from "react"
import { getJsonData, loadJson } from "@/utils/json"

type Props = {
	control: Control<JsonForm>
	reset: UseFormReset<JsonForm>
	register: UseFormRegister<JsonForm>
}

const Sections = ({ control, register, reset }: Props) => {
	const importRef = useRef<HTMLInputElement>(null)
	const { fields, append, remove } = useFieldArray({
		control,
		name: "sections",
	})

	return (
		<div>
			<input
				ref={importRef}
				type="file"
				accept="application/json"
				onChange={(e) => {
					if (e.target.files && e.target.files.length > 0) {
						loadJson({
							file: e.target.files[0],
							onload: (data) => reset(getJsonData(data)),
						})
					}
				}}
				className="hidden"
			/>

			{fields.length === 0 && (
				<div className="grid place-items-center">
					<div className="flex items-center gap-3">
						<button
							type="button"
							className="px-5 py-3 text-white rounded-md bg-zinc-800"
							onClick={() =>
								append({
									name: "",
									requirements: [],
								})
							}
						>
							Add a section
						</button>

						<span>or</span>
						<button
							type="button"
							className="px-5 py-3 text-white rounded-md bg-zinc-800"
							onClick={() => importRef.current?.click()}
						>
							import
						</button>
					</div>
				</div>
			)}

			<div className="flex flex-col gap-5 mt-10">
				{fields.map((item, index) => {
					return (
						<div
							key={item.id}
							className="grid grid-cols-[auto,28px] gap-3 p-5 rounded-md border-zinc-600 bg-zinc-800"
						>
							<div>
								<LabledInput label={"Section Name"}>
									<input
										{...register(`sections.${index}.name`)}
										className="w-full"
										placeholder="Name"
									/>
								</LabledInput>

								<Requirements nestIndex={index} {...{ control, register }} />
							</div>

							<div>
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
				{fields.length > 0 && (
					<div>
						<button
							type="button"
							onClick={() => append({ name: "", requirements: [] })}
							className="px-3 py-2 text-xs text-white rounded-md bg-zinc-700"
						>
							Add Section
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Sections
