import Image from "next/image";

/**
 * The brand-kit logo (public/assets/brand). The wordmark is part of the
 * artwork, so it is never re-set as text. On a dark surface the same image is
 * knocked out to white, as the kit specifies, rather than shipping a second file.
 *
 * `alt` defaults to the brand name for a standalone logo. Inside a link that is
 * already named, pass alt="" so a screen reader does not announce it twice.
 */
export function Wordmark({ onDark = false, alt = "Bromley Code" }: { onDark?: boolean; alt?: string }) {
  return (
    <Image
      src="/assets/brand/logo/bromleycode-logo.webp"
      alt={alt}
      // Intrinsic size, so the box is reserved at the true ratio before load.
      width={1854}
      height={422}
      sizes="(min-width: 1024px) 192px, 168px"
      // Above the fold in the header; the footer and menu reuse the same file.
      loading="eager"
      className={[
        // 192px matches the old text wordmark's footprint, so the desktop nav
        // keeps the room it had.
        "h-auto w-[168px] transition-[filter] duration-300 lg:w-[192px]",
        onDark ? "brightness-0 invert" : "",
      ].join(" ")}
    />
  );
}
