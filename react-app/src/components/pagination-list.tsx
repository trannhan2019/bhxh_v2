import { usePagination, DOTS } from "@/hooks/use-pagination";
// import useQueryParams from "@/hooks/use-query-params";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

interface Props {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  defaultValue: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (value: string) => void;
}

const dataSelect = [15, 20, 50];

export function PaginationList({
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
  defaultValue,
  handlePageChange,
  handlePageSizeChange,
}: Props) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
  //   return null;
  // }

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <div className="mt-4 flex items-center">
      <div className="flex items-center gap-2">
         <Label className="text-sm font-medium">Hiển thị số trang</Label>
        
        <Select
          onValueChange={handlePageSizeChange}
          defaultValue={defaultValue.toString()}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Pages" />
          </SelectTrigger>
          <SelectContent>
            {dataSelect.map((item) => (
              <SelectItem key={item} value={item.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
       
      </div>

      <Pagination className="flex-1">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {paginationRange?.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={index} className="cursor-pointer">
                <PaginationLink
                  onClick={() => handlePageChange(Number(pageNumber))}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={lastPage ? currentPage >= Number(lastPage) : false}
              tabIndex={
                lastPage
                  ? currentPage >= Number(lastPage)
                    ? -1
                    : undefined
                  : undefined
              }
              className={
                lastPage
                  ? currentPage >= Number(lastPage)
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
