import React from "react";

type Props = {
	shipping: any;
	billing: any;
	products: any;
	nextStep: () => void;
};

const StepDelivery = ({ shipping, billing, products, nextStep }: Props) => {
	const handleCheckout = () => {
		nextStep(); // Passar dados de opção de envio selecionada, se necessário
	};

	return (
		<div>
			<h2>Resumo do Pedido</h2>
			<ul>
				{products.map(
					(
						product: {
							name:
								| string
								| number
								| bigint
								| boolean
								| React.ReactElement<
										any,
										string | React.JSXElementConstructor<any>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| Promise<React.AwaitedReactNode>
								| null
								| undefined;
							quantity:
								| string
								| number
								| bigint
								| boolean
								| React.ReactElement<
										any,
										string | React.JSXElementConstructor<any>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| Promise<React.AwaitedReactNode>
								| null
								| undefined;
						},
						index: React.Key | null | undefined,
					) => (
						<li key={index}>
							{product.name} - {product.quantity}
						</li>
					),
				)}
			</ul>
			<button onClick={handleCheckout}>Finalizar Pedido</button>
		</div>
	);
};

export default StepDelivery;
