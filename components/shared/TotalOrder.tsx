import React from 'react'

export default function TotalOrder(CartResponse) {
  return (
      <>
            <h2 className="m-0 w-[90%] p-0 text-2xl">
            Order Summary
          </h2>
              <div className="order-summary h-fit w-[90%] space-y-4 rounded-2xl bg-white p-4">
      <div className="subTotal flex w-full justify-between">
        <h3>
          Subtotal{" "}
          <span className="ms-1 text-sm text-gray-300">
            {" "}
            ({cart?.products.length} items)
          </span>
        </h3>
        <h3>
          {CartResponse.price.sun_total}{" "}
          <span>{CartResponse.currency}</span>
        </h3>
      </div>
      <div className="VAT flex w-full justify-between">
        <h3>VAT</h3>
        <h3>
          {CartResponse.price.coupon_price}{" "}
          <span>{CartResponse.currency}</span>
        </h3>
      </div>
      <div className="Surcharge flex w-full justify-between">
        <h3>Surcharge</h3>
        <h3>
          {CartResponse.price.surcharge}{" "}
          <span>{CartResponse.currency}</span>
        </h3>
      </div>
      <hr />
      <div className="totalAmount flex w-full justify-between font-bold">
        <h3>Total Amount</h3>
        <h3>
          {CartResponse.price.total}{" "}
          <span className="font-normal">{CartResponse.currency}</span>
        </h3>
      </div>
    </div>
      </>
  )
}
