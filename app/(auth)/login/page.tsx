import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export default function LoginPage() {
	return (
		<>
			<Link className="text-blue-500 hover:underline" href="/">
				Home
			</Link>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="p-8 bg-white rounded-lg shadow-md w-96">
					<Logo />
					<form className="space-y-6">
						<div>
							<Input type="email" placeholder="Email" required />
						</div>
						<div>
							<Input type="password" placeholder="Password" required />
						</div>
						<Button type="submit" className="w-full">
							Log in
						</Button>
					</form>
					<div className="mt-4 text-center">
						<div className="mt-4 text-center">Forgot your password?</div>
					</div>
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Don't have an account?{" "}
							<Link href="/register" className="text-blue-600 hover:underline">
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
