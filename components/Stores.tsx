import { getStores } from '@/services/ApiHandler'
import { Store } from '@/utils/types';
import Image from 'next/image';
import React from 'react'

async function Stores () {
  const stores = await getStores();
  console.log('stores ssr', stores);

  return (
    <div className="container m-4 ">
      <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2 lg:grid-cols-3">
        {stores?.map((store: Store) => (
          <div key={store.id} className="m-auto">
            <div className="w-fit space-y-3 rounded-2xl bg-website_white p-3">
              <Image
                src={store.image}
                width={388}
                height={269}
                alt={`Storefront of ${store.name}`}
                className="animated wow zoomIn h-[269px] w-[388px] rounded-2xl object-cover"
                data-wow-duration="1.3s"
                data-wow-delay="0s"
              />
              <h2
                className="animated wow fadeInUp text-2xl font-bold"
                data-wow-duration="1.3s"
                data-wow-delay="0s"
              >
                {store.name}
              </h2>
              <div
                className="animated wow fadeInUp flex flex-wrap gap-x-8"
                data-wow-duration="1.3s"
                data-wow-delay="0s"
              >
                <div className="flex flex-wrap items-center gap-1">
                  <span className="nuxt-icon nuxt-icon--fill text-xl text-third">📞</span>
                  {/* <p className="min-w-[60px] capitalize text-third">Phone:</p> */}
                </div>
                <a href={`tel:${store.phone_code}${store.phone}`}>
                  ({store.phone_code}) {store.phone}
                </a>
              </div>
              <div
                className="animated wow fadeInUp flex flex-wrap gap-x-8"
                data-wow-duration="1.3s"
                data-wow-delay="0s"
              >
                <div className="flex flex-wrap gap-1">
                  <span className="nuxt-icon nuxt-icon--fill text-xl text-third">📍</span>
                  {/* <p className="capitalize text-third">Address:</p> */}
                </div>
                <p>{store.location_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stores;
