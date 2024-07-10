import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/core/Layout";

type Props = {};

const rastrearMeuPedido = (props: Props) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [orderStatus, setOrderStatus] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const isValidOrderNumber = orderNumber.trim() !== "";

	const trackOrder = async () => {
		setLoading(true);
		setError(false);

		try {
			const response = await axios.get(`/api/orders/${orderNumber}/status`);
			setOrderStatus(response.data.status);
			setOrderNumber(""); // Limpa o campo do número do pedido após o rastreamento bem-sucedido
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
	};

	return (
		<Layout>

		<div className="order-tracking container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">Rastreamento de Pedido</h1>
			<p className="text-lg mb-6">
				Insira o número do seu pedido para rastrear o status:
			</p>
			<div className="flex items-center mb-4">
				<input
					type="text"
					value={orderNumber}
					onChange={(e) => setOrderNumber(e.target.value)}
					placeholder="Número do Pedido"
					className="p-2 border rounded-l-lg flex-grow"
				/>
				<button
					onClick={trackOrder}
					disabled={!isValidOrderNumber || loading}
					className={`p-2 bg-blue-500 text-white rounded-r-lg ${!isValidOrderNumber || loading ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					Rastrear Pedido
				</button>
			</div>
			{loading && (
				<div className="loading-indicator text-blue-500">
					<span className="loader"></span> Rastreando pedido...
				</div>
			)}
			{error && (
				<div className="error-message text-red-500">{errorMessage}</div>
			)}
			{orderStatus && (
				<div className="order-status mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
					<p className="text-lg font-semibold">
						Status do Pedido: {orderStatus}
					</p>
				</div>
			)}
		</div></Layout>

	);
};

export default rastrearMeuPedido;
