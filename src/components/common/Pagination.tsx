import { Link } from "react-router";
import {
  Pagination as RootPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";
import { useEffect, type RefObject } from "react";

interface PaginationProps {
  data: any;
  listRef: RefObject<HTMLDivElement | null>;
}

export default function Pagination({ data, listRef }: PaginationProps) {
  const [params, setParams] = useSearchParams();
  const categoryName = params.get("category") ?? "전체";
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? 1);

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
    listRef.current?.scrollIntoView({ behavior: "instant" });
  }, [page]);

  return (
    <RootPagination className="mt-10" ref={listRef}>
      <PaginationContent>
        <PaginationItem>
          {page === 1 ? (
            <PaginationPrevious
              aria-disabled={true}
              className="pointer-events-none opacity-50"
            />
          ) : (
            <Link
              to={`?category=${categoryName}&search=${search}&page=${page - 1}`}
            >
              <PaginationPrevious />
            </Link>
          )}
        </PaginationItem>

        {pageRange.map((num) => (
          <PaginationItem key={num}>
            <Link to={`?category=${categoryName}&search=${search}&page=${num}`}>
              <PaginationLink isActive={num === page}>{num}</PaginationLink>
            </Link>
          </PaginationItem>
        ))}

        <PaginationItem>
          {page === totalPage ? (
            <PaginationNext
              aria-disabled={true}
              className="pointer-events-none opacity-50"
            />
          ) : (
            <Link
              to={`?category=${categoryName}&search=${search}&page=${page + 1}`}
            >
              <PaginationNext />
            </Link>
          )}
        </PaginationItem>
      </PaginationContent>
    </RootPagination>
  );
}
