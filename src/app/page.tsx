import { AgentsSection } from "@/features/home/components/agents-section";
import { CTA } from "@/features/home/components/cta";
import { Features } from "@/features/home/components/features";
import { Footer } from "@/features/home/components/footer";
import { Hero } from "@/features/home/components/hero";
import { LogoCloud } from "@/features/home/components/logo-cloud";
import { ModelsSection } from "@/features/home/components/models-selection";
import { Navbar } from "@/features/home/components/navbar";
import { UseCases } from "@/features/home/components/use-cases";
import { WorkflowSection } from "@/features/home/components/workflow-section";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function Home() {
  await requireUnAuth();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <div className="mt-10">
        <Hero />
      </div>
      <LogoCloud />
      <Features />
      <AgentsSection />
      <ModelsSection />
      <WorkflowSection />
      <UseCases />
      <CTA />
      <Footer />
    </main>
  );
}
