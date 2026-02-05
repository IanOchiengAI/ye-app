import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // M-Pesa Callback Structure: body.Body.stkCallback
        const callbackData = body.Body.stkCallback;
        const resultCode = callbackData.ResultCode;
        const checkoutRequestID = callbackData.CheckoutRequestID;

        console.log(`[M-Pesa Callback] ID: ${checkoutRequestID} | Result: ${resultCode}`);

        if (resultCode === 0) {
            // Success! 
            // Here you would find the user in DB using checkoutRequestID and 
            // upgrade their account for 24 hours.
            const items = callbackData.CallbackMetadata.Item;
            const amount = items.find((i: any) => i.Name === "Amount")?.Value;
            const receipt = items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
            const phone = items.find((i: any) => i.Name === "PhoneNumber")?.Value;

            console.log(`>>> PAYMENT SUCCESS: KES ${amount} | Receipt: ${receipt} | User: ${phone}`);

            // TODO: Update Firebase User Profile
            // await adminDb.collection('users').where('tempPaymentId', '==', checkoutRequestID).update({ tier: 'premium' })
        } else {
            console.log(`>>> PAYMENT FAILED/CANCELLED: ${callbackData.ResultDesc}`);
        }

        return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
    } catch (error) {
        console.error("Callback Error:", error);
        return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 });
    }
}
