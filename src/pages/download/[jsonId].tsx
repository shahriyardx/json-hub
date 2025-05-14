import type { JsonUpload } from "@/components/forms/json-upload/types"
import { db } from "@/server/db"
import { download } from "@/utils/json"
import { kebabCase } from "lodash"
import type { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect } from "react"

const DashboardPage = ({ data }: { data: JsonUpload }) => {
	useEffect(() => {
		download(
			data.data,
			kebabCase(
				`${data.batch} ${data.assignment} ${data.category ? `category ${data.category}` : ``}`,
			),
		)
	}, [data])

	return (
		<>
			<Head>
				<title>
					{data.batch} - {data.assignment}
				</title>
				<meta
					name="description"
					content={`${data.batch}\n${data.assignment}\n${data.category || ""}`}
				/>
			</Head>
			<div className="p-5">Download will start soon...</div>
		</>
	)
}

export default DashboardPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const jsonData = await db.jsonData.findFirst({
		where: {
			id: query.jsonId as string,
		},
		include: {
			user: true,
			assignment: true,
			batch: true,
		},
	})

	if (!jsonData) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}

	return {
		props: {
			data: {
				batch: jsonData.batch.name,
				assignment: jsonData.assignment.name,
				category: jsonData.category,
				data: jsonData.data,
			},
		},
	}
}
