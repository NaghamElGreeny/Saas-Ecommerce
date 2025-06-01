import { items } from "@/app/[locale]/(home)/page" ;
import Image from 'next/image';

const Menu: React.FC = () => {
  console.log("Menu component",items);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Categories Navigation */}
      <div className="flex justify-around mb-6 overflow-x-auto whitespace-nowrap">
        {[
          'All',
          'Breakfast',
          'Lunch',
          'Dinner',
          'Mexican',
          'Italian',
          'Desserts',
          'Drinks',
        ].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              category === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-400 hover:text-white transition`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="rounded-t-lg object-cover object-center"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-600">{item.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">{item.price}</span>
                <button className="text-blue-500 hover:text-blue-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button className="text-blue-500 hover:text-blue-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">1</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">2</button>
        <button className="text-blue-500 hover:text-blue-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Menu;