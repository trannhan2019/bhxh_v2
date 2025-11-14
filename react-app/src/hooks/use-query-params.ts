import { useSearchParams } from "react-router";
import { useMemo } from "react";

type QueryParams = Record<string, string | undefined>;

function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Chuyển searchParams thành object có type rõ ràng
  const queryObject: QueryParams = useMemo(() => {
    const params: QueryParams = {};
    searchParams.forEach((value, key) => {
      params[key] = value; // Lưu key-value vào object
    });
    return params;
  }, [searchParams]);

  // Hàm cập nhật query params
  const updateQueryParams = (
    newParams: Record<string, string | null | undefined>,
  ): void => {
    const params = new URLSearchParams(searchParams); // Copy từ current search params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key); // Xóa key nếu giá trị là null hoặc undefined
      } else {
        params.set(key, value); // Cập nhật hoặc thêm key
      }
    });
    setSearchParams(params); // Cập nhật search params
  };

  return { queryObject, updateQueryParams };
}

export default useQueryParams;