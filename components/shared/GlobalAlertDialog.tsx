"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { X } from "lucide-react";

type GlobalAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

export default function GlobalAlertDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: GlobalAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="flex h-56 flex-col justify-around rounded-2xl px-6 py-4 text-center !bg-white">
        <X
          className="hover:bg-muted top-4 right-4 size-6 cursor-pointer p-1 transition"
          onClick={() => onOpenChange(false)}
        />

        <AlertDialogHeader className="flex flex-col items-center">
          <AlertDialogTitle className="text-xl font-bold">
            {title}
          </AlertDialogTitle>
          <p className="text-muted-foreground w-5/6 text-center text-sm">
            {description}
          </p>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col gap-2 pt-4">
          <AlertDialogCancel className="cancel-btn border-muted text-muted-foreground h-10 w-1/2 cursor-pointer rounded-full border transition">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="confirm-btn h-10 w-1/2 cursor-pointer rounded-full  transition hover:border "
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
