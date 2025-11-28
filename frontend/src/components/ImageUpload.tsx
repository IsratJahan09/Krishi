import { useRef, useState } from "react";
import { Upload, Camera, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelect: (imageUrl: string, file: File) => void;
}

const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelect(result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card className="p-6 border-2 border-dashed border-border hover:border-primary/50 transition-all">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInput}
        className="hidden"
      />

      {!preview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center space-y-4 py-12 transition-all ${
            isDragging ? "bg-primary/5" : ""
          }`}
        >
          <div className="rounded-full bg-primary/10 p-6">
            <Upload className="w-12 h-12 text-primary" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">ফসলের ছবি আপলোড করুন</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              আপনার ফসলের ছবি এখানে টেনে এনে ছেড়ে দিন, বা ব্রাউজ করতে ক্লিক করুন
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              ফাইল নির্বাচন করুন
            </Button>
            <Button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute("capture", "environment");
                  fileInputRef.current.click();
                }
              }}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Camera className="w-4 h-4" />
              ছবি তুলুন
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <img
              src={preview}
              alt="Selected crop"
              className="w-full h-auto max-h-96 object-contain"
            />
            <Button
              onClick={clearImage}
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            ছবি বিশ্লেষণের জন্য প্রস্তুত
          </p>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;
