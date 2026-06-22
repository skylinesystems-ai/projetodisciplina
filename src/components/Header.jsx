import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, MessageCircle, ShieldCheck, X } from "lucide-react";
import { navItems } from "@/config/navigation.js";
import { iconRegistry } from "@/config/iconRegistry.jsx";
import { Button } from "@/components/ui/index.js";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/48 backdrop-blur-2xl"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="group flex items-center gap-3"
          onClick={closeMenu}
          aria-label="THE FORGE // NEXUS"
        >
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/40 bg-cyan-300/10 shadow-cyan">
            <ShieldCheck className="h-5 w-5 text-forge-cyan" />
          </span>
          <span className="font-display text-sm font-black uppercase leading-tight text-white sm:text-base">
            THE FORGE
            <span className="block text-forge-green">// NEXUS</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = iconRegistry[item.icon];
            return (
              <a key={item.href} href={item.href} className="nav-link">
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        <Button as="a" href="#community" size="sm" className="hidden lg:inline-flex">
          <MessageCircle className="h-4 w-4" />
          Comunidade VIP
        </Button>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/8 text-white lg:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          className="border-t border-white/10 bg-black/90 px-4 py-4 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => {
              const Icon = iconRegistry[item.icon];
              return (
                <a key={item.href} href={item.href} className="mobile-nav-link" onClick={closeMenu}>
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

export default Header;
