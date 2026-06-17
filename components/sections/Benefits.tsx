import { benefits } from "@/data/benefits";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Benefits() {
  return (
    <Section className="bg-[var(--color-muted)]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-foreground)]">Why LumaGear?</h2>
        <p className="text-[var(--color-muted-foreground)] mt-2">Built to earn trust and reduce purchase friction.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item) => (
          <Card key={item.title} className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[var(--color-accent)]">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[var(--color-foreground)]">{item.title}</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
