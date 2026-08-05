import Image from "next/image";
import { cn } from "@/lib/utils";

export function WebsitePreview({
  image,
  alt,
  urlLabel,
  priority = false,
  className,
  imageClassName,
}: {
  image: string;
  alt: string;
  urlLabel: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[6px] border border-ink/15 bg-paper shadow-[0_18px_50px_rgba(28,25,23,0.09)] md:shadow-[0_24px_70px_rgba(28,25,23,0.1)]", className)}>
      <div className="flex h-8 items-center gap-1.5 border-b border-ink/12 bg-paper-deep/70 px-2.5 md:h-9 md:gap-2 md:px-3">
        <span className="size-2 rounded-full bg-ink/22" />
        <span className="size-2 rounded-full bg-gold/70" />
        <span className="size-2 rounded-full bg-olive/55" />
        <span className="ms-1.5 min-w-0 flex-1 truncate rounded-[4px] border border-ink/10 bg-paper px-2 py-1 font-mono text-[9px] text-ink/45 md:ms-2 md:px-3 md:text-[10px]">
          {urlLabel}
        </span>
      </div>
      <div className="relative aspect-video overflow-hidden bg-paper">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 48vw, (min-width: 768px) 70vw, 100vw"
          className={cn("object-cover object-top transition duration-300 group-hover:scale-[1.018] group-hover:brightness-105", imageClassName)}
        />
      </div>
    </div>
  );
}
