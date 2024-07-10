import React from "react";

type Props = {
	className?: string;
};

const ShoppingCartIcon = (props: Props) => {
	return (
		<svg
			{...props}
			id="Camada_2"
			data-name="Camada 2"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 117.11 139.12"
		>
			<g id="Camada_2-2" data-name="Camada 2">
				<path
					className="cls-1"
					d="M96.71,49.67v-12.43c0-20.34-16.65-37.61-36.99-37.23C39.99.38,24.11,16.47,24.11,36.29v13.38H0v71.25c0,10.05,8.15,18.2,18.2,18.2h80.72c10.06,0,18.2-8.16,18.2-18.2V49.67h-20.4ZM32.27,37.13c0-15.13,11.59-28.17,26.7-28.93,16.16-.82,29.58,12.09,29.58,28.09v13.38h-56.28v-12.54ZM108.95,120.92c0,5.54-4.49,10.04-10.04,10.04H18.2c-5.52,0-10.04-4.52-10.04-10.04v-63.09h15.95v6.68c0,3.86,3.13,6.99,6.99,6.99h1.17v-13.67h56.28v13.67h1.17c3.86,0,6.99-3.13,6.99-6.99v-6.68h12.24v63.09Z"
				/>
			</g>
		</svg>
	);
};

export default ShoppingCartIcon;
