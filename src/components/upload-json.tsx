import { loadJson } from "@/utils/json"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Upload = {
	filename: string
	batch: number
	assignment: number
	data: string
}

const Uploader = () => {
	const importRef = useRef<HTMLInputElement>(null)
	const { register, reset, handleSubmit } = useForm<Upload>()

	const upload = async (values: Upload) => {
		await fetch("/api/json/upload", {
			method: "POST",
			body: JSON.stringify(values),
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					return toast.error(data.error)
				}

				toast.success("json has been uploaded")
				reset()
			})
	}

	return (
		<div className="pb-20">
			<input
				ref={importRef}
				type="file"
				accept="application/json"
				onChange={(e) => {
					if (e.target.files && e.target.files.length > 0) {
						loadJson({
							file: e.target.files[0],
							onload: (data) => {
								reset({ data: JSON.stringify(data, undefined, 4) })
								try {
									// @ts-ignore
									importRef.current?.reset()
								} catch {
									console.log("Failes to reset")
								}
							},
						})
					}
				}}
				className="hidden"
			/>

			<form onSubmit={handleSubmit(upload)}>
				<div className="grid grid-cols-7 gap-5 mt-5">
					<button
						type="button"
						onClick={() => importRef.current?.click()}
						className="w-full bg-zinc-700 px-5 py-3 rounded-md"
					>
						Import
					</button>

					<input
						type="text"
						placeholder="Filename"
						{...register("filename", {
							required: {
								value: true,
								message: "filename is required",
							},
						})}
						className="!bg-zinc-800 col-span-2 rounded-md border-0"
					/>

					<select
						className="bg-zinc-800 col-span-2"
						{...register("batch", {
							required: {
								value: true,
								message: "must select a batch",
							},
						})}
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
						className="bg-zinc-800 col-span-2"
						{...register("assignment", {
							required: {
								value: true,
								message: "must select an assignment",
							},
						})}
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
					<p className="col-span-7 text-rose-400">
						* Please give the json a meaningful name, for example:
						Batch-10_Assignment-12_Category-0009
					</p>
				</div>
				<textarea
					rows={30}
					className="bg-zinc-800 w-full p-5 mt-5"
					{...register("data", {
						required: {
							value: true,
							message: "data is required",
						},
					})}
				>
					paste json here
				</textarea>

				<button
					type="submit"
					className="bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-5 py-3 rounded-md"
				>
					Upload
				</button>
			</form>
		</div>
	)
}

export default Uploader
