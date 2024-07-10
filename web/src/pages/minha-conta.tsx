import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/core/Layout";

type Props = {};

const minhaConta = (props: Props) => {
	const router = useRouter();
	const { isLoggedIn } = useAuth();
	let userData = {
		name: "",
		email: "",
	};
	let orderHistory = [
		{
			orderNumber: "",
			status: "",
			total: "",
		},
	];

	if (!isLoggedIn) {
		router.push("/entrar");
	}

	const fetchUserData = () => {
		axios
			.get("https://api.example.com/user")
			.then((response) => {
				userData = response.data;
			})
			.catch((error) => {
				console.error("Erro ao buscar informações da conta:", error);
			});
	};

	const fetchOrderHistory = () => {
		axios
			.get("https://api.example.com/orders")
			.then((response) => {
				orderHistory = response.data;
			})
			.catch((error) => {
				console.error("Erro ao buscar histórico de pedidos:", error);
			});
	};
	React.useEffect(() => {
		fetchUserData();
		fetchOrderHistory();
	}, []);
	return (		<Layout>

		<div className="container mx-auto">
			<h1 className="text-3xl font-bold mb-4">Minha Conta</h1>
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Informações da Conta</h2>
				<div className="bg-white p-4 rounded shadow-md">
					<div v-if="userData">
						<div className="mb-2">
							<strong>Nome:</strong> {userData.name}
						</div>
						<div className="mb-2">
							<strong>E-mail:</strong> {userData.email}
						</div>
					</div>
					<div v-else>
						<p>Carregando informações da conta...</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-semibold mb-2">Histórico de Pedidos</h2>
				<div className="bg-white p-4 rounded shadow-md">
					<div v-if="orderHistory">
						{orderHistory.map((order) => {
							return (
								<div
									v-for="order in "
									key="order.id"
									className="flex items-center justify-between mb-4"
								>
									<div>
										<strong>Número do Pedido:</strong> {order.orderNumber}
									</div>
									<div>
										<strong>Status:</strong> {order.status}
									</div>
									<div>
										<strong>Total:</strong> R$ {order.total}
									</div>
								</div>
							);
						})}
					</div>
					<div v-else>
						<p>Carregando histórico de pedidos...</p>
					</div>
				</div>
			</section>
		</div></Layout>
	);
};

export default minhaConta;
