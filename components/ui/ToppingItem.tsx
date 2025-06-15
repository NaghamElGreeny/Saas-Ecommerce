import { Button } from "@/components/ui/Button";
import { Minus, Plus } from "lucide-react";

export default function ToppingItem({ name, price, quantity, onAdd, onRemove, unit }) {
  return (
    <div className="flex items-center justify-between rounded-xl border px-4 py-3 ">
      {/* Left side */}
      <div>
        <p className="text-sm font-semibold text-gray-900">
          {name} <span className="text-[13px] font-normal text-gray-500">(+{price} EGP)</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{unit}</p>
      </div>

      {/* Counter */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 text-xs"
          onClick={onRemove}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center text-sm">{quantity}</span>
        <Button
          size="icon"
          className="h-7 w-7 bg-primary text-white"
          onClick={onAdd}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
