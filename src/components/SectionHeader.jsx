import { motion } from "framer-motion";

function SectionHeader({ eyebrow, title, description, align = "center" }) {
  const isCenter = align === "center";

  return (
    <motion.div
      className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
    >
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-8 text-white/64 sm:text-lg">{description}</p>}
    </motion.div>
  );
}

export default SectionHeader;
