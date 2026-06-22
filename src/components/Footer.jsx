import { Dumbbell, Instagram, MessageCircle, Network, ShieldCheck, ShoppingBag } from "lucide-react";
import { brandConfig } from "@/config/brand.js";

const links = [
  { label: "Instagram", href: "#hero", icon: Instagram },
  { label: "WhatsApp", href: "#community", icon: MessageCircle },
  { label: "Treinos", href: "#training", icon: Dumbbell },
  { label: "Produtos", href: "#market", icon: ShoppingBag },
  { label: "Afiliados", href: "#affiliates", icon: Network },
  { label: "Política de privacidade", href: "#hero", icon: ShieldCheck },
];

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/70 px-4 py-10 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/35 bg-cyan-300/10">
              <ShieldCheck className="h-5 w-5 text-forge-cyan" />
            </span>
            <strong className="font-display text-lg font-black uppercase text-white">
              {brandConfig.name}
            </strong>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/64">
            Universo digital para forjar corpo, mente e disciplina.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.label} href={link.href} className="footer-link">
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
