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
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
          লগইন
        </Button>
        <Button size="sm" onClick={() => navigate('/register')}>
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
