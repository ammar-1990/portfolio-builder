"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/modal-hook";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

type Props = {};

const AlertModal = (props: Props) => {
  const { open, modalType, data, onClose } = useModal();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = open && modalType === "alert-modal";
  const router = useRouter();
  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.profileId}/${params.portfolioId}`);
      router.refresh();
      router.push('/dashboard')

      toast({
        variant: "default",
        title: "Delete portfolio",
        description: "Portfolio deleted",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Delete portfolio",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            portfolio and remove your its from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} variant={'ghost'}>Cancel</Button>
          <Button
            disabled={isLoading}
            onClick={handleClick}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete {isLoading&&<Loader className="w-4 h-4 ml-2 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
