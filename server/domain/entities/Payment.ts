export class Payment {
	private _id: string;
	private _orderId: string;
	private _status: string;
	private _paymentDate: Date;
	private _amount: number;
	private _currency: string;
	private _description: string;
	createdAt: any;
	updatedAt: any;

	constructor(
		id: string,
		orderId: string,
		status: string,
		paymentDate: Date,
		amount: number,
		currency: string,
		description: string,
	) {
		this._id = id;
		this._orderId = orderId;
		this._status = this.validateStatus(status);
		this._paymentDate = paymentDate;
		this._amount = this.validateAmount(amount);
		this._currency = currency;
		this._description = description;
	}

	private validateStatus(status: string): string {
		const validStatuses = ["pending", "completed", "refunded", "failed"];
		if (!validStatuses.includes(status)) {
			throw new Error(`Invalid payment status: ${status}`);
		}
		return status;
	}

	private validateAmount(amount: number): number {
		if (amount <= 0) {
			throw new Error("Amount must be greater than zero");
		}
		return amount;
	}

	public get id(): string {
		return this._id;
	}

	public get orderId(): string {
		return this._orderId;
	}

	public get status(): string {
		return this._status;
	}

	public set status(status: string) {
		this._status = this.validateStatus(status);
	}

	public get paymentDate(): Date {
		return this._paymentDate;
	}

	public get amount(): number {
		return this._amount;
	}

	public get currency(): string {
		return this._currency;
	}

	public get description(): string {
		return this._description;
	}

	public refund(): void {
		if (this._status !== "completed") {
			throw new Error("Only completed payments can be refunded");
		}
		this._status = "refunded";
	}

	public complete(): void {
		if (this._status !== "pending") {
			throw new Error("Only pending payments can be completed");
		}
		this._status = "completed";
	}

	public fail(): void {
		if (this._status !== "pending") {
			throw new Error("Only pending payments can be marked as failed");
		}
		this._status = "failed";
	}
}
