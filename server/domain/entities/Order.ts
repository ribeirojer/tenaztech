export class Order {
    private validStatuses = ['pending', 'completed', 'cancelled'];
    items: any;
    createdAt: any;

    constructor(
        public id: string,
        public customerId: string,
        public productIds: string[],
        public status: string,
        public totalAmount: number
    ) {
        if (!this.validStatuses.includes(status)) {
            throw new Error('Invalid status');
        }
    }

    updateStatus(newStatus: string) {
        if (!this.validStatuses.includes(newStatus)) {
            throw new Error('Invalid status');
        }
        this.status = newStatus;
    }
}
