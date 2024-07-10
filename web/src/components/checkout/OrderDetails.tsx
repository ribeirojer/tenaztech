import React from "react";

type Props = {
	products: any[];
};

const OrderDetails = ({ products }: Props) => {
	return (
		<div>
			<h2>Detalhes do Pedido</h2>
			<ul>
				{products.map((product, index) => (
					<li key={index}>
						{product.name} - {product.quantity}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OrderDetails;
