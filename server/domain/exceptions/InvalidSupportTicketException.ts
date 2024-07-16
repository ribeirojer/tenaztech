export class InvalidSupportTicketException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidSupportTicketException";
    }
}
