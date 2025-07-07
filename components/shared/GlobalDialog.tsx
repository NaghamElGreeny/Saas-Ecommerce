"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { ReactNode } from "react";

type GlobalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  height?: string;
  footer?: ReactNode;
  custom?: string;
};

export default function GlobalDialog({
  open,
  onOpenChange,
  title,
  children,
  height,
  footer,
  custom,
}: GlobalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={`h-[90vh] max-h-[90vh] min-w-[60vw] ${custom} ${height} m-0 rounded-3xl border-none bg-white p-2 shadow-xl sm:max-w-[600px]`}
      >
        <DialogHeader className="relative flex items-center justify-center">
          <DialogTitle className="m-0 w-full p-0 text-center text-xl font-bold">
            {title}
          </DialogTitle>

          <DialogClose asChild>
            <button
              aria-label="Close"
              className="absolute top-4 end-4 rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent max-h-[70vh] overflow-y-auto px-4 py-0">
          {children}
        </ScrollArea>
        {footer&&<DialogFooter className="flex h-20 w-full !items-center !justify-center">
          {footer}
        </DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
