import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import { getCart, removeFromCart } from "../utils/localStorage";
import CartItemList from "@/components/cart/CartItemList";
import CouponForm from "@/components/cart/CouponForm";
import CartSummary from "@/components/cart/CartSummary";
import Layout from "@/components/core/Layout";

type Props = {};

const carrinho = (props: Props) => {
	const [cartItems, setCartItems] = useState<any[]>([]);
	const [couponCode, setCouponCode] = useState("");
	const [couponApplied, setCouponApplied] = useState(false);
	const [discountDetails, setDiscountDetails] = useState(null);
	const [loading, setLoading] = useState(false);
	const [couponMessage, setCouponMessage] = useState("");
	const [couponSuccess, setCouponSuccess] = useState(false);

	const cartTotal = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);
	const shippingCost = 10;

	useEffect(() => {
		loadCartItems();
	}, []);

	const loadCartItems = async () => {
		const cartData = getCart();
		const promises = cartData.map(async (item) => {
			try {
				const response = await axios.get(
					`https://product-catalog-service.deno.dev/api/products/${item.slug}`,
				);
				const productDetails = response.data;
				setCartItems((prevItems) => [
					...prevItems,
					{ ...item, ...productDetails },
				]);
			} catch (error) {
				console.error("Erro ao carregar detalhes do produto:", error);
			}
		});
		await Promise.all(promises);
	};

	const applyCoupon = async (couponCode: any) => {
		setLoading(true);
		setCouponMessage("");
		try {
			const response = await axios.post("http://seuservidor.com/api/coupon", {
				couponCode,
			});
			setCouponApplied(true);
			setDiscountDetails(response.data);
			setCouponMessage("Cupom aplicado com sucesso!");
			setCouponSuccess(true);
		} catch (error) {
			console.error("Erro ao aplicar o cupom:", error);
			setCouponMessage("Erro ao aplicar o cupom. Tente novamente.");
			setCouponSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	const checkout = () => {
		// Redirecionar para a página de checkout
		window.location.href = "/checkout";
	};

	const removeItemFromCart = (itemId: any) => {
		removeFromCart(itemId);
		setCartItems(cartItems.filter((item: any) => item.id !== itemId));
	};

	return (
		<Layout>

		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Carrinho de Compras
			</h1>
			{cartItems.length === 0 ? (
				<div className="flex flex-col justify-center items-center">
					<img src="/assets/8-5.png" alt="" className="size-80 -m-4" />
					<span className="text-center text-gray-500">
						Seu carrinho está vazio.
					</span>
					<Link href="/produtos"className="px-6 my-4 text-white bg-purple-500 hover:bg-purple-600 py-3 rounded-md transition duration-300">
							Ver produtos
					</Link>
				</div>
			) : (
				<div className="flex flex-col md:flex-row justify-between gap-4 px-4 md:px-0">
					<CartItemList cartItems={cartItems} removeItem={removeItemFromCart} />
					<div className="flex flex-col gap-4">
						<CouponForm
							applyCoupon={applyCoupon}
							couponApplied={couponApplied}
							loading={loading}
							message={couponMessage}
							success={couponSuccess}
						/>
						<CartSummary
							cartTotal={cartTotal}
							shippingCost={shippingCost}
							discountDetails={discountDetails}
						/>
						<button
							onClick={checkout}
							className="px-4 py-2 rounded my-4 text-white font-bold bg-gradient-to-r from-sky-500 from-10% to-green-500 to-90%"
						>
							Finalizar Compra
						</button>
					</div>
				</div>
			)}
		</div>
		</Layout>
	);
};

export default carrinho;
