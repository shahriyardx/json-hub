import JSONForm from "@/components/forms/json"
import DashboardLayout from "@/components/layouts/dashboard-layout"

import React from "react"

const JsoncreatePage = () => {
	return (
		<DashboardLayout title="Create JSON">
			<JSONForm />
		</DashboardLayout>
	)
}

export default JsoncreatePage
