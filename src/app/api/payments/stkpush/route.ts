import { NextResponse } from 'next/server';
import { getAccessToken, getTimestamp, getPassword, formatPhoneNumber } from '@/lib/mpesa/utils';

export async function POST(request: Request) {
    try {
        const { phone, amount, accountRef } = await request.json();

        if (!phone || !amount) {
            return NextResponse.json({ error: "Phone and Amount are required" }, { status: 400 });
        }

        const accessToken = await getAccessToken();
        const timestamp = getTimestamp();
        const password = getPassword(timestamp);
        const formattedPhone = formatPhoneNumber(phone);

        const payload = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: formattedPhone,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: formattedPhone,
            CallBackURL: process.env.MPESA_CALLBACK_URL,
            AccountReference: accountRef || "YouthEducated",
            TransactionDesc: "Daily Premium Access"
        };

        const response = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.ResponseCode === "0") {
            return NextResponse.json({
                success: true,
                checkoutRequestID: data.CheckoutRequestID,
                message: "STK Push sent successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                error: data.ResponseDescription || "STK Push initiation failed"
            }, { status: 400 });
        }

    } catch (error: any) {
        console.error("STK Push error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
