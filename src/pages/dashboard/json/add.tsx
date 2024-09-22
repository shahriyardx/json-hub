import JsonUploadForm from "@/components/forms/json-upload"
import {
	JsonUploadSchema,
	type JsonUpload,
} from "@/components/forms/json-upload/types"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"

const DashboardPage = () => {
	const form = useForm<JsonUpload>({
		resolver: zodResolver(JsonUploadSchema),
	})
	const { mutate: uploadJson } = api.assignmentJson.create.useMutation({
		onSuccess: () => {
			form.reset({
				batch: "",
				assignment: "",
			})
		},
	})
	return (
		<DashboardLayout title="Add JSON">
			<JsonUploadForm form={form} submitHandler={uploadJson} />
		</DashboardLayout>
	)
}

export default DashboardPage
