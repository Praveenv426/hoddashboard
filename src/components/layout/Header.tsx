
import { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <header className="h-16 bg-adminhub-surface border-b border-border/30 flex items-center px-4 justify-between">
      <div className={`${isSearchActive ? 'w-full md:w-1/2' : 'w-64'} transition-all duration-300 relative flex items-center`}>
        <Input
          type="text"
          placeholder="Search faculty, students, subjects..."
          className="bg-adminhub-background text-adminhub-secondary-text border-border/30 pl-10"
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-adminhub-secondary-text" />
      </div>
      
      <div className={`${isSearchActive ? 'hidden md:flex' : 'flex'} items-center gap-2 md:gap-6`}>
        <div className="hidden md:block text-right">
          <div className="text-sm font-medium">{formatDate(currentTime)}</div>
          <div className="text-sm text-adminhub-secondary-text">{formatTime(currentTime)}</div>
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-adminhub-error text-white text-xs flex items-center justify-center">3</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium">Dr. Sarah Johnson</div>
            <div className="text-xs text-adminhub-secondary-text">HOD, Computer Science</div>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-adminhub-accent flex items-center justify-center">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
