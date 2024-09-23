type HasName = {
	name: string
}

export const sortByName = (a: HasName, b: HasName) => {
	const numA = Number.parseInt(a.name.split(" ")[1] || "")
	const numB = Number.parseInt(b.name.split(" ")[1] || "")

	if (Number.isNaN(numA) && Number.isNaN(numB))
		return a.name.localeCompare(b.name)

	if (Number.isNaN(numA)) return 1

	if (Number.isNaN(numB)) return -1

	return numA - numB
}
