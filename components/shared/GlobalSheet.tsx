"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

type GlobalSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string|ReactNode;
  description?: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  trigger?: ReactNode;
  footer?: ReactNode;
};

export default function GlobalSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = "right",
  trigger,
  footer,
}: GlobalSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side={side}
        className="bg-bg w-full items-center rounded-l-2xl sm:min-w-[550px]"
      >
        <SheetHeader className="relative w-full rounded-tl-2xl bg-white text-start">
          {title && (
            <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
          )}
          {description && (
            <SheetDescription className="text-muted-foreground text-sm">
              {description}
            </SheetDescription>
          )}
          <SheetClose asChild></SheetClose>
        </SheetHeader>

        {children}

        {footer && (
          <div className="mt-4 p-3 flex w-full justify-center">{footer}</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
