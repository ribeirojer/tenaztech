import { useState, useCallback } from "react";
import axios from "axios";

type Props = {};

export const useTrackOrder = (orderNumber: string) => {
	const [orderStatus, setOrderStatus] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const trackOrder = useCallback(async () => {
		if (orderNumber.trim() === "") return;

		setLoading(true);
		setError(false);
		setErrorMessage("");

		try {
			const response = await axios.get(`/api/orders/${orderNumber}/status`);
			setOrderStatus(response.data.status);
		} catch (error: any) {
			console.error("Erro ao rastrear o pedido:", error);
			setError(true);
			if (error.response) {
				setErrorMessage(
					`Erro ${error.response.status}: ${error.response.data.message}`,
				);
			} else if (error.request) {
				setErrorMessage(
					"Erro de rede. Por favor, verifique sua conexão e tente novamente.",
				);
			} else {
				setErrorMessage(
					"Erro inesperado. Por favor, tente novamente mais tarde.",
				);
			}
		} finally {
			setLoading(false);
		}
	}, [orderNumber]);

	return { orderStatus, loading, error, errorMessage, trackOrder };
};
