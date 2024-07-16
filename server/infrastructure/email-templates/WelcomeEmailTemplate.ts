// infrastructure/email-templates/WelcomeEmailTemplate.ts
export class WelcomeEmailTemplate {
    static getSubject(): string {
        return "Welcome to Acme";
    }

    static getHtmlContent(firstName: string, lastName: string): string {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="color: #333;">Welcome to Acme, ${firstName} ${lastName}!</h1>
                <p style="color: #555;">We're excited to have you on board. Explore our products and enjoy your shopping experience!</p>
                <p style="color: #555;">Best regards,<br>Acme Team</p>
            </div>
        `;
    }
}
