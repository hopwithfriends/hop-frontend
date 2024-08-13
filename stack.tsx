import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
	tokenStore: "nextjs-cookie",
	urls: {
		signIn: "/sign-in",
		afterSignIn: "/dashboard",
		signUp: "/sign-up",
		afterSignUp: "/dashboard",
		accountSettings: "/account-settings",
	},
});
