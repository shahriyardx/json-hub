import JsonUploadForm from "@/components/forms/json-upload"
import {
	JsonUploadSchema,
	type JsonUpload,
} from "@/components/forms/json-upload/types"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import useParams from "@/hooks/useParams"
import { db } from "@/server/db"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import type { GetServerSideProps } from "next"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const DashboardPage = ({ data }: { data: JsonUpload }) => {
	const { jsonId } = useParams<{ jsonId: string }>()
	const form = useForm<JsonUpload>({
		resolver: zodResolver(JsonUploadSchema),
		defaultValues: {
			...data,
			category: data.category || "",
		},
	})

	const { mutate: updateJson } = api.assignmentJson.update.useMutation({
		onSuccess: () => {
			toast.success("JSON updated")
		},
	})

	return (
		<DashboardLayout title="Add JSON">
			<JsonUploadForm
				type="update"
				form={form}
				submitHandler={(data) =>
					updateJson({
						data,
						id: jsonId,
					})
				}
			/>
		</DashboardLayout>
	)
}

export default DashboardPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const jsonData = await db.jsonData.findFirst({
		where: {
			id: query.jsonId as string,
		},
	})

	if (!jsonData) {
		return {
			redirect: {
				destination: "/dashboard/json",
				permanent: false,
			},
		}
	}

	return {
		props: {
			data: {
				batch: jsonData.batchId,
				assignment: jsonData.assignmentId,
				category: jsonData.category,
				data: jsonData.data,
			},
		},
	}
}
