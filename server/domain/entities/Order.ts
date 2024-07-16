import { OrderStatus } from '../value-objects/OrderStatus.ts';
import { OrderItem } from '../value-objects/OrderItem.ts';
import { Address } from '../value-objects/Address.ts';
import { OrderId } from '../value-objects/OrderId.ts';
import { CustomerId } from '../value-objects/CustomerId.ts';
import { Coupon } from '../value-objects/Coupon.ts';

export class Order {
    private coupons: Coupon[] = [];

    constructor(
        private readonly id: OrderId,
        private readonly customerId: CustomerId,
        private readonly orderDate: Date,
        private items: OrderItem[],
        private totalAmount: number,
        private shippingAddress: Address,
        private status: OrderStatus,
        private createdAt: Date = new Date(),
        private updatedAt: Date = new Date(),
        private processing: boolean = false
    ) {
        this.validateItems(items);
        this.validateTotalAmount(totalAmount);
    }

    // Validations
    private validateItems(items: OrderItem[]): void {
        if (items.length === 0) {
            throw new Error('Order must contain at least one item.');
        }
    }

    private validateTotalAmount(totalAmount: number): void {
        if (totalAmount < 0) {
            throw new Error('Total amount cannot be negative.');
        }
    }

    // Business logic
    public updateStatus(newStatus: OrderStatus): void {
        if (!this.status.isValidTransition(newStatus)) {
            throw new Error('Invalid status transition.');
        }
        this.status = newStatus;
        this.updatedAt = new Date();
    }

    public addItem(item: OrderItem): void {
        this.items.push(item);
        this.totalAmount += item.getTotalPrice();
        this.updatedAt = new Date();
    }

    public removeItem(productId: string): void {
        const index = this.items.findIndex(item => item.productId === productId);
        if (index !== -1) {
            this.totalAmount -= this.items[index].getTotalPrice();
            this.items.splice(index, 1);
            this.updatedAt = new Date();
        } else {
            throw new Error('Item not found in order.');
        }
    }

    public applyCoupon(coupon: Coupon): void {
        const newTotalDiscount = this.calculateTotalDiscount() + coupon.getDiscountPercentage();
        if (newTotalDiscount > 30) {
            throw new Error('Total discount cannot exceed 30%');
        }
        this.coupons.push(coupon);
        this.totalAmount = this.calculateTotalAmount();
        this.updatedAt = new Date();
    }

    private calculateTotalDiscount(): number {
        return this.coupons.reduce((sum, coupon) => sum + coupon.getDiscountPercentage(), 0);
    }

    private calculateTotalAmount(): number {
        const totalDiscount = this.calculateTotalDiscount();
        return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0) * (1 - totalDiscount / 100);
    }

    startProcessing() {
        if (this.processing) {
            throw new Error('Order is already being processed.');
        }
        this.processing = true;
    }

    completeProcessing() {
        this.processing = false;
    }

    isProcessing(): boolean {
        return this.processing;
    }

    public getOrderDetails() {
        return {
            id: this.id,
            customerId: this.customerId,
            orderDate: this.orderDate,
            items: this.items,
            totalAmount: this.totalAmount,
            shippingAddress: this.shippingAddress,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            coupons: this.coupons.map(coupon => coupon.getCode())
        };
    }
}
