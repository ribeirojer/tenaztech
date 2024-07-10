import React, { useState } from "react";

type Props = {
	nextStep: (data: any) => void;
};

const StepBillingShipping = ({ nextStep }: Props) => {
	const [data, setData] = useState<any>({
		billing: {
			zipCode: "",
			address: "",
			number: "",
			complement: "",
			neighborhood: "",
			city: "",
			state: "",
		},
		shipping: {
			zipCode: "",
			address: "",
			number: "",
			complement: "",
			neighborhood: "",
			city: "",
			state: "",
		},
	});

	const handleChange = (e: {
		target: { name: any; value: any; dataset: any };
	}) => {
		const { name, value, dataset } = e.target;
		setData({
			...data,
			[dataset.type]: { ...data[dataset.type], [name]: value },
		});
	};

	const handleSubmit = () => {
		nextStep(data);
	};

	return (
		<div>
			<h2>Endereço de Cobrança</h2>
			<input
				type="text"
				name="zipCode"
				data-type="billing"
				value={data.billing.zipCode}
				onChange={handleChange}
				placeholder="CEP"
			/>
			<input
				type="text"
				name="address"
				data-type="billing"
				value={data.billing.address}
				onChange={handleChange}
				placeholder="Endereço"
			/>
			{/* Outros campos de endereço */}
			<h2>Endereço de Entrega</h2>
			<input
				type="text"
				name="zipCode"
				data-type="shipping"
				value={data.shipping.zipCode}
				onChange={handleChange}
				placeholder="CEP"
			/>
			<input
				type="text"
				name="address"
				data-type="shipping"
				value={data.shipping.address}
				onChange={handleChange}
				placeholder="Endereço"
			/>
			{/* Outros campos de endereço */}
			<button onClick={handleSubmit}>Próximo</button>
		</div>
	);
};

export default StepBillingShipping;
