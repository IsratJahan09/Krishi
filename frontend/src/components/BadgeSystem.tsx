import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy, Target, Shield, Star, Sprout } from "lucide-react";
import { Farmer } from "@/utils/storage";

interface BadgeSystemProps {
  farmer: Farmer;
}

const allBadges = [
  {
    id: "First Registration",
    nameBangla: "প্রথম নিবন্ধন",
    nameEnglish: "First Registration",
    descriptionBangla: "কৃষি প্ল্যাটফর্মে যুক্ত হয়েছেন",
    descriptionEnglish: "Joined Krishi Platform",
    icon: Sprout,
    color: "text-green-600"
  },
  {
    id: "First Harvest Logged",
    nameBangla: "প্রথম ফসল লগ",
    nameEnglish: "First Harvest Logged",
    descriptionBangla: "প্রথম ফসল ব্যাচ যুক্ত করেছেন",
    descriptionEnglish: "Logged first harvest batch",
    icon: Trophy,
    color: "text-yellow-600"
  },
  {
    id: "Loss Prevented Expert",
    nameBangla: "ক্ষতি প্রতিরোধ বিশেষজ্ঞ",
    nameEnglish: "Loss Prevented Expert",
    descriptionBangla: "৫টি ক্ষতি ঘটনা প্রতিরোধ করেছেন",
    descriptionEnglish: "Prevented 5 loss events",
    icon: Shield,
    color: "text-blue-600"
  },
  {
    id: "Weather-Proof Farmer",
    nameBangla: "আবহাওয়া-সচেতন কৃষক",
    nameEnglish: "Weather-Proof Farmer",
    descriptionBangla: "১০ বার আবহাওয়া পরামর্শ ব্যবহার করেছেন",
    descriptionEnglish: "Used weather advisory 10 times",
    icon: Target,
    color: "text-purple-600"
  },
  {
    id: "5 Star Farmer",
    nameBangla: "৫ স্টার কৃষক",
    nameEnglish: "5 Star Farmer",
    descriptionBangla: "১০টি সফল ব্যাচ সম্পন্ন করেছেন",
    descriptionEnglish: "Completed 10 successful batches",
    icon: Star,
    color: "text-orange-600"
  }
];

const BadgeSystem = ({ farmer }: BadgeSystemProps) => {
  const isBangla = farmer.language === 'bangla';

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 font-bangla">
        {isBangla ? "অর্জিত ব্যাজ" : "Achievement Badges"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {allBadges.map((badge) => {
          const earned = farmer.badges.includes(badge.id);
          const Icon = badge.icon;
          
          return (
            <Card
              key={badge.id}
              className={`shadow-card transition-smooth ${
                earned ? "border-primary" : "opacity-50 grayscale"
              }`}
            >
              <CardContent className="pt-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center ${
                  earned ? badge.color : "text-muted-foreground"
                }`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-sm mb-1 font-bangla">
                  {isBangla ? badge.nameBangla : badge.nameEnglish}
                </h3>
                <p className="text-xs text-muted-foreground font-bangla">
                  {isBangla ? badge.descriptionBangla : badge.descriptionEnglish}
                </p>
                {earned && (
                  <div className="mt-2">
                    <Award className="w-4 h-4 text-primary mx-auto" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeSystem;