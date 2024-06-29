// const detectIndentation = (line) => {
// 	const match = line.match(/^\s+/)
// 	return match ? match[0].length : 0
// }

// const parseTextToJSON = (text) => {
// 	const data = {
// 		sections: [],
// 	}

// 	const lines = text.trim().split("\n")

// 	let currentSection = null
// 	let currentRequirement = null
// 	let currentSubRequirement = null

// 	for (const lineIndex in lines) {
// 		const line = lines[lineIndex]
// 		if (!line.trim() || !line.trim().startsWith("-")) continue

// 		const indentation = detectIndentation(line)
// 		if (indentation === 0) {
// 			if (currentSection) {
// 				data.sections.push(currentSection)
// 				currentSection = null
// 			}

// 			currentSection = {
// 				name: line.slice(1).trim(),
// 				requirements: [],
// 			}
// 		}

// 		if (indentation === 4) {
// 			currentRequirement = {}
// 			const content = line.trim().slice(1).trim()
// 			const [description, number = "0", message = "not okay"] = content
// 				.split("|")
// 				.map((part) => part.trim())

// 			currentRequirement.data = {
// 				description,
// 				number,
// 				message,
// 			}
// 			currentRequirement.subRequirements = []

// 			currentSection.requirements.push(currentRequirement)
// 		}

// 		if (indentation === 8) {
// 			currentSubRequirement = {}
// 			const content = line.trim().slice(1).trim()
// 			const [description, number = 0, message = "not okay"] = content
// 				.split("|")
// 				.map((part) => part.trim())

// 			currentSubRequirement = {
// 				description,
// 				number,
// 				message,
// 			}

// 			currentRequirement.subRequirements.push(currentSubRequirement)
// 		}
// 	}

// 	if (currentSection) {
// 		data.sections.push(currentSection)
// 	}

// 	return data
// }
