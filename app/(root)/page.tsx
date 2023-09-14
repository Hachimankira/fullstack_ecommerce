"use client";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const SetupPage = () =>{
    const onOpen = useStoreModal((state) => state.onOpen)
    const isOpen = useStoreModal((state) => state.isOpen)

    useEffect(() => {
      if(!isOpen){
        onOpen();
      }
    }, [isOpen, onOpen]);
    
    return(
        <div className="p-4">
            {/* <UserButton afterSignOutUrl="/"/>
            This is a protected route! */}
            <Modal title="test" description="test desc" isOpen onClose={() => {}}>
                Children 
            </Modal>
        </div>
    );
}

export default SetupPage;