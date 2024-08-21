import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
	tokenStore: "nextjs-cookie",
	urls: {
		signIn: "/sign-in",
		afterSignIn: "/onboard",
		signUp: "/sign-up",
		afterSignUp: "/onboard",
	},
});
