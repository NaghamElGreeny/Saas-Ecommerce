import Filter from '@/components/Filter';
import Menu from '@/components/Menu';
import React from 'react'
type Category = {
  id: string;
  name: string;
  subCategories?: SubCategory[];
}; type SubCategory = {
  id: string;
  name: string;
};
function MenuPage
  () {
    const categories = [
      {
        id: '1',
        name: 'Food',
        subCategories: [
          { id: '1-1', name: 'Burger' },
          { id: '1-2', name: 'Pizza' },
          { id: '1-3', name: 'Chicken' },
          { id: '1-4', name: 'Salad' },
          { id: '1-5', name: 'Grill' },
          { id: '1-6', name: 'Soup' },
          { id: '1-7', name: 'Pasta' },
          { id: '1-8', name: 'Sushi' },
        ],
      },
      {
        id: '2',
        name: 'Drink',
        subCategories: [
          { id: '2-1', name: 'Coffee' },
          { id: '2-2', name: 'Tea' },
          { id: '2-3', name: 'Juice' },
          { id: '2-4', name: 'Soda' },
          { id: '2-5', name: 'Beer' },
          { id: '2-6', name: 'Wine' },
        ],
      },
      {
        id: '3',
        name: 'Dessert',
        subCategories: [
          { id: '3-1', name: 'Cake' },
          { id: '3-2', name: 'Ice Cream' },
          { id: '3-3', name: 'Cookies' },
          { id: '3-4', name: 'Pie' },
        ],
      },
    ];

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Menu Filter</h1>
        <Filter
          categories={categories}
        />
        <Menu />
      </div>
    </main>
  );
}

export default MenuPage
