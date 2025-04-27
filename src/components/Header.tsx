
import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { userProfile } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur animate-flip-in">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="outline" size="icon" onClick={toggleSidebar}>
              <span className="sr-only">Toggle sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </Button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-medical-purple">SaniCare</span>
            <div className="hidden md:flex items-center px-2 py-1 bg-medical-teal/10 rounded-md">
              <span className="text-xs font-medium text-medical-teal">Vital Hub</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="transition-all duration-600"
          >
            <span className="sr-only">Toggle theme</span>
            {isDarkMode ? (
              <Sun className="h-5 w-5 transition-transform duration-500 rotate-0" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-500 rotate-0" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotificationClick}
            className="relative"
          >
            <span className="sr-only">Notifications</span>
            <Bell className="h-5 w-5" />
            <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-medical-alert" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-sm font-medium">Hello, {userProfile.name}!</span>
            <Avatar>
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-medical-purple text-primary-foreground">
                {userProfile.name.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
