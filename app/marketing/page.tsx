// app/marketing/page.js (or app/marketing/MarketingPage.js)

"use client";

const MarketingPage = () => {
	return (
		<div className="w-svw  h-full bg-[#26203E] ">
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="relative h-[100rem]">
					<div
						className="absolute bg-gradient-to-br from-[#6249CC] via-[#A08EEF] to-[#23194F] rounded-full opacity-40 blur-3xl"
						style={{
							width: "500px",
							height: "500px",
							top: "10%",
							left: "-15%",
						}}
					/>
					<div
						className="absolute bg-gradient-to-br from-[#6249CC] via-[#A08EEF] to-[#23194F] rounded-full opacity-30 blur-3xl"
						style={{ width: "600px", height: "900px", top: "25%", left: "25%" }}
					/>
					<div
						className="absolute bg-gradient-to-br from-[#6249CC] via-[#A08EEF] to-[#23194F] rounded-full opacity-50 blur-3xl"
						style={{ width: "700px", height: "700px", top: "70%", left: "55%" }}
					/>
				</div>
			</div>

			<div className="relative z-10">
				<div>
					<div className="flex justify-between items-center pt-10 pb-8 px-20">
						<div className="flex items-center">
							<img src="hoplogo.svg" alt="Hop" className="" />
							<img src="hop.svg" alt="HopLetters" className="pl-3 pt-2" />
						</div>
						<div className="rounded-xl flex flex-w justify-center">
							<button
								type="button"
								className="focus:outline-none font-bold  text-white bg-[#7964D9] hover:bg-[#534399] rounded-md text-lg px-5 py-2 mx-3 transition duration-300 ease-in-out "
							>
								Join our Discord
							</button>
							<button
								type="button"
								className="focus:outline-none font-bold text-white bg-[#7964D9] hover:bg-[#534399]   rounded-md text-lg px-6 py-1 transition duration-300 ease-in-out"
							>
								Login
							</button>
						</div>
					</div>
				</div>

				<div className="text-center text-white text-6xl pb-10 font-extrabold">
					<div>
						Multi-player
						<span className="bg-gradient-to-br from-[#BDAEFB] to-[#6F58D1] bg-clip-text text-transparent">
							<span> </span>browsers
						</span>
						<span> </span>
						for
					</div>
					<div className="my-4">you and your friends</div>
				</div>

				<div className="flex flex-wrap center justify-center pb-10 w-full">
					<img src="placeholderVideo.png" alt="placeholder" className="w-3/4" />
				</div>

				<div className="relative flex overflow-x-hidden font-extrabold text-white bg-gradient-to-t from-violet-700 via-violet-600 to-[#AC99FF]">
					<div className="py-4 animate-marquee whitespace-nowrap flex">
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">WORK</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">WATCH</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">HANGOUT</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">CODE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">CREATE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">COLLABORATE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">EXPLORE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">DISCOVER</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">SHARE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">SHOP</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
					</div>

					<div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex">
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">WORK</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">WATCH</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">HANGOUT</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">CODE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">CREATE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">COLLABORATE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">EXPLORE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">DISCOVER</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">SHARE</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
						<div className="flex items-center mx-4">
							<span className="text-4xl px-10">SHOP</span>
							<img src="hoplogo.svg" alt="Hop" className="h-10" />
						</div>
					</div>
				</div>

				<div className="flex flex-wrap justify-center py-10 text-white">
					<div className="h-[26rem] w-[60rem] bg-gray-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 flex">
						<div className="w-full flex flex-row items-start p-10">
							<div className="w-full h-full  bg-white rounded-xl">
								{/* Harouni image here */}
							</div>
							<div className="flex flex-col pl-10 w-full">
								<h2 className="text-6xl font-bold pb-5">Very Coolio</h2>
								<p className="">
									Curabitur auctor vehicula urna, eget congue ex bibendum at.
									Curabitur feugiat magna finibus nulla dapibus, vitae elementum
									tellus convallis. Proin consequat sollicitudin laoreet.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap justify-center py-10 text-white">
					<div className="h-[26rem] w-[60rem] bg-gray-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 flex">
						<div className="w-full flex flex-row items-start p-10">
							<div className="flex flex-col pr-10 w-full">
								<h2 className="text-6xl font-bold pb-5">Very Coolio</h2>
								<p className="">
									Curabitur auctor vehicula urna, eget congue ex bibendum at.
									Curabitur feugiat magna finibus nulla dapibus, vitae elementum
									tellus convallis. Proin consequat sollicitudin laoreet.
								</p>
							</div>
							<div className="w-full h-full  bg-white rounded-xl">
								{/* Haloumi image here */}
							</div>
						</div>
					</div>
				</div>

				<div className="py-5">
					<div className="text-center text-white text-6xl pb-10 font-extrabold">
						<div className="pb-3">STOP SCROLLING</div>
						<div>TIME TO HOP IN</div>
						<div className="pt-5">
							<button
								type="button"
								className="text-3xl focus:outline-none font-bold  text-white bg-[#7964D9] hover:bg-[#534399] rounded-full  px-28 py-4 mx-3 transition duration-300 ease-in-out"
							>
								LOGIN
							</button>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between px-10 pt-10">
					<div className="relative w-full py-10">
						<img
							src="footerLogo.png"
							alt="Logo"
							className="absolute top-1/2 left-10 transform -translate-y-1/2 w-[6rem]"
						/>
						<div className="flex items-center justify-center">
							<span className="text-[#837AA6] text-center text-base">
								Made with ♥ by Hop Team
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarketingPage;
