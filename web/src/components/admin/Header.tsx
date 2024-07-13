import React from "react";

type Props = {};

const Header = (props: Props) => {
	return (
		<header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
			<a className="lg:hidden" href="#">
				<svg
					className="h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v8m4-4H8"
					/>
				</svg>
				<span className="sr-only">Home</span>
			</a>
			<div className="flex-1">
				<h1 className="font-semibold text-lg">Recent Orders</h1>
			</div>
			<div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<svg
							className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
							/>
						</svg>
						<input
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white border border-gray-300 rounded-md"
							placeholder="Search orders..."
							type="search"
						/>
					</div>
				</form>
				<div className="relative">
					<button className="rounded-full" id="dropdownMenuButton">
						<img
							alt="Avatar"
							className="rounded-full"
							height="32"
							src="/motivation.svg"
							width="32"
						/>
						<span className="sr-only">Toggle user menu</span>
					</button>
					<div
						id="dropdownMenu"
						className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
					>
						<div className="px-4 py-2 text-sm text-gray-700">My Account</div>
						<div className="border-t border-gray-100"></div>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Settings
						</a>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Support
						</a>
						<div className="border-t border-gray-100"></div>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Logout
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
