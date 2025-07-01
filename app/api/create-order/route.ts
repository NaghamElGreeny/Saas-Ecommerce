import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { CartProduct } from '@/utils/cartTypes';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutRequestBody = Record<string, string> & {
  cartProducts: CartProduct[];
  total: number;
}


export async function POST(req: Request) {
  try {
    /*  if (!process.env.STRIPE_SECRET_KEY) {
       throw new Error('Stripe secret key not configured');
     }
  */
    const body: CheckoutRequestBody = await req.json();
    const { cartProducts, total, ...additionalParams } = body;

    if (!cartProducts?.length || !total || typeof total !== 'number') {
      return NextResponse.json(
        { message: 'Invalid request body. Missing cart items or price summary.' },
        { status: 400 }
      );
    }


    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let sessionCurrency: string | null = null;

    for (const cartProduct of cartProducts) {
      const { product, quantity, sub_modifiers } = cartProduct;
      const currency = product.price.currency;
      const unitAmount = Math.round(product.price.price * 100);
      if (sessionCurrency && sessionCurrency !== currency) {
        return NextResponse.json(
          { message: 'All products must use the same currency' },
          { status: 400 }
        );
      }
      sessionCurrency = currency;

      const descriptionParts: string[] = [];
      sub_modifiers.forEach((sub) => {
        sub.item_modifiers.forEach((mod) => {
          descriptionParts.push(`${mod.quantity}x ${mod.name}`);
        });
      });
      const description = descriptionParts.join(', ').slice(0, 500);

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: description || undefined,
            images: product.image ? [product.image] : undefined,
          },
          unit_amount: unitAmount,
        },
        quantity,
      });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL;

    // Construct search parameters from additionalParams
    const searchParams = new URLSearchParams();
    for (const key in additionalParams) {
      if (Object.prototype.hasOwnProperty.call(additionalParams, key)) {
        searchParams.append(key, additionalParams[key]);
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}${searchParams.toString() ? `&${searchParams.toString()}` : ''}`,
      cancel_url: `${origin}/checkout?status=faild`,
      metadata: {
        originalTotal: total.toFixed(2),
        itemCount: cartProducts.length.toString(),
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Checkout error:', error.message);

    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}