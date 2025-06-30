import OrdersPageClient from '@/components/ordersPage/OrdersPageClient';
import HeroSection from '@/components/shared/HeroSection';
import React from 'react';

async function OrdersPage() {

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection title="Order" />
      <div className="py-5">
             
              <OrdersPageClient />
   
      </div>
    </main>
  );
}

export default OrdersPage;
