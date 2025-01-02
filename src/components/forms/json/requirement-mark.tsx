import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import React, { useContext, useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { AssignmentJSON } from "."
import { Input } from "@/components/ui/input"
import { marksContext, type MarksContextProps } from "@/context/marks-context"
type Props = {
	form: UseFormReturn<AssignmentJSON>
	sectionIndex: number
	index: number
}

const RequirementMark = ({ form, sectionIndex, index }: Props) => {
	const { addReqs, removeReq } = useContext(marksContext) as MarksContextProps
	const watcher = form.watch(
		`sections.${sectionIndex}.requirements.${index}.data.number`,
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: sectionIndex and addReqs in dependencies?
	useEffect(() => {
		if (watcher) {
			addReqs(
				`sections.${sectionIndex}.requirements.${index}`,
				Number.parseInt(String(watcher)),
			)
		} else {
			removeReq(`sections.${sectionIndex}.requirements.${index}`)
		}
	}, [watcher])

	return (
		<FormField
			control={form.control}
			name={`sections.${sectionIndex}.requirements.${index}.data.number`}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Marks</FormLabel>
					<FormControl>
						<Input type="number" placeholder="Marks" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default RequirementMark
