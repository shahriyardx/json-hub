const getJsonDataLegacy = (
	jsonData: Record<string, object | string | number>,
) => {
	const sections = []

	for (const sectionName in jsonData) {
		const requirements = Object.values(jsonData[sectionName]).map(
			(requirement) => {
				const subreqs = []
				for (const key in requirement) {
					if (key.startsWith("sub_req_")) {
						subreqs.push({
							...requirement[key],
							okayMessage: "okay",
							notOkayMessage: "not okay",
						})
					}
				}
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
			},
		)

		sections.push({
			name: sectionName,
			requirements,
		})
	}

	return { sections: sections }
}

export const getJsonData = (json: Record<string, object | string | number>) => {
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
	a.download = `${filename.replaceAll(".json", "")}.json`

	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}
