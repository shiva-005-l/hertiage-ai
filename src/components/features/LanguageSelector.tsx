"use client";

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languages, useLanguage } from '@/lib/language';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((lang) => lang.code === language) ?? languages[0];

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="gap-2 text-foreground/80 hover:text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.name}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 z-50 border border-border overflow-hidden">
          <div className="py-1 bg-accent/50 backdrop-blur-md">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/20 ${language === lang.code ? 'text-primary font-bold' : 'text-foreground'}`}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
