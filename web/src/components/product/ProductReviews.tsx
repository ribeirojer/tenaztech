import React from "react";

type Props = {
	rating: number;
	reviews: any;
};

const ProductReviews = ({ rating, reviews }: Props) => {
	return (
		<div className="product-reviews">
			{/* Renderizar revisões do produto */}
		</div>
	);
};

export default ProductReviews;
