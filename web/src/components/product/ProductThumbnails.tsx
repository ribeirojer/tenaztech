import React from "react";

type Props = {
	thumbnails: string[];
};

const ProductThumbnails = ({ thumbnails }: Props) => {
	return (
		<div className="w-full md:w-2/12 md:order-1">
			<div id="product-imgs" className="space-y-4">
				{thumbnails.map((image, index) => (
					<div key={index} className="product-preview">
						<img src={image} alt="" className="w-full" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductThumbnails;
