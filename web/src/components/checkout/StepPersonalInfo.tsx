import React, { useState } from "react";

type Props = {
	personalInfo: {
		name: string;
		email: string;
		tel: string;
		createAccount: boolean;
		password: string;
	};
	nextStep: (info: {
		name: string;
		email: string;
		tel: string;
		createAccount: boolean;
		password: string;
	}) => void;
};

const StepPersonalInfo = ({ personalInfo, nextStep }: Props) => {
	const [info, setInfo] = useState(personalInfo);

	const handleChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};

	const handleSubmit = () => {
		nextStep(info);
	};

	return (
		<div>
			<input
				type="text"
				name="name"
				value={info.name}
				onChange={handleChange}
				placeholder="Nome"
			/>
			<input
				type="email"
				name="email"
				value={info.email}
				onChange={handleChange}
				placeholder="Email"
			/>
			<input
				type="tel"
				name="tel"
				value={info.tel}
				onChange={handleChange}
				placeholder="Telefone"
			/>
			<button onClick={handleSubmit}>Próximo</button>
		</div>
	);
};

export default StepPersonalInfo;
