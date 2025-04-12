import crypto from 'crypto';

export const generateUsername = (prefix = "user", byte = 6) => {
    const randomString = crypto.randomBytes(byte).toString("hex");
    return `${prefix.split(" ")[0].toLowerCase()}_${randomString}`
}