import { NextResponse } from 'next/server';

const stripe = new Stripe('sk_test_51Rfh1xQuvBQQaqOXH6p7jZFTamrA48voiqsEcsDMEQIkGpK6OgsGrV5CwpkEzHMB48I8UVJRiEv4XwwWOMr0ECmE00cwDsMbxi');
/* 
interface Price {
  price: number;
  currency: string;
}

interface Product {
  name: string;
  image?: string;
  price: Price;
}

interface ItemModifier {
  quantity: number;
  name: string;
}

interface SubModifier {
  item_modifiers: ItemModifier[];
}

interface CartProduct {
  product: Product;
  quantity: number;
  sub_modifiers: SubModifier[];
}

interface PriceSummary {
  total: number;
}
 */
interface CheckoutRequestBody {
  cartProducts: CartProduct[];
  priceSummary: PriceSummary;
}


export async function POST(req: Request) {
  try {
   /*  if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not configured');
    }
 */
    const body: CheckoutRequestBody = await req.json();
    const { cartProducts, priceSummary } = body;

    if (!cartProducts?.length || !priceSummary || typeof priceSummary.total !== 'number') {
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
          descriptionParts.push(⁠ ${mod.quantity}x ${mod.name} ⁠);
        });
      });
      const description = descriptionParts.join(', ').slice(0, 500);

      line_items.push({
        price_data: {
          currency:"usd",
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
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: ⁠ ${origin}/checkout?session_id={CHECKOUT_SESSION_ID} ⁠,
      cancel_url: ⁠ ${origin}/checkout?status=faild ⁠,
      metadata: {
        originalTotal: priceSummary.total.toFixed(2),
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