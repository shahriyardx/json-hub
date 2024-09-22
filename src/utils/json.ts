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
