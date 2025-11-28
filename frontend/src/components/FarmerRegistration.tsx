import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { saveFarmer, setCurrentFarmer, getFarmerByPhone, generateId, addBadgeToFarmer } from "@/utils/storage";
import { toast } from "sonner";
import { UserPlus, LogIn, ArrowLeft } from "lucide-react";

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    language: "bangla" as 'bangla' | 'english'
  });

  const validatePhone = (phone: string): boolean => {
    // Bangladesh mobile format: 01[3-9]XXXXXXXX (11 digits)
    return /^01[3-9]\d{8}$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number format
    if (!validatePhone(formData.phone)) {
      toast.error(formData.language === 'bangla' 
        ? "সঠিক মোবাইল নম্বর লিখুন (01XXXXXXXXX)" 
        : "Please enter a valid mobile number (01XXXXXXXXX)");
      return;
    }

    if (isLogin) {
      // Login with phone number
      const farmer = getFarmerByPhone(formData.phone);
      if (farmer && farmer.password === formData.password) {
        setCurrentFarmer(farmer.id);
        toast.success(farmer.language === 'bangla' ? "সফলভাবে লগইন হয়েছে!" : "Login successful!");
        navigate("/farmer/profile");
      } else {
        toast.error(formData.language === 'bangla' ? "ভুল মোবাইল নম্বর বা পাসওয়ার্ড" : "Invalid mobile number or password");
      }
    } else {
      // Registration with phone number
      const existingFarmer = getFarmerByPhone(formData.phone);
      if (existingFarmer) {
        toast.error(formData.language === 'bangla' ? "এই মোবাইল নম্বর ইতিমধ্যে নিবন্ধিত" : "Mobile number already registered");
        return;
      }

      const newFarmer = {
        id: generateId(),
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        language: formData.language,
        createdAt: new Date().toISOString(),
        badges: []
      };

      saveFarmer(newFarmer);
      setCurrentFarmer(newFarmer.id);
      
      // Award first badge
      addBadgeToFarmer(newFarmer.id, "First Registration");
      
      toast.success(formData.language === 'bangla' ? "নিবন্ধন সফল হয়েছে!" : "Registration successful!");
      navigate("/farmer/profile");
    }
  };

  return (
    <div className="min-h-screen gradient-earth py-12 px-4">
      <div className="container mx-auto max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 font-bangla"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          হোমে ফিরে যান / Back to Home
        </Button>
        <Card className="shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bangla">
              {isLogin ? "লগইন করুন" : "কৃষক নিবন্ধন"}
            </CardTitle>
            <CardDescription className="font-bangla">
              {isLogin 
                ? "আপনার অ্যাকাউন্টে প্রবেश করুন" 
                : "কৃষি প্ল্যাটফর্মে যোগ দিন"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name" className="font-bangla">নাম / Name</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-bangla">মোবাইল নম্বর / Mobile Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {isLogin && (
                <div>
                  <Label htmlFor="phone-login" className="font-bangla">মোবাইল নম্বর / Mobile Number</Label>
                  <Input
                    id="phone-login"
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="password" className="font-bangla">পাসওয়ার্ড / Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1"
                />
              </div>

              {!isLogin && (
                <div>
                  <Label className="font-bangla">ভাষা / Language</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value="bangla"
                        checked={formData.language === 'bangla'}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value as 'bangla' | 'english' })}
                      />
                      <span className="font-bangla">বাংলা</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value="english"
                        checked={formData.language === 'english'}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value as 'bangla' | 'english' })}
                      />
                      <span>English</span>
                    </label>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    <span className="font-bangla">লগইন করুন</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    <span className="font-bangla">নিবন্ধন করুন</span>
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="font-bangla"
              >
                {isLogin 
                  ? "নতুন অ্যাকাউন্ট তৈরি করুন" 
                  : "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerRegistration;
