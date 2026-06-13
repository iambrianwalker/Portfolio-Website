import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/layout/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contact", path: "/contact" });

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%)]">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something meaningful together."
            description="I’m interested in collaboration, opportunities, and thoughtful conversations around software and cloud products."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-white">Reach out</h3>
              <ul className="mt-6 space-y-3 text-slate-400">
                <li>Email: bwalker37837@gmail.com</li>
                <li>Location: Atlanta, Georgia</li>
                <li>Focus: Software development, AWS, and modern web products</li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
