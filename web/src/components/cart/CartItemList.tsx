import React from "react";

type Props = {
	cartItems: any[];
	removeItem: (id: number) => void;
};

const CartItemList = ({ cartItems, removeItem }: Props) => {
	return (
		<div>
			{cartItems.map((item) => (
				<div key={item.id} className="flex justify-between items-center">
					<div>
						<h2>{item.name}</h2>
						<p>Quantidade: {item.quantity}</p>
						<p>Preço: R${item.price}</p>
					</div>
					<button onClick={() => removeItem(item.id)}>Remover</button>
				</div>
			))}
		</div>
	);
};

export default CartItemList;
