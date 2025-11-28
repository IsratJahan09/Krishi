import LandingHero from "@/components/LandingHero";
import ProblemSection from "@/components/ProblemSection";
import SolutionFlow from "@/components/SolutionFlow";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LandingHero />
      <ProblemSection />
      <SolutionFlow />
      
      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-bangla">
            © {new Date().getFullYear()} কৃষি - ফসল রক্ষার ডিজিটাল সমাধান
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
