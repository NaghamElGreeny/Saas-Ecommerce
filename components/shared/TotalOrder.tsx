"use client"
import { useCartStore } from '@/stores/cartStore';
import React from 'react'

export default function TotalOrder() {
  const CartResponse = useCartStore();
  const cart = CartResponse.cart;
  console.log('cart', cart.price)
  // console.log('res', CartResponse)
  //add promocode and delivery 
  const totalItems = cart?.data?.products.reduce((total, product) => total + product.quantity, 0);

  return (
      <>
            <h2 className="m-0 w-[90%] p-0 text-2xl font-bold">
            Order Summary
          </h2>
              <div className="order-summary h-fit w-[90%] space-y-4 rounded-2xl bg-white p-4">
      <div className="subTotal flex w-full justify-between">
        <h3>
          Subtotal{" "}
          <span className="ms-1 text-sm text-gray-300">
            {" "}
            ({totalItems} items)
          </span>
        </h3>
        <h3>
          {cart.price.sun_total}{" "}
          <span>{cart.currency}</span>
        </h3>
      </div>
      <div className="VAT flex w-full justify-between">
        <h3>VAT</h3>
        <h3>
          {cart.price.coupon_price}{" "}
          <span>{cart.currency}</span>
        </h3>
      </div>
      <div className="Surcharge flex w-full justify-between">
        <h3>Surcharge</h3>
        <h3>
          {cart.price.surcharge}{" "}
          <span>{cart.currency}</span>
        </h3>
      </div>
      <hr />
      <div className="totalAmount flex w-full justify-between font-bold">
        <h3>Total Amount</h3>
        <h3>
          {cart.price.total}{" "}
          <span className="font-normal">{cart.currency}</span>
        </h3>
      </div>
    </div>
      </>
  )
}
