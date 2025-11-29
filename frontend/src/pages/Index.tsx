import LandingHero from "@/components/LandingHero";
import ProblemSection from "@/components/ProblemSection";
import SolutionFlow from "@/components/SolutionFlow";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LandingHero />
      <ProblemSection />
      <SolutionFlow />
      <Footer />
    </div>
  );
};

export default Index;
