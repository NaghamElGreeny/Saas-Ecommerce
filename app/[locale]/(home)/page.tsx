import FollowusSection from '@/components/sections/FollowusSection';
import Hero from '@/components/sections/Hero';
import ReservationForm from '@/components/sections/Reservation';
import { DblSection } from '@/components/shared/DblSection';
import Slider from '@/components/shared/Slider';

export const items = [
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
  {
    id: '5',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '6',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '7',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '8',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '9',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '10',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '11',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '12',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '868',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '13',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '14',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '15',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '16',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '17',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '18',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '19',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '122',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '124',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '165',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '178',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '1654',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '121',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '1125',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '1233',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '133',
    name: "Shredd",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
  {
    id: '1333',
    name: "Shredd",
    category:"Breakfast",
    description: "Cheesy shredded delight",
    price: "50.00 EGP",
    image: "/assets/images/menu/shredd.jpg",
    rating: 4.2
  },
];
export default async function Home() {
  const sharedSection =
  {
    topMsg: "HEY! WELCOME TO mea telecom",
    title: 'We Provide Good Food For Your Family!',
    subtitle: "Food is the foundation of true happiness.",
    description: `Food is the foundation of true happiness. </br> Iorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo. We see our customers as invited guests to a party, and we are the hosts. It's our job every day to make every important aspect of the customer experience a little bit better. Donec quam felis, ultricies nec, pellentesque eu.`,
    ctaText: "Discover More",
  }



  const handleReservationClick = () => {
    console.log('reseerve')
  };
  const div = `<h2 className='bg-red-500'>Hey</h2>`

  return (
    <div className="space-y-12 overflow-hidden">
      <Hero />
      <Slider title="View our menus" items={items} />
      <DblSection
        topMsg={sharedSection.topMsg}
        title={sharedSection.title}
        subtitle={sharedSection.subtitle}
        description={sharedSection.description}
        section='discover'
      />
      <Slider title="Popular Items" items={items} />
      <DblSection
        title={sharedSection.title}
        subtitle={sharedSection.subtitle}
        description={sharedSection.description}
        section='download'
        reverse={true}
      />
      <DblSection
        topMsg={sharedSection.topMsg}
        title={sharedSection.title}
        subtitle={sharedSection.subtitle}
        description={sharedSection.description}
        section='subscribe'
      />
      <FollowusSection />
      <ReservationForm
      // reservationHref="/reservation" // Pass the route instead
      // className="my-12"
      />
    </div>
  );
}
