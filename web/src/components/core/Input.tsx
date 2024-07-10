import React from "react";

type Props = {
	id?: string;
	label?: string;
	type: string;
	placeholder: string;
	className: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputRef: any;
	error?: string;
};

const Input = (props: Props) => {
	return (
		<div>
			<label htmlFor={props.id} className="block mb-2">
				{props.label}
			</label>
			<input
				id={props.id}
				type="text"
				value={props.value}
				onChange={props.onChange}
				ref={props.inputRef}
				placeholder="Digite o que procura"
				className="border-2 border-gray-300 p-2 rounded-md w-full"
			/>
			{props.error && (
				<p className="text-red-500 text-sm mt-1">{props.error}</p>
			)}
		</div>
	);
};

export default Input;
