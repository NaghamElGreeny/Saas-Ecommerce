"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { ReactNode } from "react";

type GlobalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
};

export default function GlobalDialog({
  open,
  onOpenChange,
  title,
  children,
}: GlobalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent showCloseButton={false} className="max-h-[90vh] min-w-[70vw] h-[90vh] rounded-3xl border-none bg-white !p-0 m-0 sm:max-w-[600px] shadow-xl">
        <DialogHeader className="relative flex items-center justify-center">
         
            <DialogTitle className="text-xl font-bold text-center w-full p-0 m-0">
              {title}
            </DialogTitle>
      
          <DialogClose asChild>
            <button
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full  text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] overflow-y-auto px-4 py-0 scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
