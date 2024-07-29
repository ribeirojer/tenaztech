import React, { forwardRef } from "react";

type InputProps = {
	checked?: boolean;
	id?: string;
	label?: string;
	type: string;
	name: string;
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type, name, value, placeholder, onChange, className, error }, ref) => {
		return (
			<div>
				<input
					type={type}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					ref={ref}
					className={`border-stroke dark:text-midnight dark:shadow-two w-full rounded-b-lg rounded-tl-lg border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none ${className}`}
				/>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
			</div>
		);
	},
);

Input.displayName = "Input";

export default Input;
