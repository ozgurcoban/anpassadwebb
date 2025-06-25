'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="group relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 border-0"
        >
          <div className="absolute inset-0 bg-white/5 dark:bg-white/10" />
          <Sun className="relative z-10 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-blue-600 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute z-10 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-purple-400 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
