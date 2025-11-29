import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Droplets, Thermometer, CloudRain, CheckCircle } from "lucide-react";

const GrainRiskGuide = () => {
  return (
    <Card className="shadow-card mb-6">
      <CardHeader>
        <CardTitle className="font-bangla text-foreground">
          📚 শস্য সংরক্ষণ নির্দেশিকা
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Safe Limits */}
        <div>
          <h3 className="font-semibold font-bangla mb-3 text-green-700">
            ✓ নিরাপদ সীমা
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bangla font-semibold">আর্দ্রতা</span>
              </div>
              <p className="text-lg font-bold text-green-700">{"< ১৪%"}</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bangla font-semibold">তাপমাত্রা</span>
              </div>
              <p className="text-lg font-bold text-green-700">{"< ৩২°C"}</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CloudRain className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bangla font-semibold">বৃষ্টি</span>
              </div>
              <p className="text-lg font-bold text-green-700">{"< ৬০%"}</p>
            </div>
          </div>
        </div>

        {/* Risk Indicators */}
        <div>
          <h3 className="font-semibold font-bangla mb-3 text-red-700">
            ⚠ ঝুঁকির লক্ষণ
          </h3>
          <div className="space-y-2 text-sm font-bangla">
            <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>আর্দ্রতা ১৪% এর বেশি = ছত্রাক বৃদ্ধির ঝুঁকি</span>
            </div>
            <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>তাপমাত্রা ৩২°C এর বেশি = দ্রুত নষ্ট হওয়ার ঝুঁকি</span>
            </div>
            <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>উচ্চ আর্দ্রতা (৭০%+) + বৃষ্টি = জরুরি পদক্ষেপ প্রয়োজন</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold font-bangla mb-3 text-blue-700">
            💡 দ্রুত পদক্ষেপ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bangla">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-semibold mb-1">উচ্চ আর্দ্রতার জন্য:</p>
              <ul className="space-y-1 text-xs">
                <li>• রোদে শুকান (সম্ভব হলে)</li>
                <li>• বায়ুচলাচল বাড়ান</li>
                <li>• শুকনো স্থানে সরান</li>
              </ul>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-semibold mb-1">উচ্চ তাপমাত্রার জন্য:</p>
              <ul className="space-y-1 text-xs">
                <li>• ছায়ায় রাখুন</li>
                <li>• ঠান্ডা স্থানে সরান</li>
                <li>• রাতে বায়ুচলাচল করুন</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ETCL Explanation */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold font-bangla mb-2 text-purple-800">
            🔬 ETCL কী?
          </h3>
          <p className="text-sm font-bangla text-purple-900 leading-relaxed">
            <strong>ETCL (Expected Time to Critical Loss)</strong> হলো সেই সময় যার মধ্যে আপনার সংরক্ষিত শস্য 
            ক্ষতিগ্রস্ত হতে পারে। এটি আর্দ্রতা, তাপমাত্রা এবং আবহাওয়ার উপর ভিত্তি করে গণনা করা হয়। 
            ETCL যত কম, ঝুঁকি তত বেশি।
          </p>
        </div>

        {/* Best Practices */}
        <div>
          <h3 className="font-semibold font-bangla mb-3 text-green-700">
            ✅ সর্বোত্তম অনুশীলন
          </h3>
          <div className="space-y-2 text-sm font-bangla">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>প্রতিদিন শস্য পরীক্ষা করুন (গন্ধ, রঙ, তাপমাত্রা)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>সপ্তাহে একবার আর্দ্রতা মাপুন</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>বৃষ্টির আগে শস্য ঢেকে রাখুন</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>পরিষ্কার ও শুকনো পাত্রে সংরক্ষণ করুন</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>কীটপতঙ্গ থেকে রক্ষা করুন</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrainRiskGuide;
