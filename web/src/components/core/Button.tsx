import React from "react";

type Props = {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	className: string;
	children: React.ReactNode;
	onClick?: () => void;
};

const Button = (props: Props) => {
	return (
		<div>
			<button className={props.className} onClick={props.onClick}>
				{props.children}
			</button>
		</div>
	);
};

export default Button;
