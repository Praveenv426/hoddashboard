
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  CalendarRange, 
  ClipboardCheck, 
  BarChart3, 
  Bell, 
  FileBarChart, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type MenuItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  active: boolean;
  collapsed: boolean;
};

const MenuItem = ({ icon: Icon, label, to, active, collapsed }: MenuItemProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "flex items-center justify-start w-full py-3 px-3 gap-3 transition-colors",
        active 
          ? "bg-adminhub-accent text-adminhub-primary-text hover:bg-adminhub-accent/90" 
          : "hover:bg-adminhub-surface text-adminhub-secondary-text hover:text-adminhub-primary-text"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Button>
  </Link>
);

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard Overview', to: '/' },
    { icon: Users, label: 'Faculty Management', to: '/faculty' },
    { icon: GraduationCap, label: 'Student Management', to: '/students' },
    { icon: CalendarRange, label: 'Timetable Management', to: '/timetable' },
    { icon: ClipboardCheck, label: 'Leave Approvals', to: '/leave' },
    { icon: BarChart3, label: 'Internal Marks & Attendance', to: '/reports' },
    { icon: Bell, label: 'Notifications & Announcements', to: '/notifications' },
    { icon: FileBarChart, label: 'Reports & Analytics', to: '/analytics' },
    { icon: Settings, label: 'Settings & Profile', to: '/settings' },
  ];

  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-adminhub-background border-r border-border/30 transition-all", 
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-border/30 flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-xl text-adminhub-accent">AdminHub</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={location.pathname === item.to}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border/30">
        {!collapsed && (
          <div className="text-xs text-adminhub-secondary-text">
            AdminHub v1.0
          </div>
        )}
      </div>
    </div>
  );
};
