'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Newspaper, Gavel, School, Menu } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Berita', icon: Newspaper },
  { href: '/admissions', label: 'Info Pendaftaran', icon: School },
  { href: '/regulations', label: 'Regulasi', icon: Gavel },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
          <GraduationCap className="h-8 w-8" />
          <span>EduKita</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col">
                <div className="border-b p-4">
                  <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
                    <GraduationCap className="h-7 w-7" />
                    <span>EduKita</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  {navItems.map((item) => (
                     <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-md p-3 text-base font-medium transition-colors hover:bg-secondary',
                            pathname === item.href
                              ? 'bg-secondary font-semibold text-primary'
                              : 'text-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
