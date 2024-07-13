import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/core/Layout";

type UserData = {
	name: string;
	email: string;
};

type Order = {
	id: string;
	orderNumber: string;
	status: string;
	total: string;
};

type Props = {};

const MinhaConta: React.FC<Props> = () => {
	const router = useRouter();
	const { isLoggedIn } = useAuth();
	const [userData, setUserData] = useState<UserData | null>(null);
	const [orderHistory, setOrderHistory] = useState<Order[]>([]);
	const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
	const [loadingOrderHistory, setLoadingOrderHistory] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/entrar");
		} else {
			fetchUserData();
			fetchOrderHistory();
		}
	}, [isLoggedIn, router]);

	const fetchUserData = async () => {
		try {
			const response = await axios.get("https://api.example.com/user");
			setUserData(response.data);
		} catch (error) {
			console.error("Erro ao buscar informações da conta:", error);
			setError("Erro ao carregar informações da conta.");
		} finally {
			setLoadingUserData(false);
		}
	};

	const fetchOrderHistory = async () => {
		try {
			const response = await axios.get("https://api.example.com/orders");
			setOrderHistory(response.data);
		} catch (error) {
			console.error("Erro ao buscar histórico de pedidos:", error);
			setError("Erro ao carregar histórico de pedidos.");
		} finally {
			setLoadingOrderHistory(false);
		}
	};

	const handleUpdateUserData = async (updatedData: UserData) => {
		try {
			const response = await axios.put(
				"https://api.example.com/user",
				updatedData,
			);
			setUserData(response.data);
			alert("Informações atualizadas com sucesso.");
		} catch (error) {
			console.error("Erro ao atualizar informações da conta:", error);
			setError("Erro ao atualizar informações da conta.");
		}
	};

	const handleCancelOrder = async (orderId: string) => {
		try {
			await axios.delete(`https://api.example.com/orders/${orderId}`);
			setOrderHistory(orderHistory.filter((order) => order.id !== orderId));
			alert("Pedido cancelado com sucesso.");
		} catch (error) {
			console.error("Erro ao cancelar pedido:", error);
			setError("Erro ao cancelar pedido.");
		}
	};

	const handleChangePassword = async (
		oldPassword: string,
		newPassword: string,
	) => {
		try {
			await axios.post("https://api.example.com/change-password", {
				oldPassword,
				newPassword,
			});
			alert("Senha alterada com sucesso.");
		} catch (error) {
			console.error("Erro ao alterar senha:", error);
			setError("Erro ao alterar senha.");
		}
	};

	return (
		<Layout>
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold mb-4">Minha Conta</h1>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-2">Informações da Conta</h2>
					<div className="bg-white p-4 rounded shadow-md">
						{loadingUserData ? (
							<p>Carregando informações da conta...</p>
						) : error ? (
							<p className="text-red-500">{error}</p>
						) : (
							userData && (
								<UserInfoForm
									userData={userData}
									onUpdateUserData={handleUpdateUserData}
									onChangePassword={handleChangePassword}
								/>
							)
						)}
					</div>
				</section>

				<section>
					<h2 className="text-xl font-semibold mb-2">Histórico de Pedidos</h2>
					<div className="bg-white p-4 rounded shadow-md">
						{loadingOrderHistory ? (
							<p>Carregando histórico de pedidos...</p>
						) : error ? (
							<p className="text-red-500">{error}</p>
						) : orderHistory.length > 0 ? (
							<OrderHistory
								orders={orderHistory}
								onCancelOrder={handleCancelOrder}
							/>
						) : (
							<p>Você ainda não possui pedidos.</p>
						)}
					</div>
				</section>
			</div>
		</Layout>
	);
};

const UserInfoForm: React.FC<{
	userData: UserData;
	onUpdateUserData: (data: UserData) => void;
	onChangePassword: (oldPassword: string, newPassword: string) => void;
}> = ({ userData, onUpdateUserData, onChangePassword }) => {
	const [formData, setFormData] = useState(userData);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onUpdateUserData(formData);
	};

	const handlePasswordChange = (e: React.FormEvent) => {
		e.preventDefault();
		onChangePassword(oldPassword, newPassword);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Nome
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						E-mail
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
				>
					Atualizar Informações
				</button>
			</form>
			<form onSubmit={handlePasswordChange} className="mt-8 space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Senha Antiga
					</label>
					<input
						type="password"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Nova Senha
					</label>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
				>
					Alterar Senha
				</button>
			</form>
		</>
	);
};

const OrderHistory: React.FC<{
	orders: Order[];
	onCancelOrder: (orderId: string) => void;
}> = ({ orders, onCancelOrder }) => {
	return (
		<>
			{orders.map((order) => (
				<div key={order.id} className="flex items-center justify-between mb-4">
					<div>
						<strong>Número do Pedido:</strong> {order.orderNumber}
					</div>
					<div>
						<strong>Status:</strong> {order.status}
					</div>
					<div>
						<strong>Total:</strong> R$ {order.total}
					</div>
					<button
						onClick={() => onCancelOrder(order.id)}
						className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
					>
						Cancelar Pedido
					</button>
				</div>
			))}
		</>
	);
};

export default MinhaConta;
