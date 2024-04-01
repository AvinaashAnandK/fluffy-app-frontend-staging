"use client";

import { useEffect, useState } from "react";
import AddRepoModal from "@/components/globalModals/add-repo-modal";
import ProModal from "@/components/globalModals/pro-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AddRepoModal />
        </>
    )
}