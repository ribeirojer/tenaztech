import axiod from 'https://deno.land/x/axiod/mod.ts';

export class MercadoPagoService {
    private readonly accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    async createPayment(description: string, amount: number, paymentMethod: string, email: string): Promise<any> {
        const url = 'https://api.mercadopago.com/v1/payments';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`,
        };

        const body = {
            transaction_amount: amount,
            description: description,
            payment_method_id: paymentMethod,
            payer: {
                email: email,
            },
        };

        try {
            const response = await axiod.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new Error('Payment creation failed');
        }
    }
}
