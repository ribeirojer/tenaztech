import axios from "axios";
import React from "react";

type Props = {};

const Products = (props: Props) => {
	let products = [
		{
			id: 1,
			name: "Product 1",
			image: "/product1.jpg",
			status: "Active",
			inventory: 100,
			vendor: "Vendor A",
		},
		{
			id: 2,
			name: "Product 2",
			image: "/product2.jpg",
			status: "Inactive",
			inventory: 50,
			vendor: "Vendor B",
		},
		{
			id: 3,
			name: "Product 3",
			image: "/product3.jpg",
			status: "Active",
			inventory: 75,
			vendor: "Vendor C",
		},
	];
	let dropdownVisible: null = null;

	const fetchProducts = async () => {
		try {
			const response = await axios.get("https://api.example.com/products");
			products = response.data;
		} catch (error) {
			console.error("Error fetching products:", Error);
		}
	};
	const toggleDropdown = (id: any) => {
		dropdownVisible = dropdownVisible === id ? null : id;
	};

	return (
		<div>
			<div className="flex items-center">
				<h1 className="font-semibold text-lg md:text-2xl">All Products</h1>
				<button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
					Add product
				</button>
			</div>
			<div className="border shadow-sm rounded-lg mt-4">
				<table className="w-full">
					<thead>
						<tr>
							<th className="py-2 px-3 w-[80px]">Image</th>
							<th className="py-2 px-3 max-w-[150px]">Name</th>
							<th className="py-2 px-3 hidden md:table-cell">Status</th>
							<th className="py-2 px-3 hidden md:table-cell">Inventory</th>
							<th className="py-2 px-3">Vendor</th>
							<th className="py-2 px-3 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr v-for=" in " key="product.id">
									<td className="py-2 px-3">
										<img
											src="product.image || '/motivation.svg'"
											alt="product.name"
											className="aspect-square rounded-md object-cover"
											width="64"
											height="64"
										/>
									</td>
									<td className="py-2 px-3 font-medium">{product.name}</td>
									<td className="py-2 px-3 hidden md:table-cell">
										{product.status}
									</td>
									<td className="py-2 px-3">{product.inventory}</td>
									<td className="py-2 px-3">{product.vendor}</td>
									<td className="py-2 px-3 text-right">
										<div className="relative">
											<button
												onClick={() => toggleDropdown(product.id)}
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
												v-if="dropdownVisible === product.id"
												className="absolute right-0 z-10 bg-white shadow-lg rounded-lg mt-1"
											>
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
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Products;
