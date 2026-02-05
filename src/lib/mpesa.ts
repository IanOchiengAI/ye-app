// M-Pesa Daraja API Utilities
// Using Sandbox credentials for MVP

const DARAJA_CONSUMER_KEY = process.env.DARAJA_KEY || 'sandbox_key';
const DARAJA_CONSUMER_SECRET = process.env.DARAJA_SECRET || 'sandbox_secret';
const DARAJA_BASE_URL = 'https://sandbox.safaricom.co.ke';

interface PaymentRequest {
    phone: string;
    amount: number;
}

export async function getAccessToken(): Promise<string> {
    // In a real app, this would fetch from Safaricom API
    // For MVP demo, returning mock token
    console.log('Fetching M-Pesa Access Token...');
    return 'mock_access_token_' + Date.now();
}

export async function initiateSTKPush({ phone, amount }: PaymentRequest) {
    // Mock STK Push request
    console.log(`Initiating STK Push for ${phone} amount KES ${amount}`);

    return {
        ResponseCode: "0",
        ResponseDescription: "Success. Request accepted for processing",
        MerchantRequestID: "29412-29708765-1",
        CheckoutRequestID: "ws_CO_DMZ_123456789",
        CustomerMessage: "Success. Request accepted for processing"
    };
}

export const PAYMENT_PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        price: 0,
        features: ['Access to all contents', 'Basic AI Chat', 'Community Forum'],
        color: 'var(--color-text-secondary)',
        btnColor: 'btn-outline'
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 500,
        features: ['Everything in Basic', 'Unlimited Mentor Sessions', 'Priority AI Support', 'Certificates'],
        color: 'var(--color-primary)',
        btnColor: 'btn-primary'
    },
    {
        id: 'sponsor',
        name: 'Sponsor a Youth',
        price: 1000,
        features: ['Sponsor 2 students', 'Impact Report', 'Tax Deductible', 'Wall of Fame'],
        color: 'var(--color-coral)',
        btnColor: 'btn-secondary'
    }
];
