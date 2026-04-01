import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  kicker?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
};

export function MarketingSection({
  id,
  kicker,
  title,
  children,
  className = ""
}: SectionProps) {
  return (
    <section id={id} className={`section-pad ${className}`}>
      <div className="container-shell">
        {(kicker || title) && (
          <header className="mb-8 md:mb-10">
            {kicker ? <p className="kicker">{kicker}</p> : null}
            {title ? <h2 className="heading-lg mt-3">{title}</h2> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
