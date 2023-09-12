"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal";


export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal title="Create Store"
            description="Add a new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future create store form
        </Modal>
    )

}