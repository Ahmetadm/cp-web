'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/i18n';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Search, X } from 'lucide-react';
import { LoginModal } from '@/components/ui/LoginModal';

export function Header() {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="flex items-center whitespace-nowrap text-xl font-bold sm:text-2xl">
                <span className="text-primary-600 dark:text-primary-500">complaint</span>
                <span className="text-secondary-500">hub</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-6 lg:flex">
              <Link
                href="/complaints"
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                {t.nav.complaints}
              </Link>
              <Link
                href="/trend"
                className="flex items-center text-foreground/60 transition-colors hover:text-foreground"
              >
                {t.nav.trend}
                <span className="ml-1 rounded-full bg-foreground/10 px-1.5 py-0.5 text-xs">
                  100
                </span>
              </Link>
            </nav>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder={t.hero.searchPlaceholder} // reusing hero placeholder
                className="block w-full pl-10 pr-3 py-2 border border-foreground/10 rounded-xl leading-5 bg-foreground/5 text-foreground placeholder-foreground/40 focus:outline-none focus:bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all sm:text-sm"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Icon */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground/70"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Login Button */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="hidden lg:inline-flex items-center px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
            >
              {t.nav.login}
            </button>

            {/* Submit Complaint Button */}
            <Link href="/submit-complaint" className="hidden sm:block">
              <button className="inline-flex items-center bg-[#6c5ce7] hover:bg-[#5b4bc9] text-white px-3 py-2 md:px-4 rounded-lg font-medium text-sm transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="hidden md:inline">{t.nav.submitComplaint}</span>
              </button>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-0 z-50 bg-background px-4 flex items-center border-b border-foreground/10 animate-fade-in-up md:hidden">
            <div className="relative flex-1 mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t.hero.searchPlaceholder}
                className="block w-full pl-10 pr-3 py-2 border border-foreground/10 rounded-xl leading-5 bg-foreground/5 text-foreground placeholder-foreground/40 focus:outline-none focus:bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all sm:text-sm"
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground/70"
            >
              <span className="sr-only">Close search</span>
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-foreground/10 bg-background shadow-lg absolute w-full left-0 top-16">
            <nav className="flex flex-col gap-2 px-4">
              <Link
                href="/complaints"
                className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.complaints}
              </Link>
              <Link
                href="/trend"
                className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.trend}
              </Link>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-foreground/10">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-foreground hover:bg-foreground/5 rounded-lg font-medium transition-colors text-left"
                >
                  {t.nav.login}
                </button>
                <Link href="/submit-complaint" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-[#6c5ce7] hover:bg-[#5b4bc9] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    {t.nav.submitComplaint}
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
