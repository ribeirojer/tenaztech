import React from "react";

type Props = {
	currentStep: number;
	steps: string[];
};

const CheckoutProgress = ({ currentStep, steps }: Props) => {
	return (
		<div className="flex justify-between mb-4">
			{steps.map((step, index) => (
				<div
					key={index}
					className={`step ${index <= currentStep ? "active" : ""}`}
				>
					{step}
				</div>
			))}
		</div>
	);
};

export default CheckoutProgress;
