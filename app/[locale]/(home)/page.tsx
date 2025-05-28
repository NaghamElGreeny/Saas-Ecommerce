import Hero from '@/components/sections/Hero';
import Slider from '@/components/shared/Slider';

export default async function Home() {
  const items = [
    {
      id: '1',
      name: "Shish Tawook meal",
      description: "Pickled carrots - celery, tomatoes, cilantro, blue cheese, za'atar",
      price: "50.00 EGP",
      image: "/assets/images/menu/tawook.jpg",
      rating: 4.5
    },
    {
      id: '2',
      name: "Grilled steak",
      description: "Grilled to perfection with vegetables and herbs,Grilled to perfection with vegetables and herbs",
      price: "35.00 EGP",
      image: "/assets/images/menu/steak.jpg",
      rating: 4.7
    },
    {
      id: '3',
      name: "Vegetable pizza",
      description: "Fresh vegetables and mozzarella on a crispy crust",
      price: "40.00 EGP",
      image: "/assets/images/menu/pizza.jpg",
      rating: 4.3
    },
    {
      id: '4',
      name: "Shredd",
      description: "Cheesy shredded delight",
      price: "50.00 EGP",
      image: "/assets/images/menu/shredd.jpg",
      rating: 4.2
    },
  ];

  return (
    <div className="space-y-12">
      <Hero />
      <Slider title="Popular Items" items={items} />
    </div>
  );
}
