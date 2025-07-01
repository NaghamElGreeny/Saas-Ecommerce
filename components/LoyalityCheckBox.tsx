"use client";

interface LoyaltyCheckboxProps {
  points: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function LoyaltyCheckbox({
  points,
  checked,
  onChange,
}: LoyaltyCheckboxProps) {
  return (
    <div className="flex flex-wrap items-center rounded-xl bg-white px-5 mb-2">
      <input
        id="loyalty"
        type="checkbox"
        className="text-text-light accent-primary w-4 h-4"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor="loyalty" className="mx-2 flex items-center gap-2 cursor-pointer">
        Use your loyalty points
        <span className="rounded-full bg-[#e8faf4] px-2 py-0.5 text-lg text-[#42d39d]">
          {points} <span className="text-[12px]">Points</span>
        </span>
      </label>
    </div>
  );
}
