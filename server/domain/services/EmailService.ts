// domain/services/EmailService.ts
import { Order } from '../entities/Order.ts';

export interface EmailService {
    sendPasswordResetEmail(arg0: string, resetToken: string): unknown;
    sendWelcomeEmail(arg0: string, firstName: string): unknown;
    sendOrderCreatedEmail(order: Order): Promise<void>;
    sendOrderCompletedEmail(order: Order): Promise<void>;
    sendOrderFailedEmail(order: Order, reason: string): Promise<void>;
}