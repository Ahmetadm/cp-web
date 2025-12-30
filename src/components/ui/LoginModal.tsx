'use client';

import React, { useState } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslations } from '@/i18n';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'PHONE' | 'OTP' | 'SIGNUP';

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const t = useTranslations();
  const [step, setStep] = useState<AuthStep>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose(); // Login successful
    }, 1000);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-background rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden transform transition-all animate-fade-in-up flex">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side - Pattern Background */}
        <div
          className="hidden md:flex w-72 relative overflow-hidden items-center justify-center"
          style={{
            backgroundImage: 'url(/images/pattern.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Right Side - Form Content */}
        <div className="flex-1 relative">
          {/* Decorative Background Shapes for mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-50" />
          </div>

        <div className="p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {step === 'PHONE' && 'Welcome Back'}
              {step === 'OTP' && 'Verify Your Phone'}
              {step === 'SIGNUP' && 'Create Account'}
            </h2>
            <p className="text-foreground/60 text-sm">
              {step === 'PHONE' && 'Enter your phone number to sign in'}
              {step === 'OTP' && `We sent a code to ${phone}`}
              {step === 'SIGNUP' && 'Join the community to share your experience'}
            </p>
          </div>

          {/* Forms */}
          {step === 'PHONE' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-600 text-secondary-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-secondary/25"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
              </button>
              <div className="mt-6 text-center text-sm">
                <span className="text-foreground/60">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setStep('SIGNUP')}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </button>
              </div>
            </form>
          )}

          {step === 'OTP' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-600 text-secondary-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-secondary/25"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
              </button>
              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="w-full text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Change phone number
              </button>
            </form>
          )}

          {step === 'SIGNUP' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-600 text-secondary-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-secondary/25"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
              </button>
              <div className="mt-6 text-center text-sm">
                <span className="text-foreground/60">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setStep('PHONE')}
                  className="text-primary font-semibold hover:underline"
                >
                  Log in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
