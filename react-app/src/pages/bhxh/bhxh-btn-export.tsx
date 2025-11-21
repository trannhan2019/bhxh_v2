import { Button } from "@/components/ui/button";

import { Sheet } from "lucide-react";
import { reportExcelById } from "@/apis/bhxh";
import { useMutation } from "@tanstack/react-query";

export function BhxhBtnExport({ id }: { id: number }) {
  const handleXuatExcel = useMutation({
    mutationFn: (id: number) => reportExcelById(id),
    onSuccess: (data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report_bhxh.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.log(error);
      alert("Không thể tải file. Vui lòng thử lại.");
    },
  });
  return (
    <Button
    size="lg"
      variant="outline"
      className="bg-green-400 text-white hover:bg-green-500 hover:text-white"
      onClick={() => handleXuatExcel.mutate(id)}
      disabled={handleXuatExcel.isPending}
    >
      <Sheet className="mr-2 size-5" />
      {handleXuatExcel.isPending
        ? "Đang xuất file..."
        : "Xuất thông tin thành file Excel"}
    </Button>
  );
}
