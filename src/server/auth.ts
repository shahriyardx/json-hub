import type { GetServerSidePropsContext } from "next"
import {
	getServerSession,
	type User,
	type DefaultSession,
	type NextAuthOptions,
} from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { env } from "@/env"
import type { DefaultJWT } from "next-auth/jwt"
import { db } from "./db"

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: User & {
			id: string
		}
		isAdmin: boolean
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		user: User
		isAdmin: boolean
	}
}

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: token.user,
			isAdmin: token.isAdmin,
		}),
		jwt: async ({ token, account, user }) => {
			if (account && user) {
				const response = await fetch(`https://api.github.com/user/${token.sub}`)
				const data = await response.json()

				if (token.sub === "40076722") {
					token.isAdmin = true
				}

				const userInfo = {
					id: String(data.id),
					image: data.avatar_url,
					name: data.login,
				}

				token.user = {
					...user,
					...userInfo,
				}

				const exists = await db.user.findFirst({
					where: {
						id: token.sub,
					},
				})

				if (!exists) {
					await db.user.create({
						data: {
							id: token.sub as string,
							name: userInfo.name,
							image: userInfo.image,
							email: user.email as string,
						},
					})
				}
			}
			return token
		},
	},
	providers: [
		GithubProvider({
			clientId: env.GH_CLIENT_ID,
			clientSecret: env.GH_CLIENT_SECRET,
		}),
	],
}

export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"]
	res: GetServerSidePropsContext["res"]
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}
