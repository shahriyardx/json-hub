import Layout from "@/components/layout"
import React, { useEffect } from "react"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import Container from "@/components/container"
import Uploader from "@/components/upload-json"
import { signOut, useSession } from "next-auth/react"
import MyJson from "@/components/my-json"
import { useRouter } from "next/router"
import { Loader } from "lucide-react"

const Profile = () => {
	const router = useRouter()
	const { data, status } = useSession()
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/api/auth/signin")
		}
	}, [status, router])
	return (
		<Layout>
			{status === "loading" ? (
				<div className="grid place-items-center py-20">
					<Loader className="animate-spin" />
				</div>
			) : (
				<Container>
					<TabGroup className="mt-10">
						<TabList className="flex items-center gap-3">
							<Tab className="px-8 text-xs py-3 data-[selected]:bg-zinc-700 rounded-md">
								My JSON
							</Tab>
							<Tab className="px-8 text-xs py-3 data-[selected]:bg-zinc-700 rounded-md">
								Upload
							</Tab>
							<button
								type="button"
								onClick={() => signOut()}
								className="px-8 py-3 bg-red-500 rounded-md text-xs ml-auto"
							>
								Logout
							</button>
						</TabList>
						<TabPanels className="mt-5 pb-20">
							<TabPanel>
								<MyJson />
							</TabPanel>
							<TabPanel>
								<Uploader />
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</Container>
			)}
		</Layout>
	)
}

export default Profile
