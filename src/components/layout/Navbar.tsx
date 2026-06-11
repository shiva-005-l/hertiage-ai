"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Landmark, Compass, User, Menu, Shield, X, BookOpen, LifeBuoy, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/features/LanguageSelector';
import { useLanguage } from '@/lib/language';
import { readAuthSession } from '@/lib/auth';

const navLinks = [
  { href: '/explore', labelKey: 'nav.explore', icon: <Compass className="h-4 w-4" />, subtle: false },
  { href: '/passport', labelKey: 'nav.passport', icon: <BookOpen className="h-4 w-4" />, subtle: false },
  { href: '/assistance', labelKey: 'nav.assistance', icon: <LifeBuoy className="h-4 w-4" />, subtle: false },
  { href: '/admin', labelKey: 'nav.admin', icon: <Shield className="h-3.5 w-3.5" />, subtle: true },
] as const;

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const visibleNavLinks = navLinks.filter((link) => link.href !== '/admin' || isAdmin);

  useEffect(() => {
    const loadAuth = () => {
      setIsAdmin(readAuthSession()?.role === 'admin');
    };

    loadAuth();
    window.addEventListener('smart-heritage-auth-updated', loadAuth);
    window.addEventListener('storage', loadAuth);
    return () => {
      window.removeEventListener('smart-heritage-auth-updated', loadAuth);
      window.removeEventListener('storage', loadAuth);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Landmark className="h-5 w-5 text-primary" />
            </div>
            <span className="inline-block font-bold text-lg sm:text-xl tracking-tight">
              Smart <span className="text-primary">Heritage</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {visibleNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/15 text-primary font-semibold'
                    : link.subtle
                    ? 'text-foreground/40 hover:text-foreground/70 hover:bg-accent/50'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {link.icon}
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-2 text-foreground/70 hover:text-foreground">
                <LogIn className="h-4 w-4" /> {t('nav.login')}
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                <User className="h-4 w-4 mr-1.5" /> {t('nav.getStarted')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {visibleNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                {link.icon}
                  {t(link.labelKey)}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border/30 flex gap-2">
              <Link href="/login" className="flex-1" onClick={() => setIsMobileOpen(false)}>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <LogIn className="h-4 w-4" /> {t('nav.login')}
                </Button>
              </Link>
              <Link href="/login" className="flex-1" onClick={() => setIsMobileOpen(false)}>
                <Button size="sm" className="w-full bg-primary text-primary-foreground">
                  {t('nav.getStarted')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
