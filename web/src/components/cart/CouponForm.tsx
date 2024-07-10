import React, { useState } from "react";

type Props = {
	applyCoupon: (couponCode: string) => void;
	couponApplied: boolean;
	loading: boolean;
	message: string;
	success: boolean;
};

const CouponForm = ({
	applyCoupon,
	couponApplied,
	loading,
	message,
	success,
}: Props) => {
	const [couponCode, setCouponCode] = useState("");

	const handleApplyCoupon = () => {
		if (couponCode) {
			applyCoupon(couponCode);
		}
	};

	return (
		<div>
			<input
				type="text"
				value={couponCode}
				onChange={(e) => setCouponCode(e.target.value)}
				placeholder="Código do cupom"
			/>
			<button
				onClick={handleApplyCoupon}
				disabled={loading || couponApplied}
				className="px-4 py-2 bg-blue-500 text-white rounded"
			>
				Aplicar Cupom
			</button>
			{message && (
				<p className={`mt-2 ${success ? "text-green-500" : "text-red-500"}`}>
					{message}
				</p>
			)}
		</div>
	);
};

export default CouponForm;
