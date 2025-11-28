import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
}

const PageHeader = ({ title, subtitle, icon, showBackButton = true }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="gradient-hero py-8 shadow-soft">
      <div className="container mx-auto px-4">
        {showBackButton && (
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-white hover:bg-white/20 font-bangla"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            হোমে ফিরে যান
          </Button>
        )}
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-bangla">
              {title}
            </h1>
            <p className="text-lg text-white/90 font-bangla mt-1">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
