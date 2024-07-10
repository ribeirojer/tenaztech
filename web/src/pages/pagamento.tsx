import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import StepPersonalInfo from "@/components/checkout/StepPersonalInfo";
import StepBillingShipping from "@/components/checkout/StepBillingShipping";
import StepDelivery from "@/components/checkout/StepDelivery";
import OrderDetails from "@/components/checkout/OrderDetails";
import Layout from "@/components/core/Layout";

type Props = {};

const pagamento = (props: Props) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [personalInfo, setPersonalInfo] = useState({
		name: "",
		email: "",
		tel: "",
		createAccount: false,
		password: "",
	});
	const [billing, setBilling] = useState({
		zipCode: "",
		address: "",
		number: "",
		complement: "",
		neighborhood: "",
		city: "",
		state: "",
	});
	const [shipping, setShipping] = useState({
		zipCode: "89216410",
		address: "",
		number: "",
		complement: "",
		neighborhood: "",
		city: "",
		state: "",
	});
	const [products, setProducts] = useState<any>([]);
	const [selectedShippingOption, setSelectedShippingOption] =
		useState<any>(null);
	const [totalPrice, setTotalPrice] = useState(0);
	const [paymentStatus, setPaymentStatus] = useState("");
	const [paymentLink, setPaymentLink] = useState("");
	const [coupon, setCoupon] = useState<any>({});
	const router = useRouter();

	const steps = ["Informações", "Endereço", "Pedido", "Pagamento"];

	useEffect(() => {
		setCoupon(JSON.parse(localStorage.getItem("coupon") || "{}"));
		fetchUserDetails();
		fetchCartProducts();
	}, []);

	const handlePersonalInfo = (
		info: React.SetStateAction<{
			name: string;
			email: string;
			tel: string;
			createAccount: boolean;
			password: string;
		}>,
	) => {
		setPersonalInfo(info);
		setCurrentStep(currentStep + 1);
	};

	const handleBillingShipping = (data: {
		billing: React.SetStateAction<{
			zipCode: string;
			address: string;
			number: string;
			complement: string;
			neighborhood: string;
			city: string;
			state: string;
		}>;
		shipping: React.SetStateAction<{
			zipCode: string;
			address: string;
			number: string;
			complement: string;
			neighborhood: string;
			city: string;
			state: string;
		}>;
	}) => {
		setBilling(data.billing);
		setShipping(data.shipping);
		setCurrentStep(currentStep + 1);
	};

	const fetchUserDetails = async () => {
		try {
			const response = await axios.get("/api/user/details");
			const userData = response.data;
			console.log(userData);
			// Atualizar billing e shipping com dados do usuário, se necessário
		} catch (error) {
			console.error("Error fetching user details:", error);
		}
	};

	const fetchCartProducts = async () => {
		try {
			const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
			const productsData = await Promise.all(
				cartItems.map(async (item: { slug: any; quantity: any }) => {
					const response = await axios.get(
						`https://product-catalog-service.deno.dev/api/products/${item.slug}`,
					);
					const productDetails = response.data;
					return {
						name: productDetails.name,
						quantity: item.quantity,
						price: productDetails.price,
						weight: productDetails.weight,
						height: productDetails.height,
						width: productDetails.width,
						length: productDetails.length,
					};
				}),
			);
			setProducts(productsData);
		} catch (error) {
			console.error("Error fetching cart products:", error);
		}
	};

	const processOrder = async () => {
		try {
			const orderDetails = {
				personalInfo,
				billing,
				shipping,
				products,
				selectedShippingOption,
				total: totalPrice,
			};

			const response = await axios.post(
				"http://localhost:3000/orders",
				orderDetails,
			);
			const { data } = response;

			setPaymentLink(data.order.id);
			localStorage.removeItem("cart");
		} catch (error) {
			console.error("Erro ao processar pagamento:", error);
			setPaymentStatus("error");
		}
	};

	const calculateTotal = () => {
		let total = 0;
		products.forEach((product: { price: string }) => {
			total += parseFloat(product.price);
		});

		if (selectedShippingOption) {
			total += parseFloat(selectedShippingOption.price.replace(",", "."));
		}

		if (coupon) {
			if (coupon.type === "fixed") {
				total -= parseFloat(coupon.value);
			} else if (coupon.type === "percent") {
				total -= (parseFloat(coupon.value) / 100) * total;
			}
		}

		total = Math.max(total, 0);
		setTotalPrice(parseFloat(total.toFixed(2)));
	};

	const validateOrderDetails = () => {
		if (
			!personalInfo.name ||
			!personalInfo.email ||
			!personalInfo.tel ||
			!billing.address ||
			!billing.city ||
			!billing.zipCode ||
			!billing.number ||
			!billing.neighborhood ||
			!billing.state ||
			products.length === 0
		) {
			return false;
		}
		if (personalInfo.createAccount && !personalInfo.password) {
			return false;
		}
		return true;
	};

	const checkout = async (option = null) => {
		setSelectedShippingOption(option);

		if (!validateOrderDetails()) {
			return;
		}

		calculateTotal();
		await processOrder();

		if (paymentLink) {
			router.push({
				pathname: "/confirmacao-pedido",
				query: { link: paymentLink },
			});
		}
	};

	return (		<Layout>

		<div className="container mx-auto flex flex-col lg:flex-row gap-4 px-4 lg:px-0 my-8 lg:my-12">
			<div className="w-full lg:w-2/3">
				<CheckoutProgress currentStep={currentStep} steps={steps} />
				{currentStep === 0 && (
					<StepPersonalInfo
						personalInfo={personalInfo}
						nextStep={handlePersonalInfo}
					/>
				)}
				{currentStep === 1 && (
					<>
						<StepBillingShipping nextStep={handleBillingShipping} />
						<button
							onClick={() => setCurrentStep(currentStep - 1)}
							className="mt-4 px-4 py-2 rounded text-white font-bold bg-gray-300 hover:bg-gray-400 focus:outline-none"
						>
							Voltar
						</button>
					</>
				)}
				{currentStep === 2 && (
					<>
						<StepDelivery
							shipping={shipping}
							billing={billing}
							products={products}
							nextStep={checkout}
						/>
						<button
							onClick={() => setCurrentStep(currentStep - 1)}
							className="mt-4 px-4 py-2 rounded text-white font-bold bg-gray-300 hover:bg-gray-400 focus:outline-none"
						>
							Voltar
						</button>
					</>
				)}
			</div>
			<div className="w-full lg:w-1/3">
				<OrderDetails products={products} />
			</div>
		</div>		</Layout>

	);
};

export default pagamento;
