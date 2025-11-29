import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin,
  Leaf,
  CloudRain,
  Package,
  Sprout,
  Shield,
  Users,
  BookOpen
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* About / Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-bangla">কৃষি</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-bangla">
              আধুনিক প্রযুক্তি দিয়ে কৃষকদের ক্ষমতায়ন করা। এআই-চালিত ফসল স্বাস্থ্য বিশ্লেষণ এবং আবহাওয়া পূর্বাভাস।
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Empowering farmers with modern technology. AI-powered crop health analysis and weather forecasting.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-bangla">বৈশিষ্ট্য</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/scan" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <Leaf className="w-4 h-4 mr-2 text-green-400" />
                  <span className="font-bangla">ফসল স্বাস্থ্য স্ক্যানার</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/weather-alert" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <CloudRain className="w-4 h-4 mr-2 text-green-400" />
                  <span className="font-bangla">আবহাওয়া সতর্কতা</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/storage-advice" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <Package className="w-4 h-4 mr-2 text-green-400" />
                  <span className="font-bangla">সংরক্ষণ পরামর্শ</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/crop-protection" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <Sprout className="w-4 h-4 mr-2 text-green-400" />
                  <span className="font-bangla">ফসল রক্ষা</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/farmer/profile" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <Users className="w-4 h-4 mr-2 text-green-400" />
                  <span className="font-bangla">কৃষক ড্যাশবোর্ড</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-bangla">অ্যাকাউন্ট</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/login" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  <span className="font-bangla">লগইন</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  <span className="font-bangla">নিবন্ধন</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/farmer" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  <span className="font-bangla">আমার প্রোফাইল</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/farmer/new-batch" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  <span className="font-bangla">নতুন ব্যাচ যোগ করুন</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/test-connection" 
                  className="text-sm hover:text-green-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  <span className="font-bangla">সংযোগ পরীক্ষা</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-bangla">যোগাযোগ</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 font-bangla">
                  ঢাকা, বাংলাদেশ<br />
                  <span className="text-xs">Dhaka, Bangladesh</span>
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+8801700000000" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a 
                  href="mailto:support@krishi.com" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  support@krishi.com
                </a>
              </li>
            </ul>
            
            {/* Key Features Badge */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="font-bangla">নিরাপদ এবং বিশ্বস্ত</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <BookOpen className="w-4 h-4 text-green-400" />
                <span className="font-bangla">বিনামূল্যে ব্যবহার করুন</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar / Copyright */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left font-bangla">
              © {currentYear} কৃষি। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-bangla"
              >
                হোম
              </Link>
              <Link 
                to="/weather" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-bangla"
              >
                আবহাওয়া
              </Link>
              <Link 
                to="/scan" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-bangla"
              >
                স্ক্যান
              </Link>
              <Link 
                to="/farmer" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-bangla"
              >
                ড্যাশবোর্ড
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Made with <span className="text-red-500">❤</span> for Bangladeshi Farmers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
