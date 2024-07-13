import axios from "axios";
import React, { useEffect } from "react";

type Props = {};

const Customers = (props: Props) => {
	let customers = [] as any;
	let dropdownVisible: null = null;

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = async () => {
		try {
			const response = await axios.get("https://api.example.com/customers");
			customers = response.data;
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
	};
	const toggleDropdown = (id: any) => {
		dropdownVisible = dropdownVisible === id ? null : id;
	};
	return (
		<div>
			<div className="flex items-center">
				<h1 className="font-semibold text-lg md:text-2xl">All Customers</h1>
				<button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
					Add customer
				</button>
			</div>
			<div className="border shadow-sm rounded-lg mt-4">
				<table className="w-full">
					<thead>
						<tr>
							<th className="py-2 px-3 w-[80px]">Image</th>
							<th className="py-2 px-3 max-w-[150px]">Name</th>
							<th className="py-2 px-3 hidden md:table-cell">Email</th>
							<th className="py-2 px-3 hidden md:table-cell">Total Orders</th>
							<th className="py-2 px-3 hidden md:table-cell">Last Order</th>
							<th className="py-2 px-3 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="customer in customers" key="customer.id">
							<td className="py-2 px-3">
								<img
									className="w-10 h-10 rounded-full"
									src="customer.image || '/placeholder-user.jpg'"
									alt="customer.name"
								/>
							</td>
							<td className="py-2 px-3 font-medium">{customers.name}</td>
							<td className="py-2 px-3 hidden md:table-cell">
								{customers.email}
							</td>
							<td className="py-2 px-3 hidden md:table-cell">
								{customers.totalOrders}
							</td>
							<td className="py-2 px-3 hidden md:table-cell">
								{customers.lastOrder}
							</td>
							<td className="py-2 px-3 text-right">
								<div className="relative">
									<button
										onClick={() => toggleDropdown(customers.id)}
										className="px-2 py-1 text-gray-500 hover:text-gray-900 focus:outline-none"
									>
										<svg
											className="w-4 h-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12h.01M12 12h.01M9 12h.01M12 9v.01M12 15v.01M12 12v.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"
											/>
										</svg>
										<span className="sr-only">Actions</span>
									</button>
									<div
										v-if="dropdownVisible === customer.id"
										className="absolute right-0 z-10 bg-white shadow-lg rounded-lg mt-1"
									>
										<a
											href="#"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
										>
											View
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
										>
											Edit
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
										>
											Delete
										</a>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Customers;
