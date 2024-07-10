import React from "react";

type Props = {
	categories: string[];
	selectCategory: (category: React.SetStateAction<string>) => void;
	applyPriceFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const ProductSidebar = ({
	categories,
	selectCategory,
	applyPriceFilter,
}: Props) => {
	return (
		<div className="w-full md:w-1/4 p-4">
			<h2 className="text-xl font-semibold mb-4">Categorias</h2>
			<ul>
				{categories.map((category) => (
					<li key={category} onClick={() => selectCategory(category)}>
						{category}
					</li>
				))}
			</ul>
			<h2 className="text-xl font-semibold mt-6 mb-4">Preço</h2>
			<select onChange={applyPriceFilter}>
				<option value="">Selecione</option>
				<option value="0-50">R$0 - R$50</option>
				<option value="51-100">R$51 - R$100</option>
				<option value="101-200">R$101 - R$200</option>
				<option value="201-500">R$201 - R$500</option>
				<option value="501-1000">R$501 - R$1000</option>
			</select>
		</div>
	);
};

export default ProductSidebar;
