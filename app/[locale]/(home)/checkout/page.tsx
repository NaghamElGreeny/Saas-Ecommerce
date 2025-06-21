import { useCartStore } from '@/stores/cartStore';
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItemCard from '@/components/shared/CartItem';


export default function ChecoutPage() {
      const { cart, fetchCart, loading } = useCartStore();
      const products = cart?.data?.products || [];
  return (
      <>
          <div className="container my-12 grid min-h-[70vh] grid-cols-1 gap-y-4 lg:grid-cols-2">
              <div className="order-2 lg:order-1"></div>
              <div className="order-1 lg:order-2">
                   <ScrollArea className="w-[97%] max-h-[350px] overflow-y-auto rounded-md p-4">
              {products.map((product) => (
                <CartItemCard cartProduct={product} key={product.id} />
              ))}
            </ScrollArea>
              </div>
          </div>
      </>
)
}

