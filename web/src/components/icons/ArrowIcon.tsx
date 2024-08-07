import React from "react";

type Props = {
	className?: string;
};

const ArrowIcon = (props: Props) => {
	return (
		<svg
			viewBox="0 0 24 24"
			focusable="false"
			role="presentation"
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
			></path>
		</svg>
	);
};

export default ArrowIcon;
