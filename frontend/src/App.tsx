import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Weather from "./pages/Weather";
import Farmer from "./pages/Farmer";
import FarmerProfile from "./pages/FarmerProfile";
import NewBatch from "./pages/NewBatch";
import WeatherAlert from "./pages/WeatherAlert";
import StorageAdvice from "./pages/StorageAdvice";
import CropProtection from "./pages/CropProtection";
import CropHealthScan from "./pages/CropHealthScan";
import ConnectionTest from "./pages/ConnectionTest";
import BlogPost from "./pages/BlogPost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/farmer/new-batch" element={<NewBatch />} />
          
          {/* New Feature Pages */}
          <Route path="/weather-alert" element={<WeatherAlert />} />
          <Route path="/storage-advice" element={<StorageAdvice />} />
          <Route path="/storage-advice/:slug" element={<BlogPost />} />
          <Route path="/crop-protection" element={<CropProtection />} />
          <Route path="/crop-protection/:slug" element={<BlogPost />} />
          <Route path="/crop-health-scan" element={<CropHealthScan />} />
          <Route path="/scan" element={<CropHealthScan />} />
          <Route path="/test-connection" element={<ConnectionTest />} />
          
          {/* Authentication Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
