import React from "react";

type Props = {
	images: string[];
};

const ProductImages = ({ images }: Props) => {
	return (
		<div className="product-images">
			{images.map((image, index) => (
				<img key={index} src={image} alt={`Product image ${index}`} />
			))}
		</div>
	);
};

export default ProductImages;
