import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentFarmer, getBatchesByFarmer, clearCurrentFarmer, exportToJSON, exportToCSV } from "@/utils/storage";
import { formatBanglaNumber } from "@/utils/banglaNumber";
import { LogOut, Plus, Download, Award, Package, CheckCircle2, Loader2 } from "lucide-react";
import BadgeSystem from "./BadgeSystem";
import { getUser, batchAPI } from "@/lib/api";

const FarmerProfile = () => {
  const navigate = useNavigate();
  const jwtUser = getUser();
  const currentFarmer = getCurrentFarmer();
  const user = jwtUser || currentFarmer;
  const [batches, setBatches] = useState<Array<{
    id: string;
    farmerId: string;
    cropType: string;
    weight: number;
    harvestDate: string;
    division: string;
    district: string;
    storageType: string;
    status: string;
    lossEvents: unknown[];
    createdAt: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  // Fetch batches on component mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBatches = async () => {
      try {
        if (jwtUser) {
          // Fetch from Django API for JWT users
          const response = await batchAPI.getAll();
          // Convert Django format to match localStorage format
          const convertedBatches = response.map((batch: {
            id: string;
            crop_type: string;
            weight: number;
            harvest_date: string;
            division: string;
            district: string;
            storage_type: string;
            status: string;
            created_at: string;
          }) => ({
            id: batch.id,
            farmerId: user.id,
            cropType: batch.crop_type,
            weight: batch.weight,
            harvestDate: batch.harvest_date,
            division: batch.division,
            district: batch.district,
            storageType: batch.storage_type,
            status: batch.status,
            lossEvents: [],
            createdAt: batch.created_at
          }));
          setBatches(convertedBatches);
        } else if (currentFarmer) {
          // Get from localStorage for local farmers
          const localBatches = getBatchesByFarmer(currentFarmer.id);
          setBatches(localBatches);
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
        setBatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [jwtUser, currentFarmer, user, navigate]);

  if (!user) {
    return null;
  }

  const isBangla = user.language === 'bangla';
  const userName = user.name;
  const activeBatches = batches.filter(b => b.status === 'active');
  const completedBatches = batches.filter(b => b.status === 'completed');

  const handleLogout = () => {
    clearCurrentFarmer();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate("/");
  };

  const handleExportJSON = () => {
    const userId = currentFarmer?.id || user.id;
    exportToJSON(batches, `krishi-batches-${userId}.json`);
  };

  const handleExportCSV = () => {
    const userId = currentFarmer?.id || user.id;
    exportToCSV(batches, `krishi-batches-${userId}.csv`);
  };

  return (
    <div className="min-h-screen gradient-earth py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold font-bangla mb-2">
              {isBangla ? "কৃষক প্রোফাইল" : "Farmer Profile"}
            </h1>
            <p className="text-muted-foreground font-bangla">
              {isBangla ? `স্বাগতম, ${userName}` : `Welcome, ${userName}`}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            <span className="font-bangla">{isBangla ? "লগআউট" : "Logout"}</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bangla">
                {isBangla ? "সক্রিয় ব্যাচ" : "Active Batches"}
              </CardTitle>
              <Loader2 className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-bangla">
                {formatBanglaNumber(activeBatches.length)}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bangla">
                {isBangla ? "সম্পন্ন ব্যাচ" : "Completed Batches"}
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-bangla">
                {formatBanglaNumber(completedBatches.length)}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bangla">
                {isBangla ? "ব্যাজ অর্জিত" : "Badges Earned"}
              </CardTitle>
              <Award className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-bangla">
                {formatBanglaNumber(currentFarmer?.badges?.length || 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button onClick={() => navigate("/farmer/new-batch")} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            <span className="font-bangla">
              {isBangla ? "নতুন ব্যাচ যোগ করুন" : "Add New Batch"}
            </span>
          </Button>
          {batches.length > 0 && (
            <>
              <Button variant="outline" onClick={handleExportJSON}>
                <Download className="w-4 h-4 mr-2" />
                <span className="font-bangla">JSON</span>
              </Button>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                <span className="font-bangla">CSV</span>
              </Button>
            </>
          )}
        </div>

        {/* Badges Section */}
        {currentFarmer && <BadgeSystem farmer={currentFarmer} />}

        {/* Active Batches */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-bangla">
              {isBangla ? "সক্রিয় ব্যাচ" : "Active Batches"}
            </h2>
            {loading && (
              <span className="text-sm text-muted-foreground font-bangla">
                {isBangla ? "লোড হচ্ছে..." : "Loading..."}
              </span>
            )}
          </div>
          {loading ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                <p className="text-muted-foreground font-bangla">
                  {isBangla ? "ব্যাচ লোড হচ্ছে..." : "Loading batches..."}
                </p>
              </CardContent>
            </Card>
          ) : activeBatches.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground font-bangla">
                  {isBangla ? "কোন সক্রিয় ব্যাচ নেই" : "No active batches"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeBatches.map((batch) => (
                <Card key={batch.id} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-bangla text-lg">{batch.cropType}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="font-bangla">
                        <span className="font-semibold">{isBangla ? "ওজন:" : "Weight:"}</span>{" "}
                        {formatBanglaNumber(batch.weight)} {isBangla ? "কেজি" : "kg"}
                      </p>
                      <p className="font-bangla">
                        <span className="font-semibold">{isBangla ? "তারিখ:" : "Date:"}</span>{" "}
                        {new Date(batch.harvestDate).toLocaleDateString('bn-BD')}
                      </p>
                      <p className="font-bangla">
                        <span className="font-semibold">{isBangla ? "স্থান:" : "Location:"}</span>{" "}
                        {batch.district}
                      </p>
                      <p className="font-bangla">
                        <span className="font-semibold">{isBangla ? "সংরক্ষণ:" : "Storage:"}</span>{" "}
                        {batch.storageType}
                      </p>
                      <Badge className="font-bangla">{isBangla ? "সক্রিয়" : "Active"}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Batches */}
        <div>
          <h2 className="text-2xl font-bold mb-4 font-bangla">
            {isBangla ? "সম্পন্ন ব্যাচ" : "Completed Batches"}
          </h2>
          {completedBatches.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground font-bangla">
                  {isBangla ? "কোন সম্পন্ন ব্যাচ নেই" : "No completed batches"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedBatches.map((batch) => (
                <Card key={batch.id} className="shadow-card opacity-75">
                  <CardHeader>
                    <CardTitle className="font-bangla text-lg">{batch.cropType}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="font-bangla">
                        <span className="font-semibold">{isBangla ? "ওজন:" : "Weight:"}</span>{" "}
                        {formatBanglaNumber(batch.weight)} {isBangla ? "কেজি" : "kg"}
                      </p>
                      <p className="font-bangla">
                        <span className="font-semibold">{isBangla ? "তারিখ:" : "Date:"}</span>{" "}
                        {new Date(batch.harvestDate).toLocaleDateString('bn-BD')}
                      </p>
                      <Badge variant="secondary" className="font-bangla">
                        {isBangla ? "সম্পন্ন" : "Completed"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
