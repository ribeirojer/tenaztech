import axiosClient from "../utils/axiosClient";

export const fetchProducts = async () => {
	try {
		const response = await axiosClient.get("/products");
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};

export const fetchBestSellers = async () => {
	try {
		const response = await axiosClient.get("/products/bestsellers");
		return response.data;
	} catch (error) {
		console.error("Error fetching best sellers:", error);
		throw error;
	}
};
