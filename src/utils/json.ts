import type { AssignmentJSON } from "@/pages/create"

type Req = {
	description: string
	number: string
	message: string
	correct: boolean
}

type ReqKey = `sub_req_${number}`

type MainReq = Req & {
	[key: ReqKey]: Req
}

type Section = {
	[key: `req-${number}`]: MainReq
}

type LegacyJson = Record<string, Section>

const getJsonDataLegacy = (jsonData: LegacyJson) => {
	const sections = []

	for (const sectionName in jsonData) {
		const section = jsonData[sectionName] as Section

		const reqs = Object.keys(section).map(
			(key) => section[key as keyof typeof section],
		) as MainReq[]

		const requirements = reqs.map((requirement) => {
			const subs = Object.keys(requirement)
				.filter((key) => key.startsWith("sub_req_"))
				.map((key) => requirement[key as keyof typeof requirement]) as Req[]

			const subreqs = subs.map((sub) => ({
				description: sub.description,
				number: sub.number,
				correct: true,
				okayMessage: "okay",
				notOkayMessage: "noy okay",
			}))

			const reqData = {
				data: {
					description: requirement.description,
					number: requirement.number,
					correct: requirement.correct,
					okayMessage: "okay",
					notOkayMessage: "not okay",
				},
				subRequirements: subreqs,
			}

			return reqData
		})

		sections.push({
			name: sectionName,
			requirements,
		})
	}

	return { sections: sections }
}

export const getJsonData = (json: Record<string, any>) => {
	if (json.type === "new") {
		return json
	}

	return getJsonDataLegacy(json)
}

export const loadJson = ({
	file,
	onload,
}: {
	file: File
	onload: (data: Record<string, string | object | number>) => void
}) => {
	const reader = new FileReader()

	reader.onloadend = () => {
		const content = reader.result
		const jsonData = JSON.parse(content as string)
		onload(jsonData)

		try {
			// @ts-expect-error
			importRef.current?.reset()
		} catch {
			console.log("Failed to reset imput form")
		}
	}

	reader.readAsText(file)
}

export const download = (json: object | string, filename: string) => {
	const jsonString =
		typeof json === "object" ? JSON.stringify(json, null, 2) : json

	const blob = new Blob([jsonString], { type: "application/json" })

	const a = document.createElement("a")
	a.href = window.URL.createObjectURL(blob)
	if (filename) {
		a.download = `${filename.replaceAll(".json", "")}.json`
	} else {
		a.download = "file.json"
	}

	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}

export const toLegacy = (data: AssignmentJSON & { type?: string }) => {
	const json: LegacyJson = {}

	for (const section of data.sections) {
		const sectionJson: Section = {}
		const requirements = section.requirements
		for (const requirementIndex in requirements) {
			const requirement = requirements[requirementIndex]!
			const requirementJson: MainReq = {
				description: requirement.data.description,
				number: String(requirement.data.number),
				correct: true,
				message: requirement.data.notOkayMessage,
			}
			const subRequirements = requirement.subRequirements

			for (const subRequirementIndex in subRequirements) {
				const subRequirement = subRequirements[subRequirementIndex]!
				const req_name =
					`sub_req_${((Number(requirementIndex) + 1) * 10) + Number(subRequirementIndex) + 1}` as ReqKey

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

	return json
}
