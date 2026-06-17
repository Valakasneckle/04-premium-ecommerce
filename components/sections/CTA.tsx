import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Section } from "@/components/ui/Section";

export function CTA() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-indigo-900 px-8 py-16 text-center">
        <div className="blob w-72 h-72 bg-indigo-500/30 top-0 right-0 opacity-50" />
        <div className="blob w-48 h-48 bg-violet-500/20 bottom-0 left-0 opacity-50" />
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white">Stay in the loop.</h2>
          <p className="text-slate-300">
            Get early access to new products, exclusive deals, and tech insights delivered to your inbox.
          </p>
          <NewsletterForm />
          <p className="text-xs text-slate-400">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    </Section>
  );
}
