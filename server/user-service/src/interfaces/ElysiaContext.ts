export type Context = {
	params: {
		roleId: any;
		provider: any;
		id: string;
		userId: string;
		itemId: string;
		productId: string;
	};
	body: {
		roles: any[];
		password: string;
		confirmPassword: string;
		token: string;
		name: string;
		email: string;
		resetToken: string;
		userId: string;
		productId: string;
		quantity: number;
		paymentMethod: string;
		addressId: string;
		points: number;
		phoneNumber: string;
		address: string;
	};
	set: { status: number };
	query: {
		q: string;
	};
};
