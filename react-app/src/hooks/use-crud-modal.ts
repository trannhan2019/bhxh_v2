import { useState } from "react";

export function useCrudModal<TItem>() {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
    const [selectedId, setSelectedId] = useState<number>(0);

    const handleOpenModal = (item: TItem | null) => {
        setOpen(true);
        setSelectedItem(item);
    };

    const handleOpenAlert = (id: number) => {
        setOpenAlert(true);
        setSelectedId(id);
    };

    return {
        open,
        setOpen,
        selectedItem,
        handleOpenModal,
        openAlert,
        setOpenAlert,
        selectedId,
        handleOpenAlert,
    };
}
