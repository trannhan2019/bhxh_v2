import { useDocumentTitle } from "usehooks-ts";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useQuery } from "@tanstack/react-query";
import { getBhxhById } from "@/apis/bhxh";
import { BhxhDetailInfo } from "./bhxh-detail-info";
import { BhxhBtnExport } from "./bhxh-btn-export";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { LichSuBhxh } from "../lich-su-bhxh/lich-su-bhxh";

export default function BhxhDetail() {
  useDocumentTitle("SBA | Chi tiết BHXH");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  const { id } = useParams();
  useEffect(() => {
    setBreadcrumbs([{ title: "Chi tiết BHXH", href: `/bhxh/${id}` }]);
  }, [setBreadcrumbs]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bhxh", id],
    queryFn: () => getBhxhById(Number(id)),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="mb-4 space-y-0.5">
          <h1 className="text-xl font-semibold tracking-tight">
            Thông tin BHXH
          </h1>
          <p className="text-sm text-muted-foreground">
            Thông tin chi tiết BHXH của {data?.nhanVien.ten}
          </p>
          {data?.nhanVien.trangThai === true ? (
            <Badge className="p-1">
              <BadgeCheck className="mr-2 size-4" />
              Đang hoạt động
            </Badge>
          ) : (
            <Badge className="p-1" variant="destructive">
              <BadgeCheck className="mr-2 size-4" />
              Đã nghỉ chế độ / nghỉ việc
            </Badge>
          )}
        </div>
        <BhxhBtnExport id={data.id} />
      </div>

      <BhxhDetailInfo data={data} />

      <div className="mt-5 mb-8 space-y-0.5">
        <h1 className="text-xl font-semibold tracking-tight">
          Quá trình tham gia BHXH
        </h1>
        <p className="text-sm text-muted-foreground">
          Thông tin quá trình tham gia BHXH của {data?.nhanVien.ten}
        </p>
        <LichSuBhxh nhanVienId={data.nhanVienId} />
      </div>
    </div>
  );
}
