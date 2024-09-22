import React from "react"
import MainLayout from "@/components/layouts/main-layout"
import Container from "@/components/shared/container"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { DownloadIcon, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

const Homepage = () => {
	const session = useSession()
	console.log(session)
	return (
		<MainLayout>
			<div className="mt-5">
				<Container>
					<div className="grid grid-cols-2 gap-5">
						<Select>
							<SelectTrigger className="">
								<SelectValue placeholder="Select Batch" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Batch 1</SelectItem>
								<SelectItem value="2">Batch 2</SelectItem>
								<SelectItem value="3">Batch 3</SelectItem>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className="">
								<SelectValue placeholder="Select Assignment" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Assignment 1</SelectItem>
								<SelectItem value="2">Assignment 2</SelectItem>
								<SelectItem value="3">Assignment 3</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
						<Card>
							<CardContent className="pt-5">
								<p>Card Content</p>
							</CardContent>
							<CardFooter className="flex justify-between">
								<span className="flex items-center gap-2">0 Downloads</span>

								<Button>
									<DownloadIcon className="mr-2" size={15} />
									DOwnload
								</Button>
							</CardFooter>
						</Card>
					</div>
				</Container>
			</div>
		</MainLayout>
	)
}

export default Homepage
