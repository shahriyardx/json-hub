import type { Assignments, Batch, JsonData, User } from "@prisma/client"

export type BaseRequirement = {
	description: string
	number: string
	okayMessage: string
	notOkayMessage: string
}

export type Requirement = {
	data: BaseRequirement
	subRequirements: Array<BaseRequirement>
}

export type JsonSection = {
	name: string
	requirements: Array<Requirement>
}

export type JsonForm = {
	sections: Array<JsonSection>
	highestMark: number
	include: boolean
}

export type JsonResponse = JsonData & {
	batch: Batch
	assignment: Assignments
	user: User
}
