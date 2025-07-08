
import Menu from '@/components/menu';
import HeroSection from '@/components/shared/HeroSection';
import { getHome } from '@/services/ApiHandler';
import { getTranslations } from 'next-intl/server';
import React from 'react';

async function OffersPage() {

    const data = await getHome();
  const menu = data?.products || [];
    const t =await getTranslations("HOME");

  return (
    <main className="min-h-screen bg-gray-50 ">
      <HeroSection title={t("offers")} />
      <div className=" py-5 px-12 w-full">
              <Menu items={menu} offer={true} /> 
      </div>
    </main>
  );
}

export default OffersPage;
