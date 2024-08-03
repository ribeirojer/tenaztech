import React from "react";

type Props = {
	isTopHeaderVisible?: boolean;
};

const TopHeader = ({ isTopHeaderVisible }: Props) => {
	return (
		<div
			className={`fixed top-0 left-0 right-0 z-20 transition-transform duration-300 ${isTopHeaderVisible ? "transform translate-y-0" : "transform -translate-y-full"}`}
		>
			<div className="hidden md:block text-center bg-glow-tech p-2 text-sm">
				Utilize o Cupom "EUSOUTENAZ" para obter 5% de desconto na sua primeira
				compra
			</div>
			<div className="block md:hidden text-center bg-glow-tech p-2 text-sm">
				Use o cupom "EUSOUTENAZ" e ganhe 5% off na 1ª compra.
			</div>
		</div>
	);
};

export default TopHeader;
