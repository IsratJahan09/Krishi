import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone_number: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone_number || !formData.password) {
      toast({
        title: 'Error',
        description: 'Please enter phone number and password',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(formData.phone_number, formData.password);
      
      console.log('Login successful:', response);

      toast({
        title: 'Success!',
        description: 'Login successful. Welcome back!',
      });

      // Redirect to farmer profile
      navigate('/farmer/profile');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid phone number or password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="font-bangla"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          হোমে ফিরে যান
        </Button>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">লগইন / Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">ফোন নম্বর / Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01712345678"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড / Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'লগইন হচ্ছে...' : 'লগইন / Login'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-green-600 hover:underline"
              >
                Register here
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
