import Order from "@/components/Order";
type Props = {
  params: Promise<{
    slug: number;
  }>;
};
const OrderPage: React.FC = async ({ params }: Props) => {
  const slugg = (await params).slug;
  console.log("slug", slugg);
  return (
    <section className="flex w-full justify-center bg-[#FBFAFC]">
      <Order slugg={slugg} />
    </section>
  );
};

export default OrderPage;
