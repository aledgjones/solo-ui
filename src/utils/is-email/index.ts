import isemail from 'isemail';

/**
 * Checks if an email is valid
 */
export function isEmail(email: string) {
    return isemail.validate(email);
}