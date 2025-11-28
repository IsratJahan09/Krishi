import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveBatch, getCurrentFarmer, generateId, addBadgeToFarmer, getBatchesByFarmer } from "@/utils/storage";
import { toast } from "sonner";
import { Wheat, ArrowLeft } from "lucide-react";
import { getUser, batchAPI } from "@/lib/api";

const divisions = [
  "ঢাকা / Dhaka",
  "চট্টগ্রাম / Chittagong",
  "রাজশাহী / Rajshahi",
  "খুলনা / Khulna",
  "বরিশাল / Barisal",
  "সিলেট / Sylhet",
  "রংপুর / Rangpur",
  "ময়মনসিংহ / Mymensingh"
];

const storageTypes = [
  "চটের বস্তা / Jute Bag",
  "সাইলো / Silo",
  "খোলা জায়গা / Open Area",
  "গুদাম / Warehouse",
  "ঘর / Home Storage"
];

const CropBatchForm = () => {
  const navigate = useNavigate();
  const jwtUser = getUser();
  const currentFarmer = getCurrentFarmer();
  const user = jwtUser || currentFarmer;
  
  const [formData, setFormData] = useState({
    cropType: "ধান / Rice",
    weight: "",
    harvestDate: "",
    division: "",
    district: "",
    storageType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      console.log('Already submitting, ignoring...');
      return;
    }

    console.log('=== Form Submission Started ===');
    console.log('Form Data:', formData);
    console.log('JWT User:', jwtUser);
    console.log('Current Farmer:', currentFarmer);

    // Validate required fields
    if (!formData.division) {
      console.error('Validation failed: Division is required');
      toast.error(user.language === 'bangla' 
        ? "বিভাগ নির্বাচন করুন" 
        : "Please select division");
      return;
    }

    if (!formData.storageType) {
      console.error('Validation failed: Storage type is required');
      toast.error(user.language === 'bangla' 
        ? "সংরক্ষণের ধরন নির্বাচন করুন" 
        : "Please select storage type");
      return;
    }

    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      console.error('Validation failed: Invalid weight');
      toast.error(user.language === 'bangla' 
        ? "সঠিক ওজন লিখুন" 
        : "Please enter valid weight");
      return;
    }

    if (!formData.harvestDate) {
      console.error('Validation failed: Harvest date is required');
      toast.error(user.language === 'bangla' 
        ? "ফসল কাটার তারিখ নির্বাচন করুন" 
        : "Please select harvest date");
      return;
    }

    if (!formData.district) {
      console.error('Validation failed: District is required');
      toast.error(user.language === 'bangla' 
        ? "জেলার নাম লিখুন" 
        : "Please enter district name");
      return;
    }

    try {
      console.log('Validation passed, proceeding with submission...');
      setIsSubmitting(true);
      
      // If JWT user, save to Django backend
      if (jwtUser) {
        console.log('Saving to Django backend for JWT user...');
        const batchData = {
          crop_type: formData.cropType,
          weight: parseFloat(formData.weight),
          harvest_date: formData.harvestDate,
          division: formData.division,
          district: formData.district,
          storage_type: formData.storageType,
        };
        console.log('Batch data to send:', batchData);
        
        const result = await batchAPI.create(batchData);
        console.log('✓ Batch created successfully:', result);
        
        toast.success(user.language === 'bangla' 
          ? "ফসল ব্যাচ সফলভাবে যুক্ত হয়েছে!" 
          : "Crop batch added successfully!");
      } 
      // If local storage farmer, save to localStorage
      else if (currentFarmer) {
        console.log('Saving to localStorage for local farmer...');
        const newBatch = {
          id: generateId(),
          farmerId: currentFarmer.id,
          cropType: formData.cropType,
          weight: parseFloat(formData.weight),
          harvestDate: formData.harvestDate,
          division: formData.division,
          district: formData.district,
          storageType: formData.storageType,
          status: 'active' as const,
          lossEvents: [],
          createdAt: new Date().toISOString()
        };
        console.log('Batch to save:', newBatch);

        saveBatch(newBatch);
        console.log('✓ Batch saved to localStorage');
        
        // Check for badges
        const farmerBatches = getBatchesByFarmer(currentFarmer.id);
        if (farmerBatches.length === 0) {
          addBadgeToFarmer(currentFarmer.id, "First Harvest Logged");
        }

        toast.success(user.language === 'bangla' 
          ? "ফসল ব্যাচ সফলভাবে যুক্ত হয়েছে!" 
          : "Crop batch added successfully!");
      }
      
      console.log('Navigating to profile...');
      navigate("/farmer/profile");
    } catch (error: any) {
      console.error('=== Error creating batch ===');
      console.error('Error:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      const errorMessage = error.message || error.toString();
      toast.error(user.language === 'bangla'
        ? `ব্যাচ তৈরি করতে ব্যর্থ হয়েছে: ${errorMessage}`
        : `Failed to create batch: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-earth py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/farmer/profile")}
          className="mb-4 font-bangla"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          ফিরে যান
        </Button>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bangla">
              <Wheat className="w-6 h-6" />
              নতুন ফসল ব্যাচ নিবন্ধন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cropType" className="font-bangla">ফসলের ধরন / Crop Type</Label>
                <Select
                  value={formData.cropType}
                  onValueChange={(value) => setFormData({ ...formData, cropType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ধান / Rice">ধান / Rice</SelectItem>
                    <SelectItem value="গম / Wheat">গম / Wheat</SelectItem>
                    <SelectItem value="পাট / Jute">পাট / Jute</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="weight" className="font-bangla">আনুমানিক ওজন (কেজি) / Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  required
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="harvestDate" className="font-bangla">ফসল কাটার তারিখ / Harvest Date</Label>
                <Input
                  id="harvestDate"
                  type="date"
                  required
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="division" className="font-bangla">বিভাগ / Division</Label>
                <Select
                  value={formData.division}
                  onValueChange={(value) => setFormData({ ...formData, division: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন / Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((div) => (
                      <SelectItem key={div} value={div}>{div}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district" className="font-bangla">জেলা / District</Label>
                <Input
                  id="district"
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="mt-1"
                  placeholder="জেলার নাম লিখুন / Enter district name"
                />
              </div>

              <div>
                <Label htmlFor="storageType" className="font-bangla">সংরক্ষণের ধরন / Storage Type</Label>
                <Select
                  value={formData.storageType}
                  onValueChange={(value) => setFormData({ ...formData, storageType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="সংরক্ষণের ধরন নির্বাচন করুন / Select Storage Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {storageTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                <Wheat className="w-4 h-4 mr-2" />
                <span className="font-bangla">
                  {isSubmitting 
                    ? (user.language === 'bangla' ? "সংরক্ষণ হচ্ছে..." : "Saving...") 
                    : (user.language === 'bangla' ? "ব্যাচ যোগ করুন" : "Add Batch")
                  }
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropBatchForm;
