import React from "react";

type Props = {
	className?: string;
};

const SearchIcon = (props: Props) => {
	return (
		<svg
			className={props.className}
			id="Camada_2"
			data-name="Camada 2"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 137 130.8"
		>
			<g id="Camada_2-2" data-name="Camada 2">
				<path
					className="cls-1"
					d="M116.9,11.39c-19.13-15.23-46.77-15.18-65.86.11-22.51,18.04-25.96,49.64-10.38,71.85L0,124.02l2.39,2.39c5.85,5.85,15.33,5.85,21.18,0l30.08-30.08c9.09,6.37,19.74,9.57,30.4,9.57,13.57,0,27.13-5.16,37.46-15.49,22.09-22.09,20.56-59-4.6-79.03ZM111.51,74.05c-13.95,18.02-40.97,18.02-54.92,0-9.51-12.28-9.52-29.88,0-42.17,6.98-9.01,17.22-13.52,27.47-13.52s20.49,4.51,27.47,13.52c9.51,12.29,9.51,29.89,0,42.17Z"
				/>
			</g>
		</svg>
	);
};

export default SearchIcon;
