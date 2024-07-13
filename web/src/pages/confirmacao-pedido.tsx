import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/core/Layout";

type Props = {};

const confirmacaoPedido = (props: Props) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [orderDate, setOrderDate] = useState("");
	const [products, setProducts] = useState<any>([]);
	const [deliveryAddress, setDeliveryAddress] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");
	const [paymentLink, setPaymentLink] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			getPaymentLinkFromQuery();
			fetchOrderDetails();
		}
	}, [router.isReady]);

	const getPaymentLinkFromQuery = () => {
		const urlParams = new URLSearchParams(window.location.search);
		setPaymentLink(urlParams.get("link") || "Link de pagamento não encontrado");
	};

	const fetchOrderDetails = async () => {
		try {
			const response = await axios.get(
				`https://api.example.com/orders/${paymentLink}`,
			);
			const orderData = response.data;

			setOrderNumber(orderData.id);
			setOrderDate(new Date(orderData.date).toLocaleDateString());
			setProducts(orderData.products);
			setDeliveryAddress(orderData.deliveryAddress);
			setPaymentMethod(orderData.paymentMethod);
			setDeliveryDate(new Date(orderData.deliveryDate).toLocaleDateString());
		} catch (error) {
			console.error("Erro ao buscar os detalhes do pedido:", error);
		}
	};

	return (
		<Layout>
			<div className="max-w-4xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-4">Confirmação de Pedido</h1>
				<div className="bg-white shadow-md rounded-lg p-6 mb-6">
					<p className="text-lg mb-4">Obrigado por fazer seu pedido conosco!</p>
					<p className="text-gray-600 mb-4">
						Aqui estão os detalhes do seu pedido:
					</p>
					<div className="border-b border-gray-300 pb-4 mb-4">
						<p className="text-lg font-semibold">Número do Pedido:</p>
						<p className="text-gray-600">{orderNumber}</p>
					</div>
					<div className="border-b border-gray-300 pb-4 mb-4">
						<p className="text-lg font-semibold">Data do Pedido:</p>
						<p className="text-gray-600">{orderDate}</p>
					</div>
					<div className="border-b border-gray-300 pb-4 mb-4">
						<p className="text-lg font-semibold">Produtos:</p>
						<ul>
							{products.map(
								(
									product: { name: string; price: string | number },
									index: React.Key | null | undefined,
								) => (
									<li key={index} className="text-gray-600">
										{product.name} - R$ {product.price}
									</li>
								),
							)}
						</ul>
					</div>
					<div className="border-b border-gray-300 pb-4 mb-4">
						<p className="text-lg font-semibold">Endereço de Entrega:</p>
						<p className="text-gray-600">{deliveryAddress}</p>
					</div>
					<div className="border-b border-gray-300 pb-4 mb-4">
						<p className="text-lg font-semibold">Método de Pagamento:</p>
						<p className="text-gray-600">{paymentMethod}</p>
					</div>
					<div className="border-b border-gray-300 pb-4 mb-4">
						<p className="text-lg font-semibold">Link para Pagamento:</p>
						<p className="text-blue-500 underline">{paymentLink}</p>
					</div>
					<div className="border-b border-gray-300 pb-4 mb-4">
						<p className="text-lg font-semibold">Data Estimada de Entrega:</p>
						<p className="text-gray-600">{deliveryDate}</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default confirmacaoPedido;
