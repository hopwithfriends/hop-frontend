"use client";
import BuyCursor from "@components/profile/BuyCursor";
import ProfilePicUploader from "@components/profile/ProfilePicUploader";
import { useUser } from "@stackframe/stack";

// ! ========== WARNING ===========
// ! We need to implement profile page using stack's profile component
// ! Ask Haroon for more info on this
// ! ==============================

const ProfilePage = () => {
	const user = useUser({ or: "redirect" });

	return (
		<div>
			<h1>Profile</h1>
			<p>{user.displayName}</p>
			<ProfilePicUploader />
			<BuyCursor/>
		</div>
	);
};

export default ProfilePage;
