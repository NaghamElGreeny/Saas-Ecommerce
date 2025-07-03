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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type GlobalSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | ReactNode;
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
        className={`bg-bg w-full  items-center rounded-l-2xl sm:min-w-[550px] min-h-[80vh]`}
      >
        <SheetHeader className="relative w-full rounded-2xl  bg-white text-start bottom-0">
          {title ? (
            <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
          ) : (
            <VisuallyHidden>
              <SheetTitle>Dialog</SheetTitle>
            </VisuallyHidden>
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
          <div className="mt-4 flex w-full justify-center p-3">{footer}</div>
        )}
      </SheetContent>
    </Sheet>
  );
}
