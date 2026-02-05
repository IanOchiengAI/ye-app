/**
 * M-Pesa Daraja API Utilities
 */

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const PASSKEY = process.env.MPESA_PASSKEY;
const SHORTCODE = process.env.MPESA_SHORTCODE;

/**
 * Generates an OAuth Access Token from Safaricom
 */
export async function getAccessToken() {
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

    const response = await fetch(url, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    const data = await response.json();
    return data.access_token;
}

/**
 * Generates formatted timestamp (YYYYMMDDHHmmss)
 */
export function getTimestamp() {
    const now = new Date();
    return now.toISOString()
        .replace(/[^0-9]/g, "")
        .slice(0, 14);
}

/**
 * Generates the base64 password for STK Push
 */
export function getPassword(timestamp: string) {
    const str = `${SHORTCODE}${PASSKEY}${timestamp}`;
    return Buffer.from(str).toString("base64");
}

/**
 * Formats a phone number to 254XXXXXXXXX format
 */
export function formatPhoneNumber(phone: string) {
    let cleaned = phone.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("0")) {
        cleaned = "254" + cleaned.slice(1);
    } else if (cleaned.startsWith("+")) {
        cleaned = cleaned.slice(1);
    } else if (!cleaned.startsWith("254")) {
        cleaned = "254" + cleaned;
    }
    return cleaned;
}
