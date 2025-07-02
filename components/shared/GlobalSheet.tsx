"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { ReactNode } from "react";

type GlobalSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
};

export default function GlobalSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = "right",
}: GlobalSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className="w-full max-w-md px-4 py-6">
        <SheetHeader className="relative text-center">
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && (
            <SheetDescription className="text-sm text-muted-foreground">
              {description}
            </SheetDescription>
          )}
          <SheetClose asChild>
            <button className="absolute right-4 top-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </SheetHeader>

        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
