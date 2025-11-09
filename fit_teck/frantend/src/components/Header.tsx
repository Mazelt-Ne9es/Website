import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl">{title}</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-white text-sm">John Smith</div>
              <div className="text-xs text-gray-400">Head Coach</div>
            </div>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
