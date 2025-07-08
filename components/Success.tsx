"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import LocalePath from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  firstTitle :string;
  firstLink :string;
  secondTitle :string;
  secondLink :string;

}

const Success = ({ open, onOpenChange,firstTitle,firstLink,secondTitle,secondLink }: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent showCloseButton={false} className="max-w-[90vw] md:max-w-[450px] h-[70vh] rounded-3xl bg-[#fbfafc] text-center space-y-5">
        <div className="flex justify-between items-center">
          <div></div>
          <button onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

          <Image
            src="https://saas-website.ui.aait-d.com/_nuxt/success.DpIpPJ7v.gif"
            alt="success"
            width={150}
            height={150}
            className="mx-auto h-[150px] w-[150px]"
            unoptimized
          />
   <h2 className="text-3xl font-bold">Succes</h2>
          
       

        <div className="flex flex-col justify-between h-[80px]">
          <LocalePath href={firstLink}>
            <Button className="w-full py-4 rounded-full">{firstTitle}</Button>
          </LocalePath>
      
          <LocalePath href={secondLink}>
            <Button variant="outline" className="w-full py-4 rounded-full">
              {secondTitle}
            </Button>
          </LocalePath>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Success;
