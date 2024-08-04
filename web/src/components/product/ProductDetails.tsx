import React from "react";

type Props = {
	product: any;
};

const ProductDetails = ({ product }: Props) => {
	return (
		<div className="w-full md:w-5/12">
			<div className="product-details space-y-4">
				<h2 className="text-2xl font-semibold">{product.name}</h2>
				<div className="flex items-center space-x-2">
					<div className="product-rating flex space-x-1 text-yellow-400">
						{Array.from({ length: 5 }, (_, i) => (
							<i
								key={i}
								className={`fa fa-star${i >= product.rating ? "-o" : ""}`}
							></i>
						))}
					</div>
					<a className="review-link text-blue-600 hover:underline" href="#">
						{product.reviews} Review(s) | Add your review
					</a>
				</div>
				<div className="space-y-2">
					<h3 className="text-xl font-semibold">
						${product.price}{" "}
						<del className="text-gray-500">${product.originalPrice}</del>
					</h3>
					<span className="text-green-600">In Stock</span>
				</div>
				<p>{product.description}</p>
				<div className="product-options space-y-4">
					{product.colors && (
						<label className="block">
							Color
							<select className="input-select mt-1 block w-full p-2 border border-gray-300 rounded-md">
								{product.colors.map((color: any, index: any) => (
									<option key={index} value={color}>
										{color}
									</option>
								))}
							</select>
						</label>
					)}
				</div>
				<div className="add-to-cart space-y-4">
					<div className="qty-label flex items-center space-x-2">
						Qty
						<div className="input-number flex items-center border border-gray-300 rounded-md overflow-hidden">
							<input
								type="number"
								className="w-12 p-2 text-center border-r border-gray-300"
								defaultValue={1}
							/>
							<span className="qty-up w-6 h-full flex items-center justify-center bg-gray-200 cursor-pointer">
								+
							</span>
							<span className="qty-down w-6 h-full flex items-center justify-center bg-gray-200 cursor-pointer">
								-
							</span>
						</div>
					</div>
					<button className="add-to-cart-btn bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
						<i className="fa fa-shopping-cart"></i> add to cart
					</button>
				</div>
				<ul className="product-btns space-y-2">
					<li>
						<a
							href="#"
							className="text-blue-600 hover:underline flex items-center space-x-2"
						>
							<i className="fa fa-heart-o"></i> add to wishlist
						</a>
					</li>
					<li>
						<a
							href="#"
							className="text-blue-600 hover:underline flex items-center space-x-2"
						>
							<i className="fa fa-exchange"></i> add to compare
						</a>
					</li>
				</ul>
				{product.categories && (
					<ul className="product-links space-y-2">
						<li>Category:</li>
						{product.categories.map((category: any, index: any) => (
							<li key={index}>
								<a href="#" className="text-blue-600 hover:underline">
									{category}
								</a>
							</li>
						))}
					</ul>
				)}
				{product.socialLinks && (
					<ul className="product-links space-y-2">
						<li>Share:</li>
						<li className="flex space-x-2">
							{product.socialLinks.map((link: any, index: any) => (
								<a
									key={index}
									href={link.href}
									className="text-blue-600 hover:underline"
								>
									<i className={`fa fa-${link.icon}`}></i>
								</a>
							))}
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
