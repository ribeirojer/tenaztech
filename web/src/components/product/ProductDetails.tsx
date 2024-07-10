import React from "react";

type Props = {
	product: any;
};

const ProductDetails = ({ product }: Props) => {
	return (
		<div className="product-details">
			<h2 className="text-2xl font-bold">{product.name}</h2>
			<p className="text-gray-500">{product.price}</p>
			{/* Adicione mais detalhes conforme necessário */}
		</div>
	);
};

export default ProductDetails;
