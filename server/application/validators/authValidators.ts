
export function validateLogin(body: any): string[] {
    const errors: string[] = [];
    if (!body.username) {
        errors.push("Username is required.");
    }
    if (!body.password) {
        errors.push("Password is required.");
    }
    return errors;
}

export function validateRegister(body: any): string[] {
    const errors: string[] = [];
    if (!body.username) {
        errors.push("Username is required.");
    }
    if (!body.password) {
        errors.push("Password is required.");
    }
    if (!body.email) {
        errors.push("Email is required.");
    }
    return errors;
}

export function validateRecoverPassword(body: any): string[] {
    const errors: string[] = [];
    if (!body.email) {
        errors.push("Email is required.");
    }
    return errors;
}

export function validateLogout(body: any): string[] {
    const errors: string[] = [];
    if (!body.token) {
        errors.push("Token is required.");
    }
    return errors;
}