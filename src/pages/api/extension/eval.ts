import type { NextApiRequest, NextApiResponse } from "next"
import * as acorn from "acorn"
import * as walker from "acorn-walk"
import assert from "node:assert"

type Tc = { input: any[]; output: any; type: "output" | "validation" }

type JsonFunction = {
	name: string
	testCases: Tc[]
}

type JsonData = {
	type: "code"
	functions: JsonFunction[]
}

const bold = (text: string) => `<strong>${text}</strong>`

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "OPTIONS") {
		return res.status(200).send("ok")
	}

	const { code, jsonData } = req.body as { code: string; jsonData: JsonData }
	const validFunctionNames = jsonData.functions.map((fn) => fn.name)

	const functions: Record<string, any> = {}

	let ast
	try {
		ast = acorn.parse(code, { ecmaVersion: 2020 })
	} catch {
		return res.json({
			feedback:
				"<strong>There is a syntax error in your code. Please fix that and recheck</strong>",
			marks: 0,
		})
	}

	walker.simple(ast, {
		FunctionDeclaration(node) {
			if (node.id) {
				if (validFunctionNames.includes(node.id.name)) {
					const functionName = node.id.name
					const functionString = code.slice(node.start, node.end)
					// biome-ignore lint/security/noGlobalEval: this is required
					functions[functionName] = eval(`(${functionString})`)
				}
			}
		},
	})

	let feedback = ""

	let totalMarks = 0

	for (const fn of jsonData.functions) {
		const func = functions[fn.name]
		const funcFeedback = validateFunction(fn, func)

		feedback += `${funcFeedback.feedback}\n`
		totalMarks += funcFeedback.gainedMarks
	}

	return res.json({ feedback, totalMarks })
}

const validateFunction = (fn: JsonFunction, func: any) => {
	let gainedMarks = 0
	if (!func)
		return {
			feedback: `<strong>${fn.name}</strong>: function not found. Please check if the spelling is correct`,
			gainedMarks,
		}

	let allTestCasesPassed = true
	let validationPassed = true
	let testCasesPassed = 0
	let failedTestCase

	fn.testCases.forEach((tc) => {
		let output

		// Try executing function
		try {
			output = Array.isArray(tc.input) ? func(...tc.input) : func(tc.input)
		} catch (err) {
			return {
				feedback: `<strong>${fn.name}</strong>: Error occured while executing this function. Please fix your code`,
				gainedMarks,
			}
		}

		// Check if correct
		if (tc.type === "output") {
			try {
				assert.deepStrictEqual(output, tc.output)
				testCasesPassed += 1
			} catch {
				allTestCasesPassed = false
				failedTestCase = {
					tc: {
						...tc,
						input: JSON.stringify(tc.input),
						output: JSON.stringify(tc.output),
					},
					output,
				}
			}
		}

		if (tc.type === "validation") {
			if (typeof tc.output !== typeof output) {
				validationPassed = false
				failedTestCase = {
					tc: {
						...tc,
						input: JSON.stringify(tc.input),
						output: JSON.stringify(tc.output),
					},
					output,
				}
			}
		}
	})

	let finalFeedback = ""
	const feedbacks = []

	if (allTestCasesPassed) {
		gainedMarks += 10
		feedbacks.push(`‎ ‎ ├ 🏆 Nice, ${fn.name} is working perfectly!`)
	} else {
		if (testCasesPassed > 0) {
			gainedMarks += 3
			feedbacks.push(
				"‎ ‎ ├ 😞 Good job! But need improvement! Partial marks given",
			)
		} else {
			feedbacks.push("‎ ‎ ├ ❌ Wrong output.")
		}
	}

	if (validationPassed) {
		gainedMarks += 2
		feedbacks.push(
			`‎ ‎ ${failedTestCase ? "├" : "└"} You got bonus mark for validation.`,
		)
	} else {
		feedbacks.push(`‎ ‎ ${failedTestCase ? "├" : "└"} Validation not working.`)
	}

	if (failedTestCase) {
		const { tc, output } = failedTestCase as { tc: Tc; output: any }
		feedbacks.push(
			`‎ ‎ └ Failed test case -> \n‎ ‎ ‎ ‎ ${bold("├ Input:")} ${tc.input}\n‎ ‎ ‎ ‎ ${bold("├ Expected Output:")} ${tc.output}\n‎ ‎ ‎ ‎ ${bold("└ Output:")} ${JSON.stringify(output)}`,
		)
	}

	finalFeedback += `<strong>${fn.name}</strong>:\n${feedbacks.join("\n")}\n`

	return {
		feedback: finalFeedback,
		gainedMarks,
	}
}
