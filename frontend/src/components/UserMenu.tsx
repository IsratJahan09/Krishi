import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, UserCircle } from 'lucide-react';
import { authAPI, getUser } from '@/lib/api';

export default function UserMenu() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    // Clear all auth data
    authAPI.logout();
    
    // Redirect to home
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex gap-2 sm:gap-3">
        <Button 
          variant="outline" 
          size="default"
          onClick={() => navigate('/login')}
          className="font-bangla text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 h-auto min-h-[40px] sm:min-h-[44px] border-2 hover:scale-105 hover:shadow-md transition-all duration-300 ease-out hover:border-primary"
        >
          লগইন
        </Button>
        <Button 
          size="default"
          onClick={() => navigate('/register')}
          className="font-bangla text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 h-auto min-h-[40px] sm:min-h-[44px] gradient-hero hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out animate-pulse-subtle"
        >
          নিবন্ধন
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserCircle className="h-4 w-4" />
          <span className="font-bangla">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-bangla">আমার অ্যাকাউন্ট</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/farmer/profile')} className="font-bangla">
          <User className="mr-2 h-4 w-4" />
          ড্যাশবোর্ড
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="font-bangla text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          লগআউট
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
