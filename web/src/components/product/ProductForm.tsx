import React from "react";

type Props = {
	product: any;
};

const ProductForm = ({ product }: Props) => {
	return (
		<form className="product-form">
			{/* Adicione os campos do formulário conforme necessário */}
			<button type="submit" className="btn btn-primary">
				Add to Cart
			</button>
		</form>
	);
};

export default ProductForm;
