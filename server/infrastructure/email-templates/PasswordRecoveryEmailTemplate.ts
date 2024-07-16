// infrastructure/email-templates/PasswordRecoveryEmailTemplate.ts
export class PasswordRecoveryEmailTemplate {
    static getSubject(): string {
        return "Password Recovery";
    }

    static getHtmlContent(recoveryLink: string): string {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="color: #333;">Password Recovery</h1>
                <p style="color: #555;">We received a request to reset your password. Click the link below to reset your password:</p>
                <a href="${recoveryLink}" style="color: #007BFF;">Reset Password</a>
                <p style="color: #555;">If you did not request a password reset, please ignore this email.</p>
                <p style="color: #555;">Best regards,<br>Acme Team</p>
            </div>
        `;
    }
}
