import { User } from "lucide-react";

export default function DefaultThumbnail({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`flex size-10 items-center justify-center rounded-full bg-gray-300 text-white ${className}`}
    >
      <User className={iconClassName} />
    </div>
  );
}
