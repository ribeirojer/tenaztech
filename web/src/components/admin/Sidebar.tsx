import React from "react";
import HomeIcon from "../icons/HomeIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import PackageIcon from "../icons/PackageIcon";
import UsersIcon from "../icons/UsersIcon";
import LandmarkIcon from "../icons/LandmarkIcon";
import LineChartIcon from "../icons/LineChartIcon";

const Sidebar = ({ onNavigate }: any) => {
	return (
		<nav className="grid items-start px-4 text-sm font-medium">
			<button
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
				onClick={() => onNavigate("home")}
			>
				<HomeIcon className="h-4 w-4" />
				Home
			</button>
			<button
				className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
				onClick={() => onNavigate("orders")}
			>
				<ShoppingCartIcon className="h-4 w-4" />
				Orders
				<span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
					12
				</span>
			</button>
			<button
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
				onClick={() => onNavigate("products")}
			>
				<PackageIcon className="h-4 w-4" />
				Products
			</button>
			<button
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
				onClick={() => onNavigate("customers")}
			>
				<UsersIcon className="h-4 w-4" />
				Customers
			</button>
			<button
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
				onClick={() => onNavigate("finances")}
			>
				<LandmarkIcon className="h-4 w-4" />
				Finances
			</button>
			<button
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
				onClick={() => onNavigate("analytics")}
			>
				<LineChartIcon className="h-4 w-4" />
				Analytics
			</button>
		</nav>
	);
};

export default Sidebar;
