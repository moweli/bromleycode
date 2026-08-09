import Image from "next/image";
import { Reveal } from "@/components/reveal";

/**
 * A single photograph set between sections to break a long text run.
 *
 * Treatment matches the case-study hero (21:9, media radius, cover crop) so the
 * site has one photographic idiom rather than two. Narrow screens get 16:10:
 * a 21:9 crop at 390px is about 170px tall, which reads as a strip rather than
 * an image.
 *
 * The band carries no caption and no link. It is atmosphere, not evidence, and
 * anything load-bearing belongs in the copy beside it.
 */
export function MediaBand({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Reveal>
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] sm:aspect-[21/9] ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 83vw"
          className="object-cover"
        />
      </div>
    </Reveal>
  );
}
