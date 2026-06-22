import { cn } from "@/lib/cn.js";
import SectionHeader from "@/components/SectionHeader.jsx";

function Section({ children, className, description, eyebrow, id, title }) {
  return (
    <section id={id} className={cn("section-shell", className)}>
      {(eyebrow || title || description) && (
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      )}
      {children}
    </section>
  );
}

export default Section;
