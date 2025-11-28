import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, Leaf, AlertCircle, CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";
import AnalysisResult from "@/components/AnalysisResult";
import ScanHistory from "@/components/ScanHistory";
import UserMenu from "@/components/UserMenu";

export interface ScanResult {
  id: string;
  status: "fresh" | "rotten";
  confidence: number;
  timestamp: Date;
  image_url: string;
}

const CropHealthScan = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>([]);
  const { toast } = useToast();

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      console.log('Fetching scan history...');
      const { scanAPI } = await import('@/lib/api');
      const data = await scanAPI.getHistory();
      console.log('History data received:', data);
      const formattedHistory = data.map((item: any) => ({
        id: item.id,
        status: item.status,
        confidence: typeof item.confidence === 'number' ? item.confidence * 100 : item.confidence,
        timestamp: new Date(item.timestamp),
        image_url: item.image_url,
      }));
      console.log('Formatted history:', formattedHistory);
      setHistory(formattedHistory);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const clearAllHistory = async () => {
    console.log('Clearing all scan history...');
    
    try {
      const { scanAPI } = await import('@/lib/api');
      const result = await scanAPI.deleteAllHistory();
      console.log('Delete result:', result);
      
      // Clear local state
      setHistory([]);
      
      toast({
        title: "ইতিহাস মুছে ফেলা হয়েছে",
        description: `${result.deleted_count || 0} টি স্ক্যান স্থায়ীভাবে মুছে ফেলা হয়েছে`,
      });
    } catch (error) {
      console.error('Error deleting history:', error);
      toast({
        title: "ত্রুটি",
        description: "ইতিহাস মুছে ফেলতে ব্যর্থ হয়েছে",
        variant: "destructive",
      });
    }
  };

  const handleImageSelect = (imageUrl: string, file: File) => {
    setSelectedImage(imageUrl);
    setSelectedFile(file);
    setResult(null);
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      toast({
        title: "ত্রুটি",
        description: "কোনো ছবি নির্বাচন করা হয়নি",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      console.log('=== Starting Image Analysis ===');
      console.log('File name:', selectedFile.name);
      console.log('File size:', selectedFile.size, 'bytes');
      console.log('File type:', selectedFile.type);
      
      const { scanAPI } = await import('@/lib/api');
      console.log('API module loaded');
      
      console.log('Sending request to backend...');
      const data = await scanAPI.scan(selectedFile);
      console.log('=== Analysis Result Received ===');
      console.log('Full response:', data);
      
      const scanResult: ScanResult = {
        id: data.id,
        status: data.status,
        confidence: typeof data.confidence === 'number' ? data.confidence * 100 : data.confidence,
        timestamp: new Date(data.timestamp),
        image_url: data.image_url,
      };
      
      console.log('Formatted result:', scanResult);
      setResult(scanResult);
      
      console.log('Refreshing history after scan...');
      await fetchHistory();
      
      toast({
        title: "বিশ্লেষণ সম্পন্ন",
        description: `ফসল ${scanResult.status === "fresh" ? "সতেজ" : "পচা"} হিসেবে সনাক্ত করা হয়েছে`,
      });
      
      console.log('=== Analysis Complete ===');
    } catch (error: any) {
      console.error('=== Error During Analysis ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Full error:', error);
      
      toast({
        title: "ত্রুটি",
        description: error.message || "ছবি বিশ্লেষণ করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      console.log('Analysis state reset');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-foreground hover:bg-muted font-bangla"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          হোমে ফিরে যান
        </Button>
      </div>

      {/* User Menu - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <UserMenu />
      </div>

      <header className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent mb-2">
              ফসলের স্বাস্থ্য স্ক্যানার
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              এআই-চালিত ফসল বিশ্লেষণ আপনার হাতের মুঠোয়। ফসলের স্বাস্থ্য তাৎক্ষণিক সনাক্ত করতে একটি ছবি আপলোড বা ক্যাপচার করুন।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
            <Camera className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">মোবাইল অপটিমাইজড</h3>
            <p className="text-sm text-muted-foreground">আপনার ফোন ক্যামেরা থেকে সরাসরি দ্রুত স্ক্যানিং</p>
          </Card>
          <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
            <Sparkles className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">এআই সনাক্তকরণ</h3>
            <p className="text-sm text-muted-foreground">উন্নত মেশিন লার্নিং মডেল দ্বারা চালিত</p>
          </Card>
          <Card className="p-6 border-2 border-border hover:border-primary/50 transition-all">
            <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">তাৎক্ষণিক ফলাফল</h3>
            <p className="text-sm text-muted-foreground">কয়েক সেকেন্ডে ফসলের স্বাস্থ্যের অবস্থা পান</p>
          </Card>
        </div>

        {!showScanner && (
          <div className="flex justify-center">
            <Button
              onClick={() => setShowScanner(true)}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <Camera className="mr-2 h-6 w-6" />
              স্ক্যান শুরু করুন
            </Button>
          </div>
        )}
      </header>

      {showScanner && (
        <main className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              <ImageUpload onImageSelect={handleImageSelect} />
              
              {selectedImage && !result && (
                <div className="flex justify-center">
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
                        বিশ্লেষণ করা হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        ফসলের স্বাস্থ্য বিশ্লেষণ করুন
                      </>
                    )}
                  </Button>
                </div>
              )}

              {result && <AnalysisResult result={result} />}
            </div>

            <div className="lg:col-span-1">
              <ScanHistory history={history} onRefresh={fetchHistory} onClearAll={clearAllHistory} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default CropHealthScan;
