// import Filter from '@/components/Filter';
import Menu from '@/components/menu';
import HeroSection from '@/components/shared/HeroSection';
import {  getHome, getMenuItem } from '@/services/ApiHandler';
import { getTranslations } from 'next-intl/server';
import React from 'react';

async function MenuPage() {
  const MenuItem = await getMenuItem('شيش-كباب');
    const data = await getHome();
  const menu = data?.products || [];
  const items = menu||[MenuItem];
  // const categories = getCategories();
     const t =await getTranslations("HOME");
  // const categoriesArr=[categories]
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection title={t("menu")} />
      <div className="grid grid-cols-4 container py-5">
        {/* <Filter categories={categoriesArr} /> */}
        <Menu items={items} /> 
      </div>
    </main>
  );
}

export default MenuPage;
