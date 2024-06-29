import ExportModal from "@/components/ExportModal"
import LabledInput from "@/components/LabledInput"
import Layout from "@/components/layout"
import Sections from "@/components/Sections"
import type { JsonForm } from "@/types/json"
import { useState } from "react"
import { useForm } from "react-hook-form"

function App() {
	const { reset, control, register, handleSubmit, getValues } =
		useForm<JsonForm>({
			defaultValues: { sections: [], highestMark: 60, include: true },
		})
	const [open, setOpen] = useState(false)
	const [filename, setFilename] = useState<string>("")

	const download = (json: object) => {
		const jsonString = JSON.stringify(json, null, 2)
		const blob = new Blob([jsonString], { type: "application/json" })

		if (!filename) return alert("Please enter a filename")

		const a = document.createElement("a")
		a.href = window.URL.createObjectURL(blob)
		a.download = `${filename.replaceAll(".json", "")}.json`

		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	const onSubmit = (data: JsonForm) => {
		const json = {
			type: "new",
			...data,
		}

		download(json)
	}

	const onSubmitLegacy = (data: JsonForm) => {
		const json: Record<string, Record<string, object>> = {}

		for (const section of data.sections) {
			const sectionJson: Record<string, object> = {}
			const requirements = section.requirements
			for (const requirementIndex in requirements) {
				const requirement = requirements[requirementIndex]
				const requirementJson: Record<string, string | boolean | object> = {
					description: requirement.data.description,
					number: String(requirement.data.number),
					correct: true,
					message: requirement.data.notOkayMessage,
				}
				const subRequirements = requirement.subRequirements

				for (const subRequirementIndex in subRequirements) {
					const subRequirement = subRequirements[subRequirementIndex]
					const req_name = `sub_req_${Number(requirementIndex) + 1}${
						Number(subRequirementIndex) + 1
					}`

					const subReqJson = {
						description: subRequirement.description,
						number: String(subRequirement.number),
						correct: true,
						message: data.include
							? subRequirement.notOkayMessage === "not okay" ||
								subRequirement.notOkayMessage === "not okay."
								? `${subRequirement.description} -> ${requirement.data.notOkayMessage}`
								: subRequirement.notOkayMessage
							: requirement.data.notOkayMessage,
					}
					requirementJson[req_name] = subReqJson
				}
				sectionJson[`req-${Number(requirementIndex) + 1}`] = requirementJson
			}
			json[section.name.trim().replaceAll(" ", "-")] = sectionJson
		}

		download(json)
	}

	return (
		<Layout>
			<div className="container px-5 pt-10 pb-5 mx-auto">
				<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
					<Sections control={control} register={register} reset={reset} />

					<div className="mt-5 grid grid-cols-[200px,auto] gap-5 p-5 border border-zinc-500 rounded-md">
						<LabledInput>
							<input
								{...register("highestMark")}
								className="w-full bg-zinc-800"
								placeholder="Highest Mark"
							/>
						</LabledInput>

						<div className="flex flex-col justify-center">
							<div className="flex items-center gap-3">
								<input
									id="include"
									type="checkbox"
									defaultChecked
									{...register("include")}
								/>
								<label htmlFor="include">
									include description for sub requirements
								</label>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 mt-5">
						<button
							type="button"
							className="px-5 py-3 text-white bg-zinc-700 rounded-md"
							onClick={() => setOpen(true)}
						>
							Export
						</button>

						<button
							type="button"
							onClick={() => reset({ sections: [] })}
							className="px-5 py-3 text-white rounded-md"
						>
							reset
						</button>
					</div>
				</form>

				<ExportModal
					open={open}
					setOpen={setOpen}
					filename={filename as string}
					setFilename={setFilename}
					getValues={getValues}
					onSubmitLegacy={onSubmitLegacy}
					onSubmit={onSubmit}
				/>
			</div>
		</Layout>
	)
}

export default App
