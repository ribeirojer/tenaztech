import React from "react";
import Input from "@/components/core/Input"; // Certifique-se de ajustar o caminho conforme necessário

interface Props {
	title: string;
	info: {
		firstName: string;
		lastName: string;
		email: string;
		tel: string;
		[key: string]: any; // Permite propriedades adicionais
	};
	setInfo: (info: any) => void;
	errorInfo: {
		firstName?: string;
		lastName?: string;
		email?: string;
		tel?: string;
		[key: string]: any; // Permite propriedades adicionais
	};
	refsInfo: {
		firstName?: React.RefObject<HTMLInputElement>;
		lastName?: React.RefObject<HTMLInputElement>;
		email?: React.RefObject<HTMLInputElement>;
		tel?: React.RefObject<HTMLInputElement>;
		[key: string]: any; // Permite propriedades adicionais
	};
	errorEmailRegex: string;
	handleSubmitCep: () => void;
}

const InputsCheckout = ({
	title,
	info,
	setInfo,
	errorInfo,
	refsInfo,
	errorEmailRegex,
	handleSubmitCep,
}: Props) => {
	return (
		<div className="">
			<h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
			<div className="flex flex-col md:flex-row w-full gap-4">
				<div className="flex flex-col w-full md:w-1/2">
					<Input
						id="first-name"
						label="Primeiro nome"
						type="text"
						placeholder="Primeiro nome"
						value={info.firstName}
						error={errorInfo.firstName}
						ref={refsInfo.firstName}
						className={""}
						onChange={function (
							event: React.ChangeEvent<HTMLInputElement>
						): void {
							throw new Error("Function not implemented.");
						} } name={""}					/>
				</div>
				<div className="flex flex-col w-full md:w-1/2">
					<Input
						id="last-name"
						type="text"
						label="Último nome"
						placeholder="Último nome"
						value={info.lastName}
						error={errorInfo.lastName}
						ref={refsInfo.lastName}
						className={""}
						onChange={function (
							event: React.ChangeEvent<HTMLInputElement>
						): void {
							throw new Error("Function not implemented.");
						} } name={""}					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row w-full gap-4">
				<div className="flex flex-col w-full md:w-1/2">
					<Input
						id="email"
						type="email"
						label="E-mail"
						placeholder="exemplo@email.com"
						value={info.email}
						error={errorInfo.email}
						ref={refsInfo.email}
						className={""}
						onChange={function (
							event: React.ChangeEvent<HTMLInputElement>
						): void {
							throw new Error("Function not implemented.");
						} } name={""}					/>
					{errorEmailRegex && (
						<p className="text-red-500 mt-1">Digite um e-mail válido.</p>
					)}
				</div>
				<div className="flex flex-col w-full md:w-1/2">
					<Input
						id="tel"
						type="text"
						label="Número do celular"
						placeholder="(12) 98765-4321"
						value={info.tel}
						error={errorInfo.tel}
						ref={refsInfo.tel}
						className={""}
						onChange={function (
							event: React.ChangeEvent<HTMLInputElement>
						): void {
							throw new Error("Function not implemented.");
						} } name={""}					/>
				</div>
			</div>
			{/* Adicione o restante dos Inputs aqui */}
		</div>
	);
};

export default InputsCheckout;
