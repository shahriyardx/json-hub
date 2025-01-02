import React, { createContext, useEffect, useState } from "react"

export type MarksContextProps = {
	marks: number
	addReqs: (key: string, value: number) => void
	removeReq: (key: string) => void
	setMarks: (value: number) => void
	setRequirements: (value: Record<string, number>) => void
}

export const marksContext = createContext<MarksContextProps | null>(null)

export const TotalMarksProvider = ({ children }: any) => {
	const [marks, setMarks] = useState(0)
	const [requirements, setRequirements] = useState<Record<string, number>>({})

	const addReqs = (key: string, value: number) => {
		const oldReqs = { ...requirements }
		oldReqs[key] = value
		setRequirements(oldReqs)
	}

	const removeReq = (key: string) => {
		const oldReqs = { ...requirements }

		for (const item of Object.keys(oldReqs)) {
			if (item.includes(key)) {
				delete oldReqs[item]
			}
		}

		setRequirements(oldReqs)
	}

	useEffect(() => {
		const m = Object.values(requirements).reduce((a, b) => a + b, 0)
		setMarks(m)
	}, [requirements])

	return (
		<marksContext.Provider
			value={{
				marks,
				addReqs,
				removeReq,
				setMarks,
				setRequirements,
			}}
		>
			{children}
		</marksContext.Provider>
	)
}
