import React, { useEffect, useState } from "react"
import Container from "@/components/shared/container"
import { Badge } from "@/components/ui/badge"
import { DownloadIcon, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { download } from "@/utils/json"
import { kebabCase } from "lodash"
import { toast } from "sonner"
import type { Assignment, AssignmentJson, Batch, User } from "@prisma/client"
import { api } from "@/utils/api"

type Props = {
	json: AssignmentJson & {
		batch: Batch
		assignment: Assignment
		user: User
	}
	onDownload: () => void
}

const JsonCard = ({ json, onDownload }: Props) => {
	const { mutate: incrementDownload } = api.assignmentJson.download.useMutation(
		{
			onSuccess: () => {
				onDownload()
			},
		},
	)
	return (
		<Card key={json.id}>
			<CardHeader>
				<div className="flex gap-2">
					<Avatar className="w-5 h-5">
						<AvatarImage src={json.user.image} />
						<AvatarFallback>GH</AvatarFallback>
					</Avatar>

					<span>{json.user.name}</span>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2">
					<Badge variant="secondary">{json.batch.name}</Badge>
					<Badge variant="secondary">{json.assignment.name}</Badge>
					{json.category && (
						<Badge variant="outline">
							<span>
								{json.category.toLowerCase().includes("category") ||
								json.category.toLowerCase().includes("assignment") ? (
									""
								) : (
									<span>Category </span>
								)}
							</span>
							<span>{json.category}</span>
						</Badge>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<span className="flex items-center gap-2 text-muted-foreground text-sm">
					{json.downloads} Downloads
				</span>

				<div className="flex gap-2 items-center">
					<Button
						size="sm"
						variant="secondary"
						onClick={() => {
							incrementDownload({ id: json.id })
							download(
								json.data,
								kebabCase(
									`${json.batch.name} ${json.assignment.name} ${json.category ? `category ${json.category}` : ``}`,
								),
							)
						}}
					>
						<DownloadIcon className="mr-2" size={15} />
						Download
					</Button>
					<Button
						size="icon"
						variant="outline"
						onClick={() => {
							window.navigator.clipboard.writeText(
								`${window.location.origin}/api/json/${json.id}`,
							)
							toast.success("Link copied to clipboard")
						}}
					>
						<Link size={15} />
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default JsonCard
