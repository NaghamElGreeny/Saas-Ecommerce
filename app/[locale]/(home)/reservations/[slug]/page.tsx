import Reservation from "@/components/ordersPage/ReservationOrder";
type Props = {
  params: Promise<{
    slug: number;
  }>;
};

const ReservationPage: React.FC = async ({ params }: Props) => {
  const slugg = (await params).slug;
  console.log("slug", slugg);
  return (
    <section className="flex w-full justify-center bg-[#FBFAFC]">
      <Reservation slugg={slugg} />
    </section>
  );
};

export default ReservationPage;
