type ToppingItemProps = {
  name: string;
  price: { price: number; currency: string } | null;
  unit?: string;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  disableAdd?: boolean;
  disableRemove?: boolean;
};

const ToppingItem = ({
  name,
  price,
  unit = "",
  quantity,
  onAdd,
  onRemove,
  disableAdd = false,
  disableRemove = false,
}: ToppingItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#F0F0F0] bg-card px-4 py-3 shadow-sm">
      <div className="flex flex-col">
        <div className="font-semibold text-black text-[15px]">
          {name}
          {price && (
            <span className="font-semibold text-black">
              &nbsp;(+{price.price} {price.currency})
            </span>
          )}
        </div>
        {unit && (
          <div className="text-sm text-gray-400 mt-1">
            ({unit})
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRemove}
          disabled={disableRemove}
          className={`w-8 h-8 cursor-pointer rounded-md text-center text-xl font-bold transition-colors ${
            disableRemove
              ? "bg-[#F5F5F5] text-gray-300 !cursor-not-allowed"
              : "bg-white text-black border border-gray-200"
          }`}
        >
          –
        </button>

        <span className="w-5 text-center text-black font-medium">{quantity}</span>

        <button
          type="button"
          onClick={onAdd}
          disabled={disableAdd}
          className={`cursor-pointer w-8 h-8 rounded-[6px] text-center text-xl font-bold transition-colors ${
            disableAdd
              ? "bg-[#F5F5F5] text-gray-300 !cursor-not-allowed"
              : "bg-primary text-white"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ToppingItem;
