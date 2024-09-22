import { useRouter } from "next/router"

export default function useParams<T>() {
	const router = useRouter()
	return router.query as T
}
