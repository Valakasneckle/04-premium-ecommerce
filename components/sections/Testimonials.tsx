import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Testimonials() {
  return (
    <Section className="bg-[var(--color-muted)]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-foreground)]">Trusted by Shoppers</h2>
        <p className="text-[var(--color-muted-foreground)] mt-2">What customers say about the LumaGear experience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <Card key={item.id} className="space-y-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
            <div>
              <p className="font-semibold text-[var(--color-foreground)] text-sm">{item.name}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">{item.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
