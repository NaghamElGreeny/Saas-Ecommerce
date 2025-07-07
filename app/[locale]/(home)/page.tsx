import HomeContent from "@/components/layout/HomeContent";
import { getHome } from "@/services/ApiHandler";

export default async function Home() {
  const data = await getHome();

  return (
    <HomeContent data={data} /> 
  );
}