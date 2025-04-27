
import React from 'react';
import { 
  CalendarDays, 
  FileText, 
  Heart, 
  History, 
  LayoutDashboard, 
  MessageSquare, 
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  isDesktop: boolean;
}

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '#' },
  { name: 'Vitals', icon: Heart, href: '#vitals' },
  { name: 'History', icon: History, href: '#history' },
  { name: 'Appointments', icon: CalendarDays, href: '#appointments' },
  { name: 'Messages', icon: MessageSquare, href: '#messages' },
  { name: 'Settings', icon: Settings, href: '#settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isDesktop }) => {
  const [activeItem, setActiveItem] = React.useState('Dashboard');

  return (
    <div 
      className={cn(
        'fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r shadow-sm transition-transform duration-300 ease-in-out',
        isOpen || isDesktop ? 'translate-x-0 animate-slide-in-right' : '-translate-x-full',
        isDesktop ? 'block' : 'block'
      )}
    >
      <div className="flex h-full flex-col py-4">
        <div className="px-3 py-2">
          <div className="flex items-center px-4 py-2">
            <FileText className="mr-2 h-5 w-5 text-sidebar-primary" />
            <h4 className="font-semibold text-sidebar-foreground">Patient Portal</h4>
          </div>
        </div>
        <nav className="flex-1 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  onClick={() => setActiveItem(item.name)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 transition-all',
                    activeItem === item.name 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm hover:bg-sidebar-accent/80' 
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.name === 'Messages' && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-medical-alert text-xs font-medium text-white">
                      2
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-3 py-2">
          <div className="rounded-lg bg-sidebar-accent/50 px-4 py-4">
            <div className="mb-2 flex items-center">
              <Heart className="h-5 w-5 text-medical-teal mr-2" />
              <h5 className="font-medium text-sidebar-foreground">Health Tips</h5>
            </div>
            <p className="text-xs text-sidebar-foreground/80">Remember to take breaks and stay hydrated throughout your day.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
