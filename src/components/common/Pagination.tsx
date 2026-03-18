import { Link } from "react-router";
import {
  Pagination as RootPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, type RefObject } from "react";
import useListParams from "@/hooks/useListParams";

interface PaginationProps {
  data: any;
  focusRef: RefObject<HTMLDivElement | null>;
  buildUrl: (page: number) => string; // URL 구성 방식을 외부에서 주입
}

export default function Pagination({
  data,
  focusRef,
  buildUrl,
}: PaginationProps) {
  const { page } = useListParams();

  const totalPage = data?.totalPage ?? 1;
  const groupSize = 10;
  const currentGroup = Math.ceil(page / groupSize);
  const start = (currentGroup - 1) * groupSize + 1;
  const end = Math.min(start + groupSize - 1, totalPage);
  const pageRange = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  useEffect(() => {
    focusRef.current?.scrollIntoView({ behavior: "instant" });
  }, [page]);

  return (
    <RootPagination className="mt-10" ref={focusRef}>
      <PaginationContent>
        <PaginationItem>
          {page === 1 ? (
            <PaginationPrevious
              aria-disabled
              className="pointer-events-none opacity-50"
            />
          ) : (
            <Link to={buildUrl(page - 1)}>
              <PaginationPrevious />
            </Link>
          )}
        </PaginationItem>

        {pageRange.map((num) => (
          <PaginationItem key={num}>
            <Link to={buildUrl(num)}>
              <PaginationLink isActive={num === page}>{num}</PaginationLink>
            </Link>
          </PaginationItem>
        ))}

        <PaginationItem>
          {page === totalPage ? (
            <PaginationNext
              aria-disabled
              className="pointer-events-none opacity-50"
            />
          ) : (
            <Link to={buildUrl(page + 1)}>
              <PaginationNext />
            </Link>
          )}
        </PaginationItem>
      </PaginationContent>
    </RootPagination>
  );
}
