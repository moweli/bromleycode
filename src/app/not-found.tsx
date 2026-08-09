import Link from "next/link";
import { primaryNav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="wash-dark grain relative isolate overflow-hidden text-paper">
      <div className="container-bc flex min-h-[70vh] flex-col justify-center py-32">
        <p className="eyebrow text-accent">404</p>
        <h1 className="mt-5 max-w-[36rem] text-[length:var(--text-h1)] leading-[var(--leading-display)] tracking-[var(--tracking-display)]">
          Nothing here matched.
        </h1>
        <p className="mt-6 max-w-[34rem] text-[length:var(--text-lead)] leading-[1.45] text-mist-bright">
          Which is, in fairness, the correct behaviour when the corpus does not contain the answer.
        </p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="border-b border-line-dark pb-1 transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
