import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function HomeRedirect() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale');

  const locale = localeCookie?.value || 'en';

  // redirect(`/${locale}/auth`);

  return (
    <>
      <div className=" space-y-12">

      </div>

    </>
  )
}
