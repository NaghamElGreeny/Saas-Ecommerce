
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="bg-green-500">
        <h2 className="font-primary text-xl">
          Hi There,..
        </h2>
      </div>
    </div>
  );
}

{/*
  import { getHomeData } from "@/services/ApiHandler";

export default async function HomePage() {
  const data: HomeType = await getHomeData();

  return (
    data && (
      <div className="space-y-12">
        Home
      </div>
    )
  );
}

  */}