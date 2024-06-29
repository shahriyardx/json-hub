import Container from "@/components/container"
import Layout from "@/components/layout"
import SingleJsonPublic from "@/components/single-json-public"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const Explore = () => {
	const router = useRouter()
	const [batch, setBatch] = useState("")
	const [assignment, setAss] = useState("")
	const [search, setSearch] = useState("")

	useEffect(() => {
		if (router.query.batch) setBatch(router.query.batch as string)
		if (router.query.assignment) setAss(router.query.assignment as string)
	}, [router])

	const { data: jsonData, isFetching } = useQuery({
		queryKey: ["jsond", batch, assignment],
		queryFn: (): Promise<{ data: Record<string, string>[] }> =>
			fetch(`/api/json?batch=${batch}&assignment=${assignment}`).then(
				(response) => response.json(),
			),
		initialData: { data: [] },
		enabled: Boolean(batch) || Boolean(assignment),
	})

	useEffect(() => {
		if (batch) {
			if (router.query.batch !== batch) {
				router.push({
					pathname: router.pathname,
					query: {
						...router.query,
						batch: batch,
					},
				})
			}
		}
		if (assignment) {
			if (router.query.assignment !== assignment) {
				router.push({
					pathname: router.pathname,
					query: {
						...router.query,
						assignment: assignment,
					},
				})
			}
		}
	}, [batch, assignment, router])

	const jsons = search
		? jsonData.data.filter((json) =>
				json.filename.toLowerCase().includes(search.toLowerCase()),
			)
		: jsonData.data

	return (
		<Layout>
			<Container className="mt-5 pb-20">
				<div className="flex items-center gap-5">
					<select
						value={batch}
						onChange={(e) => setBatch(e.target.value)}
						className="bg-zinc-800 col-span-2"
					>
						<option value="" disabled selected>
							-- Seelct Batch --
						</option>
						<option value="10">Batch 10</option>
						<option value="9">Batch 9</option>
						<option value="8">Batch 8</option>
						<option value="7">Batch 7</option>
						<option value="6">Batch 6</option>
						<option value="5">Batch 5</option>
						<option value="4">Batch 4</option>
						<option value="3">Batch 3</option>
						<option value="2">Batch 2</option>
						<option value="1">Batch 1</option>
					</select>

					<select
						value={assignment}
						onChange={(e) => setAss(e.target.value)}
						className="bg-zinc-800 col-span-2"
					>
						<option value="" disabled selected>
							-- Seelct Assignment --
						</option>
						<option value="1">Assignment 1</option>
						<option value="2">Assignment 2</option>
						<option value="3">Assignment 3</option>
						<option value="4">Assignment 4</option>
						<option value="5">Assignment 5</option>
						<option value="6">Assignment 6</option>
						<option value="7">Assignment 7</option>
						<option value="8">Assignment 8</option>
						<option value="9">Assignment 9</option>
						<option value="10">Assignment 10</option>
						<option value="11">Assignment 11</option>
						<option value="12">Assignment 12</option>
						<option value="SCIC">SCIC</option>
					</select>
					<input
						type="text"
						placeholder="search"
						className="!bg-zinc-800 rounded-md border-0"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className="mt-5">
					{!batch && !assignment ? (
						<p>select batch and assignment</p>
					) : jsons.length <= 0 ? (
						isFetching ? (
							<Loader className="animate-spin" />
						) : (
							<p>no json found</p>
						)
					) : (
						""
					)}

					<div className="grid grid-cols-2 gap-5">
						{jsons.map((data) => (
							<SingleJsonPublic data={data} key={data._id} />
						))}
					</div>
				</div>
			</Container>
		</Layout>
	)
}

export default Explore
