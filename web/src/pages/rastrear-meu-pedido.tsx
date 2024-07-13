import React, { useState, useEffect, useCallback } from "react";
import Layout from "@/components/core/Layout";
import { useTrackOrder } from "@/hooks/useTrackOrder";

type Props = {};

const RastreamentoPedido = (props: Props) => {
	const [orderNumber, setOrderNumber] = useState<string>("");
	const { orderStatus, loading, error, errorMessage, trackOrder } =
		useTrackOrder(orderNumber);

	const isValidOrderNumber = orderNumber.trim() !== "";

	useEffect(() => {
		// Limpa mensagens de erro e status quando o número do pedido muda
		if (orderNumber.trim() === "") {
			setOrderNumber("");
		}
	}, [orderNumber]);

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
						className={`p-2 bg-blue-500 text-white rounded-r-lg ${
							!isValidOrderNumber || loading
								? "opacity-50 cursor-not-allowed"
								: ""
						}`}
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
					<div className="error-message text-red-500" aria-live="assertive">
						{errorMessage}
					</div>
				)}
				{orderStatus && (
					<div
						className="order-status mt-6 p-4 bg-green-100 border border-green-300 rounded-lg"
						aria-live="polite"
					>
						<p className="text-lg font-semibold">
							Status do Pedido: {orderStatus}
						</p>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default RastreamentoPedido;
