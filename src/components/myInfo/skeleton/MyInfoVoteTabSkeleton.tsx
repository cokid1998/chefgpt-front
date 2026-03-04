/**
 * 내 투표 Skeleton
 */
export function MyVoteItemSkeleton() {
  return (
    <div className="rounded-xl border p-4">
      {/* 제목/설명 */}
      <div className="mb-3">
        <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>

      {/* 옵션 A */}
      <div className="mb-3">
        <div className="mb-1 flex justify-between">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div className="h-2 w-1/3 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      {/* 옵션 B */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div className="h-2 w-1/2 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="flex justify-between">
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

/**
 * 참여한 투표 Skeleton
 */
export function VotedItemSkeleton() {
  return (
    <div className="rounded-xl border p-4">
      {/* 제목/설명 + 뱃지 */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="ml-2 h-6 w-14 animate-pulse rounded-full bg-gray-200" />
      </div>

      {/* 하단 정보 */}
      <div className="flex items-center gap-4">
        <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
