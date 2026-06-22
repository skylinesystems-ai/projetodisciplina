import {
  Dumbbell,
  FlaskConical,
  MessageCircle,
  Pill,
  Shirt,
  ShoppingBag,
  Sparkles,
  Watch,
  Zap,
} from "lucide-react";
import { products } from "@/data/products.js";
import { brandConfig } from "@/config/brand.js";
import { Badge, Button, Card, Section } from "@/components/ui/index.js";
import { useToast } from "@/hooks/useToast.js";

const productIcons = {
  shirt: Shirt,
  short: Dumbbell,
  creatine: FlaskConical,
  whey: Pill,
  preworkout: Zap,
  watch: Watch,
};

function ForgeMarket() {
  const { notify } = useToast();

  return (
    <Section
      id="market"
      eyebrow="Forge Market"
      title="Marketplace holográfico"
      description="Produtos simulados com placeholders futuristas, preços fictícios e chamada direta para compra no WhatsApp."
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => {
          const Icon = productIcons[product.icon] || ShoppingBag;
          const whatsappText = encodeURIComponent(`Olá, quero comprar: ${product.name}`);
          return (
            <Card
              key={product.name}
              className="product-card p-5"
              style={{ "--accent": product.accent, "--accent2": product.accent2 }}
              delay={index * 0.05}
            >
              <div className="product-visual">
                <div className="product-plate" />
                <Icon className="relative z-10 h-16 w-16 text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.4)]" />
                <Sparkles className="absolute right-5 top-5 h-5 w-5 text-white/76" />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <Badge tone="green">{product.tag}</Badge>
                  <h3 className="mt-4 font-display text-xl font-black uppercase text-white">
                    {product.name}
                  </h3>
                </div>
                <strong className="text-right font-display text-xl text-forge-cyan">{product.price}</strong>
              </div>

              <Button
                as="a"
                href={`https://wa.me/${brandConfig.whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full"
                onClick={() =>
                  notify({
                    title: "Canal de compra aberto",
                    description: `${product.name} enviado para atendimento no WhatsApp.`,
                    type: "success",
                  })
                }
              >
                <MessageCircle className="h-5 w-5" />
                Comprar no WhatsApp
              </Button>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export default ForgeMarket;
