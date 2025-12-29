'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/i18n';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center whitespace-nowrap text-xl font-bold sm:text-2xl">
              <span className="text-primary-600 dark:text-primary-500">complaint</span>
              <span className="text-secondary-500">hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="/complaints"
              className="text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              {t.nav.complaints}
            </Link>
            <Link
              href="/trend"
              className="flex items-center text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              {t.nav.trend}
              <span className="ml-1 rounded-full bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs">
                100
              </span>
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          {/* Login Button */}
          <button className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
            {t.nav.login}
          </button>

          {/* Submit Complaint Button */}
          <Link href="/submit-complaint">
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <nav className="flex flex-col gap-2 px-4">
            <Link
              href="/complaints"
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.complaints}
            </Link>
            <Link
              href="/trend"
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.trend}
            </Link>
            <div className="flex flex-col gap-2 mt-4">
              <button className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors">
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
  );
}
