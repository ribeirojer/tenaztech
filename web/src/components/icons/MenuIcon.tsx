import React from "react";

type Props = {
	className?: string;
};

const MenuIcon = (props: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className={props.className}
		>
			<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
		</svg>
	);
};

export default MenuIcon;
