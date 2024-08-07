import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	removeFromWishlist,
	getWishlist,
	addToCart,
} from "../utils/localStorage";
import Layout from "@/components/core/Layout";

type Props = {};

interface WishlistItem {
	id: string;
	slug: string;
	image: string;
	name: string;
	description: string;
	price: number;
}

const ListaDeDesejos = (props: Props) => {
	const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		loadWishlist();
	}, []);

	const loadWishlist = () => {
		const localWishlist = getWishlist();
		const promises = localWishlist.map((item: { slug: string }) => {
			return axios
				.get(
					`https://product-catalog-service.deno.dev/api/products/${item.slug}`,
				)
				.then((response) => response.data)
				.catch((error) => {
					console.error("Erro ao carregar detalhes do produto:", error);
					setError(
						"Erro ao carregar detalhes do produto. Por favor, tente novamente mais tarde.",
					);
				});
		});

		Promise.all(promises)
			.then((results) => {
				setWishlist(results);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const removeFromWishlistHandler = (productId: string) => {
		removeFromWishlist(productId);
		setWishlist(wishlist.filter((item) => item.id !== productId));
	};

	const addToCartHandler = (item: WishlistItem) => {
		addToCart(item, 1); // Adiciona 1 unidade do item ao carrinho
		removeFromWishlistHandler(item.id); // Remove o item da lista de desejos após adicioná-lo ao carrinho
	};

	const formatCurrency = (value: number) => {
		return value.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	return (
		<Layout>
			<div className="wishlist container mx-auto py-8">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Lista de Desejos
				</h1>
				{isLoading ? (
					<div className="text-center text-gray-600">
						<span className="loader"></span> Carregando...
					</div>
				) : error ? (
					<div className="text-center text-red-500">
						<p>{error}</p>
					</div>
				) : wishlist.length === 0 ? (
					<div className="flex flex-col justify-center items-center">
						<img src="/assets/19-5.png" alt="" className="size-80 -m-4" />
						<span className="text-center text-gray-600">
							Sua lista de desejos está vazia.
						</span>
						<Link
							href="/produtos"
							className="px-6 my-4 text-white bg-purple-500 hover:bg-purple-600 py-3 rounded-md transition duration-300"
						>
							Ver produtos
						</Link>
					</div>
				) : (
					wishlist.map((item) => (
						<div
							key={item.id}
							className="wishlist-item border rounded-lg shadow-lg p-4 mb-4"
						>
							<div className="flex flex-col md:flex-row items-center justify-between">
								<div className="flex items-center mb-4 md:mb-0">
									<img
										src={item.image}
										alt="Imagem do produto"
										className="h-20 w-20 object-cover rounded mr-4"
									/>
									<div>
										<h3 className="font-semibold text-lg">{item.name}</h3>
										<p className="text-gray-600">{item.description}</p>
									</div>
								</div>
								<div className="flex items-center">
									<span className="text-gray-600 font-medium mr-4">
										{formatCurrency(item.price)}
									</span>
									<button
										onClick={() => removeFromWishlistHandler(item.id)}
										className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
										aria-label="Remover da lista de desejos"
									>
										<svg
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											></path>
										</svg>
									</button>
									<button
										onClick={() => addToCartHandler(item)}
										className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-4"
										aria-label="Adicionar ao carrinho"
									>
										<i className="fas fa-shopping-cart"></i> Adicionar ao
										carrinho
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</Layout>
	);
};

export default ListaDeDesejos;
