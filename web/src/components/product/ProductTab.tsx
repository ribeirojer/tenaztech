import React, { useState } from "react";
import Reviews from "./ProductReviews";

const ProductTab = () => {
	const [activeTab, setActiveTab] = useState<
		"Description" | "Details" | "Reviews"
	>("Description");

	const reviewData = [
		{
			stars: 5,
			percentage: 80,
			count: 3,
			author: "John",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			stars: 4,
			percentage: 60,
			count: 2,
			author: "John",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			stars: 3,
			percentage: 40,
			count: 0,
			author: "John",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			stars: 2,
			percentage: 20,
			count: 0,
			author: "John",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			stars: 1,
			percentage: 20,
			count: 0,
			author: "John",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	];

	return (
		<div className="w-full">
			<div className="flex border-b border-gray-200">
				<button
					className={`px-4 py-2 ${activeTab === "Description" ? "border-b-2 border-blue-500" : ""}`}
					onClick={() => setActiveTab("Description")}
				>
					Description
				</button>
				<button
					className={`px-4 py-2 ${activeTab === "Details" ? "border-b-2 border-blue-500" : ""}`}
					onClick={() => setActiveTab("Details")}
				>
					Details
				</button>
				<button
					className={`px-4 py-2 ${activeTab === "Reviews" ? "border-b-2 border-blue-500" : ""}`}
					onClick={() => setActiveTab("Reviews")}
				>
					Reviews
				</button>
			</div>
			{activeTab === "Details" && <p></p>}
			{activeTab === "Description" && <p></p>}
			{activeTab === "Reviews" && <Reviews reviews={reviewData} />}
		</div>
	);
};

export default ProductTab;
