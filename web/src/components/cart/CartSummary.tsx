import React from "react";

type Props = {
	cartTotal: number;
	shippingCost: number;
	discountDetails: any;
};

const CartSummary = ({ cartTotal, shippingCost, discountDetails }: Props) => {
	const discount = discountDetails
		? discountDetails.type === "fixed"
			? discountDetails.value
			: (discountDetails.value / 100) * cartTotal
		: 0;
	const total = cartTotal + shippingCost - discount;

	return (
		<div>
			<p>Total do carrinho: R${cartTotal.toFixed(2)}</p>
			<p>Custo de envio: R${shippingCost.toFixed(2)}</p>
			{discountDetails && <p>Desconto: R${discount.toFixed(2)}</p>}
			<p>Total: R${total.toFixed(2)}</p>
		</div>
	);
};

export default CartSummary;
