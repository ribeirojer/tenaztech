import axios from "axios";

const API_BASE_URL = ""; // Substitua pela URL real da sua API

export const fetchProducts = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/products`);
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar produtos:", error);
		throw error;
	}
};

export const fetchBestSellers = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/products/best-sellers`);
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar produtos mais vendidos:", error);
		throw error;
	}
};
