import type { TNgachLuong } from "@/types/bac-luong";
import { BacLuongCard } from "./bac-luong-card";


interface Props {
    ngachLuongs: TNgachLuong[];
    handleOpenModal: (item: TNgachLuong | null) => void;
    handleDelAlert: (id: number) => void;
}

export function BacLuongList({ngachLuongs, handleOpenModal, handleDelAlert}: Props) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {ngachLuongs.map((ngachLuong) => (
        <BacLuongCard
          key={ngachLuong.id}
          data={ngachLuong}
          handleOpenModal={handleOpenModal}
          handleDelAlert={handleDelAlert}
        />
      ))}
    </div>
  );
}
