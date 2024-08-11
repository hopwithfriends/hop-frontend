import InviteComponent from "./InviteComponent";
import ScrollBar from "../ui/SrollBar"; // Fixed the import path for ScrollBar

const InviteContainer: React.FC = () => {
	return (
		<div className="rounded-xl w-full h-56 bg-gray-800 mt-2 pl-3 overflow-hidden">
			<h1 className="text-xl font-bold pt-2 mb-1">Invites</h1>
			<div className="overflow-auto h-[calc(100%-3rem)]">
				<ScrollBar>
					<InviteComponent />
					<InviteComponent />
					<InviteComponent />
					<InviteComponent />
					<InviteComponent />
					<InviteComponent />
				</ScrollBar>
			</div>
		</div>
	);
};

export default InviteContainer;
