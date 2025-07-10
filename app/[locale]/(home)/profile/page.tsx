import AccountForm from '@/components/Forms/AccountForm';
import { getTranslations } from 'next-intl/server';
import React from 'react'
async function Profile() {
  const t = await getTranslations('PROFILE_PAGE'); 

  return (
    <div className="py-11 flex justify-center items-center !w-full">
      <div className="base-card rounded-xl bg-website_white bg-bgPrimary p-4 w-[90%]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="animated wow zoomIn mb-3 text-4xl font-semibold text-text lg:text-5xl animated">
            {t('title')}
          </h3>
        </div>
        <AccountForm />
      </div>
    </div>
  );
}

export default Profile;